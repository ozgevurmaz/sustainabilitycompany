"use client"

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
import { BlogPostType } from "@/lib/types/types";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { setCachedBlogs } from "@/lib/cache";


interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPostType | null;
  onDeleteSuccess: (updatedList: BlogPostType[]) => void
}

export function DeleteBlogDialog({
  isOpen,
  onClose,
  post,
  onDeleteSuccess
}: DeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = () => {
    const deleteFunction = async () => {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/blog/${post?.slug}`, {
          method: "DELETE",
        });

        setCachedBlogs(null);
        if (!response.ok) {
          throw new Error("Failed to delete blog post");
        }

        const newListResponse = await fetch("/api/blog");
        const updatedList = await newListResponse.json();
        onDeleteSuccess(updatedList);


        toast({
          title: "Blog Post Deleted",
          description: `"${post?.title}" has been deleted.`,
        });
        setIsDeleting(false)

      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete blog post.",
          variant: "destructive",
        });
      }
    };

    deleteFunction()
  };

  // If no blog post is provided
  if (!post) return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Blog Post</DialogTitle>
        </DialogHeader>
        <p>No blog post selected for deletion.</p>
      </DialogContent>
    </Dialog>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                {post.status === "published" ? "Published" : "Draft"}
              </p>
              <p className="text-sm mt-2 text-gray-700 line-clamp-2">{post.excerpt}</p>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}