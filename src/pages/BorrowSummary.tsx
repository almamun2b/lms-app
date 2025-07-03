import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/features/books/booksApi";
import { AlertCircle, BookOpen, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

interface BorrowSummaryProps {
  initialPage?: number;
  initialLimit?: number;
}

const BorrowSummary: React.FC<BorrowSummaryProps> = ({
  initialPage = 1,
  initialLimit = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageLimit] = useState(initialLimit);

  const {
    data: borrowData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetBorrowSummaryQuery({
    page: currentPage,
    limit: pageLimit,
  });

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (borrowData?.pagination?.totalPage || 1)) {
      setCurrentPage(newPage);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  // Loading state with spinner
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Loading borrow summary...</p>
      </div>
    </div>
  );

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Borrow Summary</h2>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load borrow summary. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Borrow Summary</h2>
          <Button onClick={handleRefresh} variant="outline" size="sm" disabled>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        <Card>
          <CardContent>
            <LoadingSpinner />
          </CardContent>
        </Card>
      </div>
    );
  }

  // No data state
  if (!borrowData?.data || borrowData.data.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Borrow Summary</h2>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              No borrowed books found
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              You haven't borrowed any books yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data: borrowItems, pagination } = borrowData;

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const totalPages = pagination.totalPage;
    const current = currentPage;

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 4) {
        pages.push("ellipsis1");
      }

      // Show pages around current page
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < totalPages - 3) {
        pages.push("ellipsis2");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Borrow Summary</h2>
          <p className="text-muted-foreground">
            Overview of your borrowed books
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          disabled={isFetching}
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Borrowed Books
          </CardTitle>
          <CardDescription>
            Total of {pagination.total} borrowed book
            {pagination.total !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isFetching && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-md">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          )}
          <div className="rounded-md border relative">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Title</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowItems.map((item, index) => (
                  <TableRow key={`${item.book.isbn}-${index}`}>
                    <TableCell className="font-medium">
                      {item.book.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.book.isbn}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{item.totalQuantity}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.totalPage > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total}
          </div>

          <Pagination className="flex justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage <= 1 || isFetching
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>

              {generatePageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === "ellipsis1" || page === "ellipsis2" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isFetching) handlePageChange(page as number);
                      }}
                      isActive={page === currentPage}
                      className={
                        isFetching ? "pointer-events-none opacity-50" : ""
                      }
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < pagination.totalPage)
                      handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage >= pagination.totalPage || isFetching
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
