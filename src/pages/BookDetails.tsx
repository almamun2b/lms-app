import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBookDetailsQuery } from "@/redux/features/books/booksApi";
import { useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useGetBookDetailsQuery(id!, {
    skip: !id,
  });

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
    <div className="container mx-auto py-10 px-4">
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

            {data.data.description && (
              <div className="space-y-2">
                <span className="font-semibold">Description:</span>
                <p className="text-muted-foreground leading-relaxed">
                  {data.data.description}
                </p>
              </div>
            )}

            <div className="border-t pt-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(data.data.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Updated:</span>{" "}
                  {new Date(data.data.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetails;
