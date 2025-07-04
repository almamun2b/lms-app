interface Book {
  _id: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BookDetailsResponse {
  success: boolean;
  message: string;
  data: Book;
}

interface BooksResponse {
  success: boolean;
  message: string;
  data: Book[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

interface BooksQueryParams {
  page?: number;
  limit?: number;
  filter?: Book["genre"];
  sort?: "asc" | "desc";
  sortBy?: keyof Book;
}
interface DeleteBookResponse {
  success: boolean;
  message: string;
  data: null;
}
interface BorrowSummaryQueryParams {
  page?: number;
  limit?: number;
}

interface BorrowRequestBody {
  book: string;
  quantity: number;
  dueDate: string;
}
interface BorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}
interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowSummaryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

interface BorrowResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    book: string;
    quantity: number;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
  };
}

export type {
  Book,
  BookDetailsResponse,
  BooksQueryParams,
  BooksResponse,
  BorrowRequestBody,
  BorrowResponse,
  BorrowSummaryItem,
  BorrowSummaryQueryParams,
  BorrowSummaryResponse,
  DeleteBookResponse,
};
