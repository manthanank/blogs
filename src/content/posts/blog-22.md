---
author: Manthan Ankolekar
pubDatetime: 2023-10-03T08:44:00Z
title: Easy steps to migrate all Angular components to standalone
postSlug: easy-steps-to-migrate-all-angular-components-to-standalone
featured: false
draft: false
tags:
  - angular
ogImage: ""
description: Easy steps to migrate all Angular components to standalone
---

To make all components in your Angular project standalone, you can use the following steps:

1. Update your angular.json file to set the standalone flag to true for all component schematics:

   ```json
   // angular.json
   {
     "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
     "version": 1,
     "newProjectRoot": "projects",
     "projects": {
       "my-app": {
         "projectType": "application",
         "schematics": {
           "@schematics/angular:component": {
             "standalone": true
           }
         }
       }
     }
   }
   ```

2. Run the following command to migrate all existing components to standalone:

   ```bash
   ng g @angular/core:standalone --all
   ```

This will add the `standalone: true` flag to all component decorators and update the component imports as needed.

Verify that your application builds and runs correctly.
Once you have made all components standalone, you can remove any unnecessary NgModules from your application.

Here is an example of how to remove an NgModule:

1. Open the NgModule file in a text editor.
2. If the NgModule does not bootstrap a component, you can simply delete the file.
3. If the NgModule does bootstrap a component, you need to move the component declaration to the main.ts file.

Once you have removed all unnecessary NgModules, you will have a fully standalone Angular application.

Please note that the `ng g @angular/core:standalone --all` command may not be able to migrate all components perfectly. You may need to make manual changes to some components.
