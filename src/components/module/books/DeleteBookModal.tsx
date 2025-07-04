import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/features/books/booksApi";
import type { Book } from "@/redux/features/books/types";
import { Loader2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteBookModalProps {
  book: Book;
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({ book }) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteBook(book._id).unwrap();

      toast.success(res.message);

      // Close the modal
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete book:", error);
      toast.error("Failed to delete book. Please try again.");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4 mr-1" />
          )}
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this book?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the book
            and remove it from your library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-white dark:text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Book
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteBookModal };
