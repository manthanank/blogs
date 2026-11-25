---
author: Manthan Ankolekar
pubDatetime: 2026-11-25T15:30:00Z
modDatetime: 2026-11-25T15:30:00Z
title: Building Your First MCP Server with Node.js, TypeScript, and MySQL
postSlug: building-your-first-mcp-server-with-nodejs-typescript-and-mysql
featured: false
draft: false
tags:
  - Node.js
  - TypeScript
  - AI
  - MCP
ogImage: ""
description: "Learn how to expose your MySQL database to AI assistants safely using the Model Context Protocol (MCP), Node.js, TypeScript, and Zod."
canonicalURL: https://dev.to/manthanank/building-your-first-mcp-server-with-nodejs-typescript-and-mysql-1c3j
---

If you have built CRUD APIs with Node.js, Express, and MySQL, you already know how to structure routes, validate payloads, and query a database.

The **Model Context Protocol (MCP)** takes that same backend skill set and turns it into something AI assistants can discover and call directly. Instead of writing custom glue code for every AI tool or IDE, you expose structured **tools** once over a standard protocol, and any MCP-compatible client can use them.

In this guide, we will build a clean, type-safe **Task Manager MCP Server** using:

- **Node.js (v20+)** & **TypeScript**
- **`@modelcontextprotocol/sdk`** (the official MCP TypeScript SDK)
- **`zod`** for strict input schema validation
- **`mysql2`** for parameterized MySQL queries

---

## What Is an MCP Server (and Why Does It Matter)?

Think of MCP as a standardized contract between AI clients (like IDEs, desktop assistants, or custom agents) and your backend data or tools.

An MCP server typically exposes three primitives:

1. **Tools** — Executable functions the model can invoke (for example, `list-tasks` or `create-task`).
2. **Resources** — Read-only context endpoints (files, schema definitions, logs).
3. **Prompts** — Reusable prompt templates for common workflows.

And it communicates over one of two primary **transports**:

- **`stdio` (`StdioServerTransport`)**: Runs locally as a child process spawned by an MCP client. Great for developer tools and local workflows.
- **Streamable HTTP (`StreamableHTTPServerTransport`)**: Runs as an HTTP service (for example, inside an Express app) for remote or multi-user deployments.

We will build a `stdio` server first—it takes only a few minutes to run and test—and look at how to adapt it to Express afterward.

---

## Step 1: Project Setup

Create a new project directory, configure ESM (`type: module`), and install the dependencies:

```bash
mkdir mysql-mcp-server
cd mysql-mcp-server
npm init -y
npm pkg set type=module
npm install @modelcontextprotocol/sdk mysql2 zod dotenv
npm install -D typescript @types/node tsx
```

Create a `tsconfig.json` that uses `Node16` module resolution so subpath imports from `@modelcontextprotocol/sdk` resolve cleanly:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"]
}
```

---

## Step 2: Set Up the MySQL Table

Run the following SQL in your MySQL database to create a sample `tasks` table:

```sql
CREATE DATABASE IF NOT EXISTS mcp_demo;
USE mcp_demo;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status ENUM('todo', 'in_progress', 'done') NOT NULL DEFAULT 'todo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, status) VALUES
  ('Set up TypeScript MCP project', 'done'),
  ('Add Zod schema validation', 'in_progress'),
  ('Test with MCP Inspector', 'todo');
```

Create a `.env` file in the root of your project (and add it to `.gitignore`):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=mcp_demo
```

---

## Step 3: Build the MCP Server (`src/index.ts`)

Create `src/index.ts`. Notice two important MCP best practices in the code below:

1. **Never use `console.log()` in a `stdio` server.** Standard output (`stdout`) is reserved strictly for JSON-RPC protocol messages. Always log diagnostics to **`console.error()`** (`stderr`).
2. **Never let an LLM pass raw SQL strings.** Expose narrow, parameterized tools (`list-tasks`, `create-task`, `update-task-status`) validated with Zod.

```typescript
import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { z } from "zod";

interface TaskRow extends RowDataPacket {
  id: number;
  title: string;
  status: "todo" | "in_progress" | "done";
  created_at: Date;
}

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "mcp_demo",
  waitForConnections: true,
  connectionLimit: 10,
});

const server = new McpServer({
  name: "mysql-task-manager",
  version: "1.0.0",
});

// Tool 1: List tasks (optionally filtered by status)
server.registerTool(
  "list-tasks",
  {
    description: "List tasks from MySQL, optionally filtered by status.",
    inputSchema: z.object({
      status: z
        .enum(["todo", "in_progress", "done"])
        .optional()
        .describe("Filter tasks by current status"),
      limit: z
        .number()
        .int()
        .min(1)
        .max(50)
        .default(20)
        .describe("Maximum number of tasks to return"),
    }),
  },
  async ({ status, limit }) => {
    try {
      const sql = status
        ? "SELECT id, title, status, created_at FROM tasks WHERE status = ? ORDER BY id DESC LIMIT ?"
        : "SELECT id, title, status, created_at FROM tasks ORDER BY id DESC LIMIT ?";

      const params = status ? [status, limit] : [limit];
      const [rows] = await pool.query<TaskRow[]>(sql, params);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(rows, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Database error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool 2: Create a new task
server.registerTool(
  "create-task",
  {
    description: "Create a new task in MySQL.",
    inputSchema: z.object({
      title: z.string().min(1).max(255).describe("Task title"),
      status: z
        .enum(["todo", "in_progress", "done"])
        .default("todo")
        .describe("Initial task status"),
    }),
  },
  async ({ title, status }) => {
    try {
      const [result] = await pool.execute<ResultSetHeader>(
        "INSERT INTO tasks (title, status) VALUES (?, ?)",
        [title.trim(), status]
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                id: result.insertId,
                title: title.trim(),
                status,
                message: "Task created successfully",
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Failed to create task: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool 3: Update task status
server.registerTool(
  "update-task-status",
  {
    description: "Update the status of an existing task by its ID.",
    inputSchema: z.object({
      id: z.number().int().positive().describe("Task ID"),
      status: z
        .enum(["todo", "in_progress", "done"])
        .describe("New task status"),
    }),
  },
  async ({ id, status }) => {
    try {
      const [result] = await pool.execute<ResultSetHeader>(
        "UPDATE tasks SET status = ? WHERE id = ?",
        [status, id]
      );

      if (result.affectedRows === 0) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `No task found with id ${id}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Task #${id} updated to "${status}".`,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Failed to update task: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MySQL Task Manager MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error running MCP server:", error);
  process.exit(1);
});
```

---

## Step 4: Test Locally with the MCP Inspector

You do not need to wire up an AI client immediately just to verify your tools. Run the official **MCP Inspector** with `tsx`:

```bash
npx @modelcontextprotocol/inspector tsx src/index.ts
```

This opens a browser UI where you can:

1. Click **Connect** to initialize the `stdio` session.
2. Open the **Tools** tab to see `list-tasks`, `create-task`, and `update-task-status` with their generated JSON schemas.
3. Run each tool with sample inputs and inspect both normal responses and `isError` edge cases.

---

## Step 5: Connect It to an MCP Client

Once the Inspector confirms everything works, add your server to any MCP-compatible client configuration (for example, an IDE or desktop client):

```json
{
  "mcpServers": {
    "mysql-tasks": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/mysql-mcp-server/src/index.ts"],
      "env": {
        "DB_HOST": "localhost",
        "DB_PORT": "3306",
        "DB_USER": "root",
        "DB_PASSWORD": "your_password",
        "DB_NAME": "mcp_demo"
      }
    }
  }
}
```

Now you can ask your assistant things like:

- *"Show me all in-progress tasks."*
- *"Create a task to write unit tests for the auth service."*
- *"Mark task #2 as done."*

---

## Going Remote: Moving from `stdio` to Express (`StreamableHTTPServerTransport`)

If you want to host your MCP server on a remote backend instead of running it locally per user, you can swap `StdioServerTransport` for **`StreamableHTTPServerTransport`** inside an Express route (`/mcp`):

- Create a `createMcpServer()` factory that instantiates a fresh `McpServer` per session (since each `McpServer` connects to one active transport).
- Track active transports by the `mcp-session-id` header and route `POST`, `GET`, and `DELETE` requests on `/mcp` to `transport.handleRequest(req, res, req.body)`.
- Protect `/mcp` with authentication middleware (API key, JWT, or OAuth) before exposing database tools over the network.

---

## Production Checklist Before You Ship

- **Least-privilege DB credentials:** Use a dedicated MySQL user with access only to the specific tables your tools need.
- **Keep tools focused:** Prefer task-specific tools with Zod enums and bounds over generic `run-sql` tools.
- **Return structured errors:** Return `{ isError: true, content: [...] }` for validation or missing-record cases so the AI client can recover gracefully instead of crashing the process.
- **Keep `stdout` clean:** Even a single stray `console.log()` in a third-party helper can corrupt `stdio` JSON-RPC framing.

---

## Wrapping Up

With just TypeScript, Zod, `mysql2`, and `@modelcontextprotocol/sdk`, a standard database layer becomes directly usable by modern AI workflows—without sacrificing type safety or SQL injection protection.

If you are coming from Express CRUD APIs, try converting one of your existing projects into an MCP server and testing it with the Inspector. What tool would you expose first?
