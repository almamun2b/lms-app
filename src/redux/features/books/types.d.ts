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

export type { Book, BooksQueryParams, BooksResponse };
