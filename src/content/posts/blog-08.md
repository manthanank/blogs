---
author: Manthan Ankolekar
pubDatetime: 2023-05-29T08:44:00Z
title: Daily used Git commands.
postSlug: daily-used-git-commands
featured: true
draft: false
tags:
  - git
  - github
ogImage: ""
description: Daily used Git commands..
---

Let's consider an example where you have a project named "my-project" and you want to use Git for version control. Here's how you can use Git commands in your daily workflow:

1. Initializing a Git Repository:

   ```bash
   cd my-project
   git init
   ```

2. Adding and Committing Changes:

   ```bash
   git add <file1> <file2>  # Add specific files
   git add .               # Add all files
   git status              # Check the status of the repository
   git commit -m "Initial commit"
   ```

3. Cloning a Remote Repository:

   ```bash
   git clone <repository-url>
   ```

4. Pulling and Pushing Changes:

   ```bash
   git pull origin <branch>  # Fetch and merge remote changes
   git push origin <branch>  # Push local changes to remote repository
   ```

5. Creating and Switching Branches:

   ```bash
   git branch                   # List all branches
   git branch <new-branch>      # Create a new branch
   git checkout <branch>        # Switch to a different branch
   ```

6. Merging Branches:

   ```bash
   git checkout <target-branch>  # Switch to the target branch
   git merge <source-branch>     # Merge the source branch into the target branch
   ```

7. Viewing Commit History:

   ```bash
   git log                # Show commit history
   git log --oneline      # Show condensed commit history
   ```

8. Checking Differences:

   ```bash
   git diff               # Show differences between working directory and staging area
   git diff --staged      # Show differences between staging area and last commit
   ```

9. Adding Remote Repositories:

   ```bash
   git remote add <name> <url>    # Add a remote repository
   git remote -v                  # List all remote repositories
   ```

10. Discarding Changes:

    ```bash
    git checkout -- <file>    # Discard changes in a specific file
    git reset --hard          # Discard all local changes and reset to last commit
    ```

These commands should give you a good starting point for using Git in your project. Remember to replace `<file>`, `<branch>`, `<repository-url>`, and `<new-branch>` with the appropriate values specific to your project.
