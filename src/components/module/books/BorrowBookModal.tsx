import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Book } from "@/redux/features/books/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation } from "@/redux/features/books/booksApi";
import { format } from "date-fns";
import { DynamicFormField } from "./DynamicFormField";

// Zod validation schema
const borrowBookSchema = z.object({
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(1000, "Quantity cannot exceed 1000"),
  dueDate: z
    .date({
      required_error: "Please select a due date",
    })
    .refine((date) => date > new Date(), {
      message: "Due date must be in the future",
    }),
});

type BorrowBookFormData = z.infer<typeof borrowBookSchema>;

interface BorrowBookModalProps {
  book: Book;
}

const BorrowBookModal: React.FC<BorrowBookModalProps> = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<BorrowBookFormData>({
    resolver: zodResolver(borrowBookSchema),
    defaultValues: {
      quantity: 0,
    },
  });

  const [borrowBooks, { isLoading }] = useBorrowBookMutation();

  const handleBorrow = async (values: BorrowBookFormData) => {
    const borrowData = {
      book: book._id,
      quantity: values.quantity,
      dueDate: values.dueDate.toISOString(),
    };

    try {
      const res = await borrowBooks(borrowData).unwrap();

      toast.success(res.message);

      setIsOpen(false);
      form.reset();
      window.location.href = `/borrow-summary`;
    } catch (error: any) {
      console.error("Failed to borrow book:", error);
      toast.error(
        error?.data?.message || "Failed to borrow book. Please try again."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto">
          Borrow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Borrow books</DialogTitle>
          <DialogDescription className="sr-only">
            Borrow books from the library.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1.5 text-center">
          <p className="text-lg">{book.title}</p>
          <p className="text-sm text-muted-foreground italic">
            by {book.author}
          </p>
          <p className="text-sm text-muted-foreground">
            {book.copies} copies available
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleBorrow)}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <DynamicFormField
                  name="quantity"
                  label="Quantity"
                  description={`Maximum ${book.copies} copies available`}
                  children={(field) => (
                    <Input
                      {...field}
                      value={field.value || 0}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  )}
                />
              </div>
              <div className="grid gap-3">
                <DynamicFormField
                  name="dueDate"
                  label="Due date"
                  children={(field) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isLoading}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return (
                              date < today || date < new Date("1900-01-01")
                            );
                          }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Borrowing...
                  </>
                ) : (
                  "Borrow Book"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { BorrowBookModal };
