import App from "@/App";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        path: "/",
        Component: Books,
      },
      {
        path: "/books",
        Component: Books, // list all books with options
      },
      {
        path: "/create-book",
        Component: CreateBook, // form to add a new book
      },
      {
        path: "/books/:id",
        Component: BookDetails, // single book details
      },
      {
        path: "/edit-book/:id",
        Component: EditBook, // edit an existing book
      },
      {
        path: "/borrow/:bookId",
        Component: BorrowBook, // borrow a book form
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary, // aggregated summary
      },
    ],
  },
]);

export default router;
