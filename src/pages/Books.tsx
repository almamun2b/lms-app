import { BookCard } from "@/components/module/books/BookCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/features/books/booksApi";
import type { Book, BooksQueryParams } from "@/redux/features/books/types";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import React, { useState } from "react";

const Books: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedGenre, setSelectedGenre] = useState<Book["genre"] | "">("");
  const [sortBy, setSortBy] = useState<keyof Book>("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const queryParams: BooksQueryParams = {
    page: currentPage,
    limit: pageSize,
    ...(selectedGenre && { filter: selectedGenre }),
    sort: sortOrder,
    sortBy: sortBy,
  };

  const { data, error, isLoading } = useGetBooksQuery(queryParams);
  const [deleteBook] = useDeleteBookMutation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id).unwrap();
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  const handleBorrow = (id: string) => {
    console.log("Borrow book:", id);
    // Implement borrow logic here
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value === "all" ? "" : (value as Book["genre"]));
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value as keyof Book);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCurrentPage(1);
  };

  const genres: Book["genre"][] = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ];
  const sortableFields: (keyof Book)[] = [
    "title",
    "author",
    "genre",
    "createdAt",
    "updatedAt",
  ];

  const renderPaginationItems = () => {
    if (!data?.pagination) return null;

    const { totalPage } = data.pagination;
    const items = [];

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          className={
            currentPage === 1
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPage, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() =>
            currentPage < totalPage && handlePageChange(currentPage + 1)
          }
          className={
            currentPage === totalPage
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading books. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Books</h1>
        <div className="text-sm text-muted-foreground">
          Showing {data?.data.length || 0} of {data?.pagination.total || 0}{" "}
          books
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {/* Genre Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Genre
              </label>
              <Select
                value={selectedGenre || "all"}
                onValueChange={handleGenreChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="space-y-3 flex flex-col">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={handleSortByChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortableFields.map((field) => (
                    <SelectItem key={field} value={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="space-y-3 flex flex-col">
              <label className="text-sm font-medium">Order</label>
              <Button
                variant="outline"
                size="default"
                onClick={toggleSortOrder}
                className=" bg-white w-[134px]"
              >
                {sortOrder === "asc" ? (
                  <>
                    <SortAsc className="w-4 h-4 mr-2" />
                    Ascending
                  </>
                ) : (
                  <>
                    <SortDesc className="w-4 h-4 mr-2" />
                    Descending
                  </>
                )}
              </Button>
            </div>

            {/* Page Size */}
            <div className="space-y-3 flex flex-col">
              <label className="text-sm font-medium">Per Page</label>
              <Select
                value={pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Books Grid */}
      {data?.data.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">
              No books found matching your criteria.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.data.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onDelete={handleDelete}
              onBorrow={handleBorrow}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPage > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>{renderPaginationItems()}</PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Books;
