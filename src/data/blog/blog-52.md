---
author: Manthan Ankolekar
pubDatetime: 2025-02-25T08:44:00Z
modDatetime: 2025-02-26T08:44:00Z
title: Managing Environment Variables in Angular Using --define
postSlug: managing-environment-variables-in-angular-using-define
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Learn how to manage environment variables in Angular using --define for better security and flexibility."
---

Handling environment-specific configurations is crucial in Angular applications, especially when dealing with sensitive data like API keys. Instead of hardcoding values in environment files, we can dynamically inject them at build time using the `--define` flag.

This approach improves security, avoids exposing sensitive data in the source code, and simplifies deployments across different environments.

---

## **Why Use `--define` for Environment Variables?**

Traditionally, Angular provides environment files (`environment.ts`, `environment.development.ts`) to manage configurations. However, hardcoding API keys in these files is a security risk.

Instead, using `--define` allows us to:
✅ Inject environment variables dynamically at build time.  
✅ Avoid storing sensitive data in source code.  
✅ Easily switch between environments without modifying files.

---

## **Project Setup**

Our Angular project follows this structure:

```text
src/
├── environments/
│   ├── environment.ts
│   ├── environment.development.ts
├── app/
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.config.ts
│   ├── app.routes.ts
│   ...
├── main.ts
├── index.html
├── styles.css
├── ...
```

### **1. Environment Configuration (`environment.ts`)**

Instead of hardcoding values, `environment.ts` declares the API key variable dynamically:

```typescript
declare const apiKey: string;

export const environment = {
  apiKey: apiKey,
};
```

Similarly, `environment.development.ts` follows the same structure, allowing different configurations for development and production.

---

### **2. Using Environment Variables in `app.component.ts`**

The API key is retrieved from the environment and used inside `app.component.ts`:

```typescript
import { Component } from "@angular/core";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "ng-env";

  protected readonly apiKey = environment.apiKey;

  constructor() {}
}
```

Here’s how it works:  
✅ `environment.apiKey` is dynamically assigned at build time.  
✅ The API key is used in the component without hardcoding it.

## **Injecting API Key at Build Time with `--define`**

Instead of modifying `environment.ts` directly, pass the API key dynamically during the build process:

```bash
ng build --define "apiKey='your-secret-api-key-here'"
```

This replaces `apiKey` in `environment.ts` with the provided value, ensuring secure and environment-specific API key management.

---

## **Running the Angular Build Locally**

Since `--define` works at **build time**, you need to first build the project and then serve it using a static server.

### **1. Build the Project with API Key**

Run the following command:

```bash
ng build --define "apiKey='your-secret-api-key-here'"
```

This will generate a production build inside `dist/ng-env/browser/`.

### **2. Serve the Built Files Locally**

Use **npx http-server** to serve the built files:

```bash
npx http-server dist/ng-env/browser
```

This starts a local server, and you can access your app at:

🔗 [http://localhost:8080](http://localhost:8080) _(default port, unless changed)_

### **3. (Optional) Specify a Custom Port**

If you want to serve it on a different port, use:

```bash
npx http-server dist/ng-env/browser -p 4200
```

Then, access the app at:  
🔗 [http://localhost:4200](http://localhost:4200)

---

## **Why This Approach is Better?**

✅ **No Hardcoded Secrets** – API keys are injected at build time, reducing security risks.  
✅ **Environment-Specific API Keys** – Different keys can be used for different environments dynamically.  
✅ **Seamless CI/CD Integration** – Keys can be injected using CI/CD pipelines (e.g., GitHub Actions, Jenkins).  
✅ **No Need for Multiple Environment Files** – Single `environment.ts` file works for all environments.

---

## **Best Practices**

- **Ensure API keys are kept secure** and not exposed in logs.
- **Use CI/CD pipelines** to inject secrets dynamically.
- **Avoid committing sensitive values** in version control (GitHub, GitLab).

## **Conclusion**

By using `--define`, we can securely manage environment variables in Angular, eliminating the need to store sensitive data in the source code. This approach ensures flexibility, security, and easier deployments across different environments.

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/ng-env) to explore the code in detail.

## **Additional Resources**

📚 [Angular CLI Environment Configuration](https://angular.dev/tools/cli/environments)  
📚 [Angular v19 Release Notes](https://blog.angular.dev/meet-angular-v19-7b29dfd05b84)

These resources provide deeper insights into environment configuration and the latest Angular features.

That concludes our guide on managing environment variables in Angular! I hope this helps you build more secure and maintainable applications.

Happy coding! 🚀
