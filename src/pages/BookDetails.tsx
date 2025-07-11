import { BorrowBookModal } from "@/components/module/books/BorrowBookModal";
import { DeleteBookModal } from "@/components/module/books/DeleteBookModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBookDetailsQuery } from "@/redux/features/books/booksApi";
import { ArrowLeft, Edit } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetBookDetailsQuery(id!, {
    skip: !id,
  });

  const handleShowNotAvailable = () => {
    toast.error("Book is not available for borrowing.");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading books...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError || !data?.success) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-500 mb-2">Failed to load book details.</p>
              {error && "status" in error && (
                <p className="text-sm text-muted-foreground">
                  Error: {error.status}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show book details
  return (
    <div className="container mx-auto pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/books")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Button>
      </div>
      <Card className="max-w-2xl mx-auto shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            {data.data.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold min-w-[100px]">Author:</span>
              <span>{data.data.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold min-w-[100px]">Genre:</span>
              <Badge variant="secondary">{data.data.genre}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold min-w-[100px]">ISBN:</span>
              <span className="font-mono text-sm">{data.data.isbn}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold min-w-[100px]">Copies:</span>
              <span>{data.data.copies}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold min-w-[100px]">Status:</span>
              {data.data.available ? (
                <Badge variant="default" className="bg-green-500">
                  Available
                </Badge>
              ) : (
                <Badge variant="destructive">Not Available</Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold min-w-[100px]">Created at:</span>
              <span className="text-sm">
                {new Date(data.data.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold min-w-[100px]">Updated at:</span>
              <span className="text-sm">
                {new Date(data.data.updatedAt).toLocaleDateString()}
              </span>
            </div>

            {data.data.description && (
              <div className="space-y-2">
                <span className="font-semibold">Description:</span>
                <p className="text-muted-foreground leading-relaxed">
                  {data.data.description}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between gap-2 border-t pt-4">
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/edit-book/${data.data._id}`}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <DeleteBookModal book={data.data} />
              </div>

              {data.data.available ? (
                <BorrowBookModal book={data.data} />
              ) : (
                <Button
                  size="sm"
                  className="ml-auto"
                  onClick={handleShowNotAvailable}
                >
                  Borrow
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetails;
