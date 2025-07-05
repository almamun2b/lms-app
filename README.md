---
title: Minimal Library Management System – Frontend
description: A minimalist library management system built with React, Redux Toolkit Query, and TypeScript.
---

# 📚 Minimal Library Management System – Frontend

A clean, minimalist library management system built with **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**.  
This client app enables users to view, add, edit, delete, and borrow books, as well as see a summary of borrowed books—all with a beautiful, fully responsive UI and no authentication.

---

## 🚀 Features

- **Public Access**: All routes and features are available without authentication.
- **Book Management**:
  - View all books in a responsive page with cards: Title, Author, Genre, ISBN, Copies, Availability, and Actions.
  - Edit book details via page.
  - Delete books with confirmation.
  - Add new books with validation.
- **Borrowing**:
  - Borrow books with quantity and due date.
  - Borrowing logic enforces available copy limits and updates availability automatically.
- **Borrow Summary**: Aggregate summary of all borrowed books (title, ISBN, total quantity borrowed).
- **Navigation**: Simple navigation bar with links to all core pages.
- **Responsive Design**: Mobile, tablet, and desktop friendly via Tailwind CSS.
- **Optimistic UI Updates**
- **Toast Notifications**
- **Type-Safe Forms**

---

## 🧭 Pages

| Route             | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `/books`          | List all books with actions (view, edit, delete, borrow) |
| `/create-book`    | Add a new book                                           |
| `/books/:id`      | View details for a single book                           |
| `/edit-book/:id`  | Edit existing book                                       |
| `/borrow/:bookId` | Borrow a selected book by Modal                          |
| `/borrow-summary` | Aggregated summary of all borrowed books                 |

---

## 🗂️ Project Structure

```
src/
  ├── app/                # Redux store + RTK Query setup
  ├── components/         # Shared UI components (Navbar, Footer, etc.)
  |   ├── layout/         # Header, Footer, etc.
  |   ├── module/         # Specific module components (books, borrow, etc.)
  |   └── ui/             # Shared UI elements (buttons, cards, forms, etc.)
  ├── config/             # Environment variables & app config
  ├── lib/                # Utility functions
  ├── pages/              # Individual page components
  ├── providers/          # Theme, context, etc.
  ├── redux/
  │   ├── features/       # Redux slices & RTK Query endpoints
  │   ├── hooks/          # Custom hooks for Redux
  │   ├── store/          # Redux store setup
  │   └── types/          # Redux types & interfaces
  ├── routes/             # Page components and routing
  ├── types/              # TypeScript types & interfaces
  ├── App.tsx             # Main routing and layout
  ├── index.css           # Global styles
  ├── main.tsx            # App entry point
  └── vite-env.d.ts       # Vite environment variables
```

---

## 🔗 Backend API

- **Book endpoints**: `GET /books`, `POST /books`, `PATCH /books/:id`, `DELETE /books/:id`
- **Borrow endpoints**: `POST /borrow`, `GET /borrow-summary`
- **Pagination**: Supported for book listings, borrow summary.

> **Note:** This frontend expects a RESTful backend as described in the [project overview](#).

---

## 🛠️ Tech Stack

| Layer     | Technology                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| Frontend  | [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)                                 |
| State     | [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) |
| Styling   | [Tailwind CSS](https://tailwindcss.com/)                                                                      |
| Backend\* | Node.js + Express.js + MongoDB + Mongoose                                                                     |

> \* You need to run the backend API for full functionality.

---

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/almamun2b/lms-app.git
cd lms-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Endpoint

Edit the API base URL in your RTK Query service setup to match your backend server.

### 4. Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173/) to view the app.

---

## 📦 Folder Details

- **/features/books/**: All book-related pages, forms, RTK endpoints, and slices.
- **/components/**: Navbar, Footer, BookTable, etc.
- **/types/**: Shared TypeScript interfaces for books, borrow records, API responses.

---

## 🏆 Bonus Features

- **Optimistic UI Updates**: Instantly reflect changes before server confirmation.
- **Toast Notifications**: User feedback for all actions (success/errors).
- **Responsive Layout**: Mobile-first, adapts to all device sizes.
- **Type-Safe Forms**: All forms use strict TypeScript validation.

---

## 🤝 Contributing

PRs are welcome! Please open an issue to discuss any big changes.

---

## 📜 License

[MIT](./LICENSE)

---

> Minimal Library Management System – Frontend  
> Made with ❤️ by [Abdullah Al Mamun]
