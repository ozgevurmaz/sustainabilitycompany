import { FormEvent, ChangeEvent } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogFormDataType, CategoryType } from "@/lib/types/types";
import ImageUploader from "../ImageUploader";


interface DialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: BlogFormDataType;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleImageChange: (imageUrl: string) => void;
  handleSubmit: (e: FormEvent) => void;
  categories: CategoryType[];
  isEdit?: boolean;
  isSubmitting?: boolean;
}

export function BlogDialog({
  isOpen,
  onOpenChange,
  formData,
  handleInputChange,
  handleCheckboxChange,
  handleImageChange,
  handleSubmit,
  categories,
  isEdit = false,
  isSubmitting = false
}: DialogProps) {
  const title = isEdit ? "Edit Blog Post" : "Create New Blog Post";
  const description = isEdit 
    ? "Update your blog post" 
    : "Add a new blog post to your website";
  const submitButtonText = isEdit ? "Update Post" : "Create Post";
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4 max-w-full">
            <div className="grid grid-cols-1 gap-3">
              <Label htmlFor="title" className="text-sm font-medium">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter post title"
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">Cover Image</Label>
              <div className="mt-1.5">
                <ImageUploader
                  value={formData.imageUrl}
                  onChange={(url) => handleImageChange(url)}
                  onRemove={() => handleImageChange("")}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Label htmlFor="excerpt" className="text-sm font-medium">Excerpt/Summary</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                value={formData.excerpt}
                onChange={handleInputChange}
                required
                placeholder="Brief summary of the post"
                className="mt-1.5"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Label htmlFor="content" className="text-sm font-medium">Content</Label>
              <Textarea
                id="content"
                name="content"
                rows={10}
                value={formData.content}
                onChange={handleInputChange}
                required
                placeholder="Full blog post content"
                className="mt-1.5"
              />
              <p className="text-xs text-gray-500">Supports markdown formatting</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid grid-cols-1 gap-3">
                <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                <Select 
                  name="category" 
                  value={formData.category}
                  onValueChange={(value) => {
                    const event = {
                      target: { name: 'category', value }
                    } as ChangeEvent<HTMLInputElement>;
                    handleInputChange(event);
                  }}
                >
                  <SelectTrigger id="category" className="mt-1.5">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter tags, separated by commas"
                  className="mt-1.5"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Label className="text-sm font-medium">Publishing Options</Label>
              <div className="flex items-center space-x-2 mt-1.5">
                <Checkbox 
                  id="isPublished" 
                  checked={formData.isPublished}
                  onCheckedChange={(checked) => handleCheckboxChange("isPublished", checked === true)}
                />
                <label
                  htmlFor="isPublished"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Publish immediately
                </label>
              </div>
              
              {formData.isPublished && (
                <div className="mt-3">
                  <Label htmlFor="publishDate" className="text-sm font-medium">Publish Date</Label>
                  <Input
                    id="publishDate"
                    name="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    className="mt-1.5"
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Label htmlFor="metaTitle" className="text-sm font-medium">SEO Meta Title (optional)</Label>
              <Input
                id="metaTitle"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleInputChange}
                placeholder="SEO title for search engines"
                className="mt-1.5"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Label htmlFor="metaDescription" className="text-sm font-medium">SEO Meta Description (optional)</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                rows={2}
                value={formData.metaDescription}
                onChange={handleInputChange}
                placeholder="SEO description for search engines"
                className="mt-1.5"
              />
            </div>
          </div>
          <DialogFooter className="pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}