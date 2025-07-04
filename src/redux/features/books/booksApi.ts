import { config } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Book,
  BookDetailsResponse,
  BooksQueryParams,
  BooksResponse,
  BorrowRequestBody,
  BorrowResponse,
  BorrowSummaryQueryParams,
  BorrowSummaryResponse,
  DeleteBookResponse,
} from "./types";

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  tagTypes: ["books", "borrows"],
  endpoints: (builder) => ({
    getBooks: builder.query<BooksResponse, BooksQueryParams>({
      query: ({ page = 1, limit = 10, filter, sort, sortBy } = {}) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (filter) params.append("filter", filter);
        if (sort) params.append("sort", sort);
        if (sortBy) params.append("sortBy", sortBy);

        return `/books?${params.toString()}`;
      },
      providesTags: ["books"],
    }),
    getBookDetails: builder.query<BookDetailsResponse, string>({
      query: (id) => `/books/${id}`,
    }),
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: `/books/${book._id}`,
        method: "PATCH",
        body: book,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation<DeleteBookResponse, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    getBorrowSummary: builder.query<
      BorrowSummaryResponse,
      BorrowSummaryQueryParams
    >({
      query: ({ page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        return `/borrow?${params.toString()}`;
      },
      providesTags: ["borrows"],
    }),
    borrowBook: builder.mutation<BorrowResponse, BorrowRequestBody>({
      query: (borrow) => ({
        url: `/borrow`,
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: ["books", "borrows"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetBorrowSummaryQuery,
  useBorrowBookMutation,
  useGetBookDetailsQuery,
} = booksApi;

export { booksApi };
