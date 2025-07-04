import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Book } from "@/redux/features/books/types";
import { Book as BookIcon, BookOpen, Edit } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { BorrowBookModal } from "./BorrowBookModal";
import { DeleteBookModal } from "./DeleteBookModal";

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const handleShowNotAvailable = () => {
    toast.error("Book is not available for borrowing.");
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-lg line-clamp-2 leading-tight flex items-start justify-between gap-2">
              <span>{book.title}</span>
              <Button asChild variant="outline" size="sm">
                <Link to={`/books/${book._id}`} className="text-sm">
                  Details
                </Link>
              </Button>
            </CardTitle>
            <CardDescription className="text-sm">
              by {book.author}
            </CardDescription>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{book.genre.replace("_", " ")}</Badge>
              <Badge
                variant="destructive"
                className={
                  book.available
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : ""
                }
              >
                {book.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {book.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookIcon className="w-4 h-4" />
            <span>{book.copies} copies</span>
          </div>
          <span className="text-xs truncate max-w-24" title={book.isbn}>
            {book.isbn}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 pt-3">
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to={`/books/${book._id}/edit`}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Link>
          </Button>
          <DeleteBookModal book={book} />
        </div>

        {book.available ? (
          <BorrowBookModal book={book} />
        ) : (
          <Button
            size="sm"
            className="ml-auto"
            onClick={handleShowNotAvailable}
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Borrow
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
