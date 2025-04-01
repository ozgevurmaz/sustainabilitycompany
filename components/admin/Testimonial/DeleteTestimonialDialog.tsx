"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TestimonialType } from "@/lib/types/types";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onConfirm: () => void;
  testimonial: TestimonialType | null;
};

const DeleteTestimonialDialog = ({
  isOpen,
  onOpenChange,
  onClose,
  onConfirm,
  testimonial,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Testimonial</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this testimonial? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {testimonial && (
            <Card>
              <CardContent className="pt-6">
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-gray-500">
                  {testimonial.position} at {testimonial.company}
                </p>
                <p className="text-sm mt-2 text-gray-700">"{testimonial.comment}"</p>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm}>
            Delete Testimonial
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTestimonialDialog;
