"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TestimonialFormType } from "@/lib/types/types"; 
import { useEffect } from "react";

type Props = {
  isDialogOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  mode: "add" | "edit";
  formData: TestimonialFormType;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const TestimonialDialog = ({
  isDialogOpen,
  onOpenChange,
  onClose,
  mode,
  formData,
  handleSubmit,
  handleInputChange,
}: Props) => {
  const isEdit = mode === "edit";

  return (
    <Dialog 
      open={isDialogOpen} 
      onOpenChange={(open) => {
        if (!open) {
          // Ensure form data is cleared on dialog close
          onClose();
        }
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the testimonial information"
              : "Add a new customer testimonial to your website"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <InputRow
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputRow
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />
            <InputRow
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
            />
            <InputRow
              label="Rating"
              name="rating"
              type="number"
              min="1"
              max="5"
              step="0.5"
              value={formData.rating}
              onChange={handleInputChange}
            />
            <InputRow
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right" htmlFor="comment">
                Testimonial
              </Label>
              <Textarea
                id="comment"
                name="comment"
                className="col-span-3"
                rows={4}
                value={formData.comment}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Update Testimonial" : "Add Testimonial"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialDialog;

// Helper input row
const InputRow = ({
  label,
  name,
  ...props
}: {
  label: string;
  name: string;
  [key: string]: any;
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right" htmlFor={name}>
        {label}
      </Label>
      <Input id={name} name={name} className="col-span-3" {...props} required />
    </div>
  );
};