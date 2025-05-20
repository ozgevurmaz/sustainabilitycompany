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
import { CategoryType } from "@/lib/types/types";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { setCachedActivities, setCachedCategories } from "@/lib/cache";


interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    category: CategoryType | null;
    onDeleteSuccess: (updatedCategories: CategoryType[]) => void
}

export function DeleteCategoryDialog({
    isOpen,
    onClose,
    category,
    onDeleteSuccess
}: DeleteDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirmDelete = () => {
        const deleteFunction = async () => {
            setIsDeleting(true)
            try {
                const response = await fetch(`/api/categories/${category?._id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete blog post");
                }

                const newListResponse = await fetch("/api/categories");
                const updatedList = await newListResponse.json();
                onDeleteSuccess(updatedList);
                setCachedCategories(null)

                toast({
                    title: "Category Deleted",
                    description: `"${category?.name}" has been deleted.`,
                });
                setIsDeleting(false)
                setCachedActivities(null);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to delete category.",
                    variant: "destructive",
                });
            }
        };

        deleteFunction()
    };

    // If no blog post is provided
    if (!category) return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Categories</DialogTitle>
                </DialogHeader>
                <p>No category selected for deletion.</p>
            </DialogContent>
        </Dialog>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Category</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this category? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="font-medium">{category.name}</p>
                            <p className="text-sm text-gray-500">
                                Post Count: {category.postCount}
                            </p>
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