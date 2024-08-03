# Full Stack Todo Project

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)

This project provides a comprehensive setup for a full stack Todo application using TypeScript, React, Tailwind CSS, Strapi for the API, and React Hook Form for form validation. Users can log in, register, log out, and perform CRUD operations on their todos, including sorting them.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Setup](#setup)
3. [Features](#features)
4. [API Endpoints](#api-endpoints)
5. [Environment Variables](#environment-variables)

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- [Strapi](https://strapi.io/) (for API)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ahmedabdelrshed/todo-fullstack-app.git
   cd full-stack-todo
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Setup

### Tailwind CSS

Tailwind CSS is already configured in the project. You can customize it in the `tailwind.config.js` file.

### ESLint and Prettier

The project uses ESLint for linting and Prettier for code formatting. You can customize the rules in the `.eslintrc.js` and `.prettierrc` files respectively.

### React Hook Form

React Hook Form is used for form validation. You can find the form configurations in the `hooks` directory.

### Strapi

Strapi is used as the backend API. You can find the configurations in the `config` directory of the backend.

## Features

- User authentication (login, register, logout)
- CRUD operations for todos
- Sorting todos
- Form validation with React Hook Form
- Styling with Tailwind CSS
- API Endpoints

## The Strapi backend provides the following API endpoints:

- POST /auth/local/register: Register a new user.
- POST /auth/local: Log in a user.
- GET /todos: Get all todos for the authenticated user.
- POST /todos: Create a new todo.
- PUT /todos/:id: Update an existing todo.
- DELETE /todos/:id: Delete a todo.
