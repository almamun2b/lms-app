import { DynamicFormField } from "@/components/module/books/DynamicFormField";
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
import { useAddBookMutation } from "@/redux/features/books/booksApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookPlus, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// Zod Schema
const createBookSchema = z.object({
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
    .min(6, "ISBN must be at least 4 characters")
    .max(20, "ISBN cannot exceed 20 characters")
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

type CreateBookFormData = z.infer<typeof createBookSchema>;

// Genre options
const GENRE_OPTIONS = [
  { value: "FICTION", label: "Fiction" },
  { value: "NON_FICTION", label: "Non-Fiction" },
  { value: "SCIENCE", label: "Science" },
  { value: "HISTORY", label: "History" },
  { value: "BIOGRAPHY", label: "Biography" },
  { value: "FANTASY", label: "Fantasy" },
] as const;

const CreateBook: React.FC = () => {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<CreateBookFormData>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

  const [addBook, { isLoading }] = useAddBookMutation();

  const handleSubmit = async (values: CreateBookFormData) => {
    try {
      const response = await addBook(values).unwrap();

      toast.success(response.message || "Book created successfully!");

      // Reset form
      form.reset();

      setIsRedirecting(true);
      setTimeout(() => {
        navigate("/books");
      }, 1000);
    } catch (error) {
      console.error("Failed to create book:", error);
      toast.error("Failed to create book. Please try again.");
    }
  };

  const handleCancel = () => {
    if (form.formState.isDirty) {
      navigate("/books");
    } else {
      navigate("/books");
    }
  };

  const isSubmitting = isLoading || isRedirecting;

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
          <BookPlus className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Create New Book</h1>
        </div>
        <p className="text-muted-foreground">
          Add a new book to your library collection
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
          <CardDescription>
            Fill in the details for the new book you want to add to the library
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
                        defaultValue={field.value}
                        disabled={isSubmitting}
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
                      {isRedirecting ? "Redirecting..." : "Creating Book..."}
                    </>
                  ) : (
                    <>
                      <BookPlus className="mr-2 h-4 w-4" />
                      Create Book
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

export default CreateBook;
