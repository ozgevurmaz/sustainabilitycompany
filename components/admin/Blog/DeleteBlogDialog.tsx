import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent
  } from "@/components/ui/card";
  
  interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    status: "published" | "draft";
  }
  
  interface DeleteDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    post: BlogPost | null;
    onDelete: () => void;
    isDeleting?: boolean;
  }
  
  export function DeleteBlogDialog({
    isOpen,
    onOpenChange,
    post,
    onDelete,
    isDeleting = false
  }: DeleteDialogProps) {
    if (!post) return null;
  
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Card>
              <CardContent className="pt-6">
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-gray-500">
                  {post.category} • {post.status === "published" ? "Published" : "Draft"}
                </p>
                <p className="text-sm mt-2 text-gray-700 line-clamp-2">{post.excerpt}</p>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="destructive"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }