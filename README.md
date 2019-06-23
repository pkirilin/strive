# Strive

## Summary

This project is a simplified task planner application. It allows users to manage **tasks**. **Task** is a central application entity. Each task has its own title, description, status and belongs to some **project**. **Project** is an entity used to logically group a bundle of tasks together.

## Application structure

The application consists of two parts: **strive-client** and **strive-server**.

**strive-client** is a front-end part of the application. Written on React with a Redux usage for application state management. Bootstrap 4 styles and reactstrap components are used to stylize application components.

**strive-server** is a back-end part of the application. Written on ASP.NET Core. The core server app part contains a number of Web API controllers used by client part to get some data from database and return it to client app to show it in UI. Entity Framework Core is used as an ORM with Npgsql database provider for PostgreSQL application database.

## Features

1. User authorization and registration
2. Alert notifications for displaying a success or error messages in the application
3. CRUD for projects
4. CRUD for tasks
5. Changing statuses for one or multiple tasks
6. Filtering tasks by status

## Screenshots

### Logging in

![Logging in](/assets/login.png)

### Viewing project list

![Viewing project list](/assets/projects-overview.png)

### Creating a project

![Creating a project](/assets/create-project.png)

### Viewing project info

![Viewing project info](/assets/project-info.png)

### Creating a task

![Creating a task](/assets/create-task.png)

### Viewing task info

![Viewing task info](/assets/task-info.png)
