import { DynamicFormField } from "@/components/module/books/DynamicFormField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetBookDetailsQuery,
  useUpdateBookMutation,
} from "@/redux/features/books/booksApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// Zod Schema
const updateBookSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(100, "Author name cannot exceed 100 characters"),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      required_error: "Please select a genre",
    }
  ),
  isbn: z
    .string()
    .min(10, "ISBN must be at least 10 characters")
    .max(17, "ISBN cannot exceed 17 characters")
    .regex(/^[\d-]+$/, "ISBN can only contain digits and hyphens"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description cannot exceed 1000 characters"),
  copies: z
    .number()
    .min(1, "Copies must be at least 1")
    .max(1000, "Copies cannot exceed 1000"),
  available: z.boolean(),
});

type UpdateBookFormData = z.infer<typeof updateBookSchema>;

// Genre options
const GENRE_OPTIONS = [
  { value: "FICTION", label: "Fiction" },
  { value: "NON_FICTION", label: "Non-Fiction" },
  { value: "SCIENCE", label: "Science" },
  { value: "HISTORY", label: "History" },
  { value: "BIOGRAPHY", label: "Biography" },
  { value: "FANTASY", label: "Fantasy" },
] as const;

export const UpdateBook: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // RTK Query hooks
  const {
    data: bookResponse,
    isLoading: isLoadingBook,
    error: bookError,
  } = useGetBookDetailsQuery(id!, {
    skip: !id,
  });

  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const book = bookResponse?.data;

  const form = useForm<UpdateBookFormData>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 0,
      available: true,
    },
  });

  useEffect(() => {
    if (book) {
      setTimeout(() => {
        form.reset({
          title: book.title,
          author: book.author,
          genre: book.genre,
          isbn: book.isbn,
          description: book.description,
          copies: book.copies,
          available: book.available,
        });
      }, 0);
    }
  }, [book, form]);

  const handleSubmit = async (values: UpdateBookFormData) => {
    if (!id || !book) return;

    try {
      const updateData = {
        _id: id,
        ...values,
      };

      const response = await updateBook(updateData).unwrap();

      toast.success(response.message || "Book updated successfully!");

      setIsRedirecting(true);
      setTimeout(() => {
        navigate("/books");
      }, 1500);
    } catch (error: any) {
      console.error("Failed to update book:", error);
      toast.error(
        error?.data?.message || "Failed to update book. Please try again."
      );
    }
  };

  const handleCancel = () => {
    if (form.formState.isDirty) {
      navigate("/books");
    } else {
      navigate("/books");
    }
  };

  const isSubmitting = isUpdating || isRedirecting;

  // Loading state
  if (isLoadingBook) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading book details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (bookError || !book) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/books")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Button>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {bookError
              ? "Failed to load book details. Please try again."
              : "Book not found."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="mb-4"
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Button>

        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Update Book</h1>
        </div>
        <p className="text-muted-foreground">
          Edit the details of "{book.title}"
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
          <CardDescription>
            Update the details for this book in your library collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <div className="grid gap-4">
                  <DynamicFormField
                    name="title"
                    label="Title *"
                    children={(field) => (
                      <Input
                        {...field}
                        placeholder="Enter book title"
                        disabled={isSubmitting}
                      />
                    )}
                  />

                  <DynamicFormField
                    name="author"
                    label="Author *"
                    children={(field) => (
                      <Input
                        {...field}
                        placeholder="Enter author name"
                        disabled={isSubmitting}
                      />
                    )}
                  />

                  <DynamicFormField
                    name="genre"
                    label="Genre *"
                    children={(field) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                        key={book?.genre || "default"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {GENRE_OPTIONS.map((genre) => (
                            <SelectItem key={genre.value} value={genre.value}>
                              {genre.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <DynamicFormField
                    name="isbn"
                    label="ISBN *"
                    description="Enter the ISBN with or without hyphens"
                    children={(field) => (
                      <Input
                        {...field}
                        placeholder="Enter ISBN (e.g., 978-3-16-148410-0)"
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Description</h3>

                <DynamicFormField
                  name="description"
                  label="Book Description *"
                  description="Provide a comprehensive description that will help users understand what the book is about"
                  children={(field) => (
                    <Textarea
                      {...field}
                      placeholder="Enter a detailed description of the book..."
                      disabled={isSubmitting}
                      rows={6}
                      className="resize-none"
                    />
                  )}
                />
              </div>

              <Separator />

              {/* Inventory Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Inventory Information</h3>

                <div className="grid gap-4">
                  <DynamicFormField
                    name="copies"
                    label="Number of Copies *"
                    description="How many copies of this book are available in the library"
                    children={(field) => (
                      <Input
                        {...field}
                        type="text"
                        value={field.value || 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  <DynamicFormField
                    name="available"
                    label="Available for borrowing"
                    description="Check this if the book should be available for users to borrow immediately"
                    children={(field) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isRedirecting ? "Redirecting..." : "Updating Book..."}
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Update Book
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateBook;
