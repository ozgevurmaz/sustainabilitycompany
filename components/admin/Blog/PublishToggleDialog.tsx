"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { BlogPostType } from '@/lib/types/types';
import React from 'react'

interface PublishToggleDialogProps {
    isOpen: boolean;
    onClose: () => void;
    post: BlogPostType | null;
    onToggleSuccess: (updatedList: BlogPostType[]) => void
}

export function PublishToggleDialog({
    isOpen,
    onClose,
    post,
    onToggleSuccess }: PublishToggleDialogProps) {

    const isPublished = post?.status === "published";

    const isScheduled = post?.status === "scheduled";

    const handleConfirm = async (slug: string, status: string) => {

        let newStatus;
        if (status === "published") {
            newStatus = "draft"
        } else {
            newStatus = "published"
        }


        try {
            const response = await fetch(`/api/blog/togglePublish`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug, newStatus })
            });

            if (!response.ok) {
                throw new Error("Failed to update blog post");
            }

            const newListResponse = await fetch("/api/blog");
            const updatedList = await newListResponse.json();
            onToggleSuccess(updatedList);

        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${isPublished ? "unpublish" : "publish"} blog post.`,
                variant: "destructive",
            });
        }
    }

    // If no blog post is provided
    if (!post) return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Publish Service</DialogTitle>
                </DialogHeader>
                <p>No service selected for publish/unpublish.</p>
            </DialogContent>
        </Dialog>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isPublished ? "Unpublish" : "Publish"} Blog Post</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to {isPublished ? "unpublish" : "publish"} this blog post? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="font-medium">{post.title}</p>
                            <p className="text-sm text-gray-500">
                                {post?.status === "published" ? "Published" : "Draft"}
                            </p>
                            <p className="text-sm mt-2 text-gray-700 line-clamp-2">{post.excerpt}</p>
                            {isScheduled && (
                                <p className="text-sm text-yellow-600 mt-2">
                                    This blog post is scheduled to be published on {post.publishDate.toLocaleString()}, {post.publishTime?.toString()}.
                                    By publishing it now, the scheduled time will be ignored and it will go live immediately.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleConfirm(post.slug, post.status)}
                    >
                        {isPublished ? "Unpublish" : "Publish"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
