import { config } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BooksResponse, BooksQueryParams, Book } from "./types";

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  tagTypes: ["books"],
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
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation, useDeleteBookMutation } =
  booksApi;

export { booksApi };
