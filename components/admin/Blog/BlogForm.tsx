"use client"

import { ChangeEvent, useState, useEffect, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { BadgeCheck, ChevronsUpDown, List, ListOrdered, Loader2, Plus, Quote, Trash2 } from "lucide-react";
import { BlogPostType, CategoryType } from "@/lib/types/types";
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
import { formatTags, generateSlug } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { blogPostSchema } from "@/lib/Schema/blog";
import LoadingPage from "@/components/LoadingPage";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AddCategoryDialog } from "./AddCategoryDialog";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from "@tiptap/extension-underline";
import { getCachedBlogs, getCachedCategories, setCachedBlogs } from "@/lib/cache";

interface BlogFormProps {
  isEdit?: boolean;
}

const DEFAULT_BLOG: BlogPostType = {
  _id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  categories: [],
  tags: [],
  featuredImage: "",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
  isPublished: false,
  publishDate: new Date().toISOString().split("T")[0],
  publishTime: new Date().toTimeString().split(" ")[0].substring(0, 5),
  readTime: "",
  views: 0,
}
export function BlogForm({
  isEdit = false,
}: BlogFormProps) {

  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const [loading, setLoading] = useState(isEdit);
  const [blog, setBlog] = useState<BlogPostType>(DEFAULT_BLOG);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [form, setForm] = useState<BlogPostType>(blog);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<string>("");
  const [originalSlug, setOriginalSlug] = useState<string>("");
  const [categories, setCategories] = useState<CategoryType[]>()
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState<boolean>(false);;

  const slug = params.blogSlug as string;

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: form.content,
    onUpdate({ editor }) {
      let html = editor.getHTML();

      html = html.replace(/<h2>(.*?)<br><br>(.*?)<\/h2>/gi, (match, part1, part2) => {
        return `<p>${part1}</p><h2>${part2}</h2>`;
      });

      handleContentChange(html);
    },
  })

  useEffect(() => {
    if (editor && form.content) {
      editor.commands.setContent(form.content);
    }
  }, [editor, form.content]);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (isEdit && slug) {
        try {
          setLoading(true);

          const cachedBlogs = getCachedBlogs();

          if (cachedBlogs) {
            const found = cachedBlogs.find(c => c.slug === slug)
            if (found) {
              setBlog(found);
              setForm(found);
              setImage(found.featuredImage);
              setOriginalSlug(found.slug);
              return;
            }
          }

          const response = await fetch(`/api/blog/${slug}`);

          if (!response.ok) {
            throw new Error('Failed to fetch blog data');
          }

          const blogData = await response.json();
          setBlog(blogData);
          setForm(blogData);
          setOriginalSlug(blogData.slug);
          setImage(blogData.featuredImage || "");
        } catch (err) {
          console.error('Error fetching blog:', err);
          toast({
            title: "Error",
            description: "Failed to load blog data",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBlogData();
  }, [isEdit, slug, toast]);

  // Fetch categories data
  useEffect(() => {

    const cachedCategories = getCachedCategories();

    if (cachedCategories) {
      setCategories(cachedCategories)
      return
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [categories, slug]);

  useEffect(() => {
    if (image) {
      updateForm("featuredImage", image);
    }
  }, [image]);

  const title = isEdit ? "Edit Blog Post" : "Create New Blog Post";
  const description = isEdit
    ? "Update your blog post with the latest information"
    : "Add a new sustainable blog post to your website";
  const submitButtonText = isEdit ? "Update Post" : "Create Post";

  const updateForm = (field: keyof BlogPostType, value: any) => {
    // Clear error for this field when it's updated
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateForm(name as keyof BlogPostType, value);
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;
      setForm((prev) => ({ ...prev, title, slug: generateSlug(title) }));

      // Clear title and slug errors when title changes
      if (formErrors.title || formErrors.slug) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.title;
          delete newErrors.slug;
          return newErrors;
        });
      }
    },
    [formErrors]
  );

  const [activeTab, setActiveTab] = useState("content");

  const handleCategoriesChange = (categories: string[]) => {
    setForm(prev => ({
      ...prev,
      categories
    }));
  };

  const handleContentChange = (value: string) => {
    updateForm("content", value);
    updateForm("readTime", calculateReadTime(value));
  };

  // Calculate reading time based on content
  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return `${readTimeMinutes} min read`;
  };

  const FormErrorMessage = ({ field }: { field: string }) => {
    if (!formErrors[field]) return null;

    return (
      <p className="text-sm text-red-500 mt-1">
        {formErrors[field]}
      </p>
    );
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormErrors({});
    setError("");

    const rawData = {
      ...form,
      slug: form.slug || generateSlug(form.title),
      readTime: form.readTime || calculateReadTime(form.content || ""),
      tags: formatTags(form.tags),
    };

    const result = blogPostSchema.safeParse(rawData);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const newFormErrors: Record<string, string> = {};
      Object.entries(errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          newFormErrors[field] = messages[0];
        }
      });

      setFormErrors(newFormErrors);
      setError("Please correct the highlighted errors");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = isEdit
        ? `/api/blog/${originalSlug}`
        : '/api/blog';

      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save blog');
      }

      setCachedBlogs(null);
      const savedBlog = await response.json();

      toast({
        title: isEdit ? "Blog Updated" : "Blog Created",
        description: `Successfully ${isEdit ? 'updated' : 'created'} ${form.title}`,
      });

      router.push('/admin/blog');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = () => {
    const deleteFunction = async () => {
      try {
        const response = await fetch(`/api/blog/${originalSlug}`, {
          method: "DELETE",
        });
        setCachedBlogs(null);
        if (!response.ok) {
          throw new Error("Failed to delete blog");
        }

        toast({
          title: "Blog Post Deleted",
          description: `"${blog?.title}" has been deleted.`,
        });

      } catch (error) {
        console.error("Error deleting blog:", error);
        toast({
          title: "Error",
          description: "Failed to delete blog.",
          variant: "destructive",
        });
      } finally {
        router.push("/admin/blog");
      }
    }
    deleteFunction();
  };

  const handleAddCategory = (newCategory: CategoryType) => {
    setCategories(prev => prev ? [...prev, newCategory] : [newCategory]);

    const updatedCategories = Array.isArray(form.categories)
      ? [...form.categories, newCategory._id]
      : [newCategory._id];

    handleCategoriesChange(updatedCategories);

    toast({
      title: "Category Added",
      description: `Successfully added category: ${newCategory.name}`,
    });
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">{description}</p>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
              {error}
            </div>
          )}
        </div>
        {loading ? (
          <LoadingPage />
        ) : (
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
                    value={form.title}
                    onChange={handleTitleChange}
                    required
                    placeholder="Enter post title"
                    className="mt-1.5"
                  />
                  <FormErrorMessage field="title" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Label htmlFor="excerpt" className="text-sm font-medium flex items-center gap-2">
                    <Info className="h-4 w-4" /> Excerpt/Summary
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    rows={2}
                    value={form.excerpt}
                    onChange={(e) => updateForm("excerpt", e.target.value)}
                    required
                    placeholder="Brief summary of the post (displayed in cards and previews)"
                    className="mt-1.5"
                  />
                  <FormErrorMessage field="excerpt" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Label htmlFor="content" className="text-sm font-medium flex items-center gap-2">
                    <Type className="h-4 w-4" /> Content
                  </Label>
                  <div className="border rounded-md overflow-hidden mb-2">

                    <div className="border rounded-md overflow-hidden mb-2">
                      {/* Main formatting options */}
                      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
                        <Button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleBold().run()}
                          variant={editor?.isActive("bold") ? "default" : "outline"}
                          size="sm"
                          className="h-8"
                        >
                          <span className="font-bold">B</span>
                        </Button>
                        <Button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleItalic().run()}
                          variant={editor?.isActive("italic") ? "default" : "outline"}
                          size="sm"
                          className="h-8"
                        >
                          <span className="italic">I</span>
                        </Button>
                        <Button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleUnderline().run()}
                          variant={editor?.isActive("underline") ? "default" : "outline"}
                          size="sm"
                          className="h-8"
                        >
                          <span className="underline">U</span>
                        </Button>
                        <div className="w-px h-8 bg-gray-200 mx-1"></div>
                        <Button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                          variant={editor?.isActive("heading", { level: 2 }) ? "default" : "outline"}
                          size="sm"
                          className="h-8"
                        >
                          H2
                        </Button>
                        <Button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                          variant={editor?.isActive("heading", { level: 3 }) ? "default" : "outline"}
                          size="sm"
                          className="h-8"
                        >
                          H3
                        </Button>
                        <div className="w-px h-8 bg-gray-200 mx-1"></div>
                        <Button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleBulletList().run()}
                          variant={editor?.isActive("bulletList") ? "default" : "outline"}
                          size="sm"
                          className="h-8"
                        >
                          <List className="w-6 h-6" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                          variant={editor?.isActive("orderedList") ? "default" : "outline"}
                          size="sm"
                          className="h-8"
                        >
                          <ListOrdered className="w-6 h-6" />
                        </Button>
                        <div className="w-px h-8 bg-gray-200 mx-1"></div>
                        <Button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                          variant={editor?.isActive("blockquote") ? "default" : "outline"}
                          size="sm"
                          className="h-8"
                        >
                          <Quote className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <EditorContent
                    editor={editor}
                    className="border rounded-md min-h-[400px] p-4 prose prose-green max-w-none focus-within:ring-1 focus-within:ring-green-500 focus-within:border-green-500 blog-content"
                  />

                  <FormErrorMessage field="content" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <p>Supports markdown formatting</p>
                    <p>Estimated reading time: {calculateReadTime(form.content || '')}</p>
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
                          {form.categories && Array.isArray(form.categories) && form.categories.length > 0
                            ? `${form.categories.length} selected`
                            : "Select categories"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command className="w-full">
                          <CommandInput placeholder="Search categories..." />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup className="max-h-60 overflow-auto">
                            {categories?.map((category) => (
                              <CommandItem
                                key={category._id}
                                value={category._id}
                                onSelect={() => {
                                  const currentCategories = Array.isArray(form.categories) ? form.categories : [];
                                  const updatedCategories = currentCategories.includes(category._id)
                                    ? currentCategories.filter(c => c !== category._id)
                                    : [...currentCategories, category._id];

                                  handleCategoriesChange(updatedCategories);
                                }}
                              >
                                <Checkbox
                                  checked={Array.isArray(form.categories) && form.categories.includes(category._id)}
                                  className="mr-2 h-4 w-4"
                                />
                                {category.name}

                                {Array.isArray(form.categories) && form.categories.includes(category._id) && (
                                  <BadgeCheck className="ml-auto h-4 text-green-600 w-min" />
                                )}
                              </CommandItem>
                            ))}
                            <CommandItem
                              onSelect={() => {
                                setShowAddCategoryDialog(true);
                              }}
                              className="text-green-600 cursor-pointer"
                            >
                              <Plus className="mr-2 h-4 w-4" /> Add New Category
                            </CommandItem>

                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {form.categories && <div className="flex flex-wrap gap-2 mt-2">
                      {form.categories.map((catId, index) => {
                        const cat = categories?.find((c) => c._id === catId);
                        return (
                          <div key={index} className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs flex items-center max-w-max">
                            {cat?.name || "Unknown"}
                            <button
                              type="button"
                              className="ml-1 text-green-600 hover:text-green-800"
                              onClick={() => {
                                const updatedCategories = form.categories.filter((c) => c !== catId);
                                handleCategoriesChange(updatedCategories);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    }
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Label htmlFor="tags" className="text-sm font-medium flex items-center gap-2">
                      <Hash className="h-4 w-4" /> Tags
                    </Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags || ''}
                      onChange={(e) => {
                        const tagsValue = e.target.value;
                        updateForm("tags", tagsValue);
                      }}
                      placeholder="Enter tags, separated by commas"
                      className="mt-1.5"
                    />

                    {form.tags && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formatTags(form.tags).map((tag, index) => (
                          <div key={index} className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs h-min">
                            #{tag}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Media & Metadata Tab */}
              <TabsContent value="media" className="space-y-6 relative">
                <div className="grid grid-cols-1 gap-3 relative z-auto">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Image className="h-4 w-4" /> Cover Image
                  </Label>
                  <div className="mt-1.5">
                    <ImageUploader
                      value={form.featuredImage}
                      onChange={setImage}
                      onRemove={() => {
                        setImage("");
                        updateForm("featuredImage", "");
                      }}
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
                      value={form.slug || generateSlug(form.title)}
                      onChange={(e) => updateForm("slug", e.target.value)}
                      placeholder="post-url-slug"
                      className="mt-1.5"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        updateForm("slug", generateSlug(form.title));
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Will appear as: yourdomain.com/blog/<span className="font-medium">{form.slug || generateSlug(form.title)}</span>
                  </p>
                </div>
              </TabsContent>

              {/* SEO & Publishing Tab */}
              <TabsContent value="seo" className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" /> Publishing Options
                  </Label>

                  <div className="space-y-3 border rounded-md p-4 bg-gray-50">
                    {/* Publishing Status Selection */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Publication Status</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {/* Save as Draft Option */}
                        <div
                          className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${form.status === 'draft' ? 'bg-white border-green-500 shadow-sm' : 'bg-white hover:bg-gray-50'}`}
                          onClick={() => updateForm("status", "draft")}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${form.status === 'draft' ? 'border-green-500' : 'border-gray-300'}`}>
                            {form.status === 'draft' && <div className="w-2 h-2 rounded-full bg-green-500" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">Save as Draft</p>
                            <p className="text-xs text-gray-500">Save now and publish later</p>
                          </div>
                        </div>

                        {/* Publish Now Option */}
                        <div
                          className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${form.status === 'published' ? 'bg-white border-green-500 shadow-sm' : 'bg-white hover:bg-gray-50'}`}
                          onClick={() => updateForm("status", "published")}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${form.status === 'published' ? 'border-green-500' : 'border-gray-300'}`}>
                            {form.status === 'published' && <div className="w-2 h-2 rounded-full bg-green-500" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">Publish Immediately</p>
                            <p className="text-xs text-gray-500">Make live as soon as you save</p>
                          </div>
                        </div>

                        {/* Schedule Publication Option */}
                        <div
                          className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${form.status === 'scheduled' ? 'bg-white border-green-500 shadow-sm' : 'bg-white hover:bg-gray-50'}`}
                          onClick={() => updateForm("status", "scheduled")}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${form.status === 'scheduled' ? 'border-green-500' : 'border-gray-300'}`}>
                            {form.status === 'scheduled' && <div className="w-2 h-2 rounded-full bg-green-500" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">Schedule Publication</p>
                            <p className="text-xs text-gray-500">Automatically publish at a specified date and time</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date and Time Selector - only visible for scheduled publishing */}
                    {form.status === 'scheduled' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t">
                        <div>
                          <Label htmlFor="publishDate" className="text-sm font-medium">Publish Date</Label>
                          <Input
                            id="publishDate"
                            name="publishDate"
                            type="date"
                            value={form.publishDate}
                            onChange={handleInputChange}
                            className="mt-1.5"
                            min={new Date().toISOString().split("T")[0]} // Cannot schedule in the past
                          />
                        </div>

                        <div>
                          <Label htmlFor="publishTime" className="text-sm font-medium">Publish Time</Label>
                          <Input
                            id="publishTime"
                            name="publishTime"
                            type="time"
                            value={form.publishTime}
                            onChange={handleInputChange}
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    )}

                    {/* Status indicator */}
                    <div className="pt-2 text-sm">
                      {form.status === 'draft' && (
                        <p className="flex items-center gap-1 text-amber-600">
                          <span className="inline-block w-2 h-2 rounded-full bg-amber-600"></span>
                          Will be saved as draft
                        </p>
                      )}
                      {form.status === 'published' && (
                        <p className="flex items-center gap-1 text-green-600">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>
                          Will be published immediately
                        </p>
                      )}
                      {form.status === 'scheduled' && (
                        <p className="flex items-center gap-1 text-blue-600">
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                          Scheduled for publication on {form.publishDate} at {form.publishTime}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Read Time */}
                  <div className="grid grid-cols-1 gap-2 mt-3">
                    <Label htmlFor="readTime" className="text-sm font-medium">Read Time</Label>
                    <Input
                      id="readTime"
                      name="readTime"
                      value={form.readTime || calculateReadTime(form.content || '')}
                      onChange={handleInputChange}
                      placeholder="5 min read"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500">Auto-calculated based on content length</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Label htmlFor="metaTitle" className="text-sm font-medium flex items-center gap-2">
                    <SearchIcon className="h-4 w-4" /> SEO Meta Title
                  </Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={form.metaTitle}
                    onChange={handleInputChange}
                    placeholder="SEO title for search engines"
                    className="mt-1.5"
                  />
                  <p className="text-xs text-gray-500 flex justify-between">
                    <span>Leave blank to use post title</span>
                    <span className={`${(form.metaTitle || '').length > 60 ? 'text-red-500' : ''}`}>
                      {(form.metaTitle || '').length}/60 characters
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
                    value={form.metaDescription}
                    onChange={handleInputChange}
                    placeholder="SEO description for search engines"
                    className="mt-1.5"
                  />
                  <p className="text-xs text-gray-500 flex justify-between">
                    <span>Leave blank to use excerpt</span>
                    <span className={`${(form.metaDescription || '').length > 160 ? 'text-red-500' : ''}`}>
                      {(form.metaDescription || '').length}/160 characters
                    </span>
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-2">Search Engine Preview</h3>
                  <div className="bg-white border rounded p-3 text-sm">
                    <div className="text-blue-600 font-medium truncate">
                      {form.metaTitle || form.title || 'Post Title'}
                    </div>
                    <div className="text-green-800 text-xs truncate">
                      yourdomain.com/blog/{form.slug || generateSlug(form.title)}
                    </div>
                    <div className="text-gray-600 mt-1 text-xs line-clamp-2">
                      {form.metaDescription || form.excerpt || 'Post description will appear here...'}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>


            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between border-t pt-4 mt-8">
                <div className="text-xs">
                  {form.status !== "draft" ? (
                    <span className="text-green-600 font-medium">Will be published</span>
                  ) : (
                    <span className="text-amber-600 font-medium">Saved as draft</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4">
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/blog")}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>

                  {isEdit && (
                    <Button
                      type="button"
                      variant="destructive"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Post
                    </Button>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> {submitButtonText}
                    </>
                  )}
                </Button>
              </div>
            </div>
            {isEdit && (
              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the blog post &quot;{blog?.title}&quot;.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault();
                        handleConfirmDelete();
                      }}
                      disabled={isSubmitting}
                      className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Delete Blog Post"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </form>
        )}
      </div>

      <AddCategoryDialog
        open={showAddCategoryDialog}
        onClose={() => setShowAddCategoryDialog(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}