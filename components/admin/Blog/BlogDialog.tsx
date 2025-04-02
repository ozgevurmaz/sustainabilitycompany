import { FormEvent, ChangeEvent, useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, ChevronsUpDown } from "lucide-react";
import { BlogFormDataType, CategoryType } from "@/lib/types/types";
import ImageUploader from "../ImageUploader";
import { 
  CalendarIcon, 
  Hash, 
  Image, 
  Info, 
  Link, 
  Save, 
  SearchIcon, 
  Tag, 
  Type, 
  X 
} from "lucide-react";

interface BlogDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: BlogFormDataType;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleImageChange: (imageUrl: string) => void;
  handleCategoriesChange?: (categories: string[]) => void;
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
  handleCategoriesChange,
  handleSubmit,
  categories,
  isEdit = false,
  isSubmitting = false
}: BlogDialogProps) {
  const title = isEdit ? "Edit Blog Post" : "Create New Blog Post";
  const description = isEdit 
    ? "Update your blog post with the latest information" 
    : "Add a new sustainable blog post to your website";
  const submitButtonText = isEdit ? "Update Post" : "Create Post";
  
  const [activeTab, setActiveTab] = useState("content");
  
  // Calculate reading time based on content
  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return `${readTimeMinutes} min read`;
  };
  
  // Format tags input for display
  const formatTags = (tags: string): string[] => {
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  };

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="mt-2">
          <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span>Content</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>Media & Metadata</span>
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <SearchIcon className="h-4 w-4" />
                <span>SEO & Publishing</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                  <Type className="h-4 w-4" /> Title
                </Label>
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
              
              <div className="grid grid-cols-1 gap-3">
                <Label htmlFor="excerpt" className="text-sm font-medium flex items-center gap-2">
                  <Info className="h-4 w-4" /> Excerpt/Summary
                </Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  rows={2}
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief summary of the post (displayed in cards and previews)"
                  className="mt-1.5"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Label htmlFor="content" className="text-sm font-medium flex items-center gap-2">
                  <Type className="h-4 w-4" /> Content
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  rows={12}
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  placeholder="Full blog post content"
                  className="mt-1.5 font-mono text-sm"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <p>Supports markdown formatting</p>
                  <p>Estimated reading time: {calculateReadTime(formData.content || '')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid grid-cols-1 gap-3">
                  <Label htmlFor="categories" className="text-sm font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4" /> Categories
                  </Label>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="justify-between w-full mt-1.5 h-10 text-left font-normal"
                      >
                        {formData.categories && formData.categories.length > 0
                          ? `${formData.categories.length} selected`
                          : "Select categories"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command className="w-full">
                        <CommandInput placeholder="Search categories..." />
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-auto">
                          {categories.map((category) => (
                            <CommandItem
                              key={category.id}
                              value={category.name}
                              onSelect={() => {
                                const currentCategories = formData.categories || [];
                                const updatedCategories = currentCategories.includes(category.name)
                                  ? currentCategories.filter(c => c !== category.name)
                                  : [...currentCategories, category.name];
                                
                                if (handleCategoriesChange) {
                                  handleCategoriesChange(updatedCategories);
                                } else {
                                  // Fallback to handleInputChange if handleCategoriesChange not provided
                                  const event = {
                                    target: { name: 'categories', value: updatedCategories }
                                  } as ChangeEvent<HTMLInputElement>;
                                  handleInputChange(event);
                                }
                              }}
                            >
                              <Checkbox
                                checked={(formData.categories || []).includes(category.name)}
                                className="mr-2 h-4 w-4"
                              />
                              {category.name}
                              {(formData.categories || []).includes(category.name) && (
                                <BadgeCheck className="ml-auto h-4 w-4 text-green-600" />
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  
                  {formData.categories && formData.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.categories.map((cat, index) => (
                        <div key={index} className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs flex items-center">
                          {cat}
                          <button
                            type="button"
                            className="ml-1 text-green-600 hover:text-green-800"
                            onClick={() => {
                              const updatedCategories = (formData.categories || []).filter(c => c !== cat);
                              if (handleCategoriesChange) {
                                handleCategoriesChange(updatedCategories);
                              } else {
                                const event = {
                                  target: { name: 'categories', value: updatedCategories }
                                } as ChangeEvent<HTMLInputElement>;
                                handleInputChange(event);
                              }
                            }}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <Label htmlFor="tags" className="text-sm font-medium flex items-center gap-2">
                    <Hash className="h-4 w-4" /> Tags
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags, separated by commas"
                    className="mt-1.5"
                  />
                  
                  {formData.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formatTags(formData.tags).map((tag, index) => (
                        <div key={index} className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                          #{tag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Media & Metadata Tab */}
            <TabsContent value="media" className="space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Image className="h-4 w-4" /> Cover Image
                </Label>
                <div className="mt-1.5">
                  <ImageUploader
                    value={formData.imageUrl}
                    onChange={(url) => handleImageChange(url)}
                    onRemove={() => handleImageChange("")}
                  />
                  <p className="text-xs text-gray-500 mt-2">Recommended: 1200×630 pixels, 2:1 aspect ratio</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Label htmlFor="slug" className="text-sm font-medium flex items-center gap-2">
                  <Link className="h-4 w-4" /> URL Slug
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug || generateSlug(formData.title)}
                    onChange={handleInputChange}
                    placeholder="post-url-slug"
                    className="mt-1.5"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const event = {
                        target: { name: 'slug', value: generateSlug(formData.title) }
                      } as ChangeEvent<HTMLInputElement>;
                      handleInputChange(event);
                    }}
                  >
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Will appear as: yourdomain.com/blog/<span className="font-medium">{formData.slug || generateSlug(formData.title)}</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Label htmlFor="author" className="text-sm font-medium flex items-center gap-2">
                  <Info className="h-4 w-4" /> Author
                </Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Post author"
                  className="mt-1.5"
                />
              </div>
            </TabsContent>
            
            {/* SEO & Publishing Tab */}
            <TabsContent value="seo" className="space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> Publishing Options
                </Label>
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
                
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 ${!formData.isPublished ? 'opacity-50' : ''}`}>
                  <div>
                    <Label htmlFor="publishDate" className="text-sm font-medium">Publish Date</Label>
                    <Input
                      id="publishDate"
                      name="publishDate"
                      type="date"
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      disabled={!formData.isPublished}
                      className="mt-1.5"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="readTime" className="text-sm font-medium">Read Time</Label>
                    <Input
                      id="readTime"
                      name="readTime"
                      value={formData.readTime || calculateReadTime(formData.content || '')}
                      onChange={handleInputChange}
                      placeholder="5 min read"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Label htmlFor="metaTitle" className="text-sm font-medium flex items-center gap-2">
                  <SearchIcon className="h-4 w-4" /> SEO Meta Title
                </Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  value={formData.metaTitle || formData.title}
                  onChange={handleInputChange}
                  placeholder="SEO title for search engines"
                  className="mt-1.5"
                />
                <p className="text-xs text-gray-500 flex justify-between">
                  <span>Leave blank to use post title</span>
                  <span className={`${(formData.metaTitle || formData.title || '').length > 60 ? 'text-red-500' : ''}`}>
                    {(formData.metaTitle || formData.title || '').length}/60 characters
                  </span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Label htmlFor="metaDescription" className="text-sm font-medium flex items-center gap-2">
                  <Info className="h-4 w-4" /> SEO Meta Description
                </Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows={2}
                  value={formData.metaDescription || formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="SEO description for search engines"
                  className="mt-1.5"
                />
                <p className="text-xs text-gray-500 flex justify-between">
                  <span>Leave blank to use excerpt</span>
                  <span className={`${(formData.metaDescription || formData.excerpt || '').length > 160 ? 'text-red-500' : ''}`}>
                    {(formData.metaDescription || formData.excerpt || '').length}/160 characters
                  </span>
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Search Engine Preview</h3>
                <div className="bg-white border rounded p-3 text-sm">
                  <div className="text-blue-600 font-medium truncate">
                    {formData.metaTitle || formData.title || 'Post Title'}
                  </div>
                  <div className="text-green-800 text-xs truncate">
                    yourdomain.com/blog/{formData.slug || generateSlug(formData.title)}
                  </div>
                  <div className="text-gray-600 mt-1 text-xs line-clamp-2">
                    {formData.metaDescription || formData.excerpt || 'Post description will appear here...'}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="pt-6 mt-4 border-t space-x-2">
            <div className="mr-auto text-xs text-gray-500">
              {formData.isPublished ? 
                <span className="text-green-600 font-medium">Will be published</span> : 
                <span className="text-amber-600 font-medium">Saved as draft</span>
              }
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Cancel
            </Button>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full mr-1"></span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> {submitButtonText}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}