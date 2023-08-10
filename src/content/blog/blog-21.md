---
author: Manthan Ankolekar
pubDatetime: 2023-08-10T08:44:00Z
title: MySQL CheatSheet
postSlug: mysql-cheatsheet
featured: false
draft: false
tags:
  - mysql
ogImage: ""
description: MySQL CheatSheet
---

Here's a MySQL cheat sheet with some commonly used commands and concepts:

**Connecting to MySQL:**

```bash
mysql -u username -p
```

**Basic Commands:**

- Show Databases:

  ```bash
  SHOW DATABASES;
  ```

- Create Database:

  ```bash
  CREATE DATABASE database_name;
  ```

- Use Database:

  ```bash
  USE database_name;
  ```

- Show Tables:

  ```bash
  Show Tables
  ```

- Describe Table:

  ```bash
  DESCRIBE table_name;
  ```

**Data Manipulation:**

- Insert Data:

  ```bash
  INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);
  ```

- Update Data:

  ```bash
  UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
  ```

- Delete Data:

  ```bash
  DELETE FROM table_name WHERE condition;
  ```

- Select Data:

  ```bash
  SELECT column1, column2, ... FROM table_name WHERE condition;
  ```

**Filtering and Sorting:**

- Filtering with WHERE:

  ```bash
  SELECT * FROM table_name WHERE condition;
  ```

- Sorting with ORDER BY:

  ```bash
  SELECT * FROM table_name ORDER BY column_name ASC/DESC;
  ```

Aggregation Functions:

- Count:

  ```bash
  SELECT COUNT(column_name) FROM table_name;
  ```

- Sum:

  ```bash
  SELECT SUM(column_name) FROM table_name;
  ```

- Average:

  ```bash
  SELECT AVG(column_name) FROM table_name;
  ```

**Joining Tables:**

- Inner Join:

  ```bash
  SELECT * FROM table1 INNER JOIN table2 ON table1.column = table2.column;
  ```

- Left Join:

  ```bash
  SELECT * FROM table1 LEFT JOIN table2 ON table1.column = table2.column;
  ```

- Grouping Data:

  ```bash
  SELECT column1, COUNT(*) FROM table_name GROUP BY column1;
  ```

**Indexes:**

- Creating Index:

  ```bash
  CREATE INDEX index_name ON table_name(column_name);
  ```

- Dropping Index:

  ```bash
  DROP INDEX index_name ON table_name;
  ```

Backup and Restore:

- Backup:

  ```bash
  mysqldump -u username -p database_name > backup.sql
  ```

- Restore:

  ```bash
  SHOW DATABASES;
  ```

Remember to replace username, database_name, table_name, etc., with your actual values. This cheat sheet covers the basics, but MySQL is a rich and powerful database system, so there's a lot more you can explore and learn.
