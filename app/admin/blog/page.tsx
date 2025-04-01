"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  MoreVertical,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Calendar,
  Tag,
  Clock,
  FileText,
  Search,
  Filter,
  Loader2,
  BarChart3,
  Hash,
  Tags,
  Calendar as CalendarIcon,
} from "lucide-react";
import { BlogFormDataType, BlogPostType, CategoryType } from "@/lib/types/types";
import { dummyBlog, dummyCategories } from "@/lib/constant";
import SecondHeader from "@/components/admin/SecondHeader";
import { BlogDialog } from "@/components/admin/Blog/BlogDialog";
import { DeleteBlogDialog } from "@/components/admin/Blog/DeleteBlogDialog";
import CustomCard from "../../../components/admin/CustomCard";

export default function BlogManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<BlogPostType | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const [formData, setFormData] = useState<BlogFormDataType>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featuredImage: "",
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    isPublished: false,
    publishDate: new Date().toISOString().split("T")[0],
  });

  // Redirect if not logged in as admin
  useEffect(() => {
    if (status !== "loading" && (!session || session.user?.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  // Mock fetch blog posts data (replace with actual API call)
  useEffect(() => {
    if (status !== "loading" && session?.user?.role === "admin") {
      // Simulate API fetch with setTimeout
      const timer = setTimeout(() => {
        setBlogPosts(dummyBlog);

        setCategories(dummyCategories);

        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [status, session]);

  // Filter and search posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory ? post.category === filterCategory : true;
    const matchesStatus = filterStatus ? post.status === filterStatus : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));

    // If publishing, set today's date
    if (name === "isPublished" && checked) {
      setFormData(prev => ({
        ...prev,
        publishDate: new Date().toISOString().split("T")[0],
        status: "published"
      }));
    } else if (name === "isPublished" && !checked) {
      setFormData(prev => ({
        ...prev,
        status: "draft"
      }));
    }
  };

  // Initialize create post dialog
  const handleCreateClick = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      featuredImage: "",
      status: "draft",
      metaTitle: "",
      metaDescription: "",
      isPublished: false,
      publishDate: new Date().toISOString().split("T")[0],
    });
    setEditorContent("");
    setIsCreateDialogOpen(true);
  };

  // Initialize edit post dialog
  const handleEditClick = (post: BlogPostType) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(", "),
      featuredImage: post.featuredImage,
      status: post.status,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      isPublished: post.status === "published",
      publishDate: post.publishDate || new Date().toISOString().split("T")[0],
    });
    setEditorContent(post.content);
    setIsEditDialogOpen(true);
  };

  // Initialize delete post dialog
  const handleDeleteClick = (post: BlogPostType) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  // Preview post
  const handlePreviewClick = (post: BlogPostType) => {
    window.open(`/blog/${post.id}`, '_blank');
  };

  // Submit new post
  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // API call
    setTimeout(() => {
      const newPost: BlogPostType = {
        id: blogPosts.length + 1,
        ...formData,
        content: editorContent || formData.content,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
        author: session?.user?.name || "Admin",
        authorImage: session?.user?.image || "/team/default.jpg",
        readTime: "5 min",
        views: 0,
        likes: 0,
        comments: 0
      };

      setBlogPosts(prev => [...prev, newPost]);
      setIsCreateDialogOpen(false);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: "",
        featuredImage: "",
        status: "draft",
        metaTitle: "",
        metaDescription: "",
        isPublished: false,
        publishDate: new Date().toISOString().split("T")[0],
      });
      setEditorContent("");
      setIsLoading(false);

      toast({
        title: "Blog Post Created",
        description: `"${newPost.title}" has been successfully created.`,
      });
    }, 500);
  };

  // Submit edit post
  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentPost) return;

    setIsLoading(true);

    // API call
    setTimeout(() => {
      setBlogPosts(prev =>
        prev.map(post =>
          post.id === currentPost.id ? {
            ...post,
            ...formData,
            content: editorContent || formData.content,
            tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
          } : post
        )
      );
      setIsEditDialogOpen(false);
      setCurrentPost(null);
      setEditorContent("");
      setIsLoading(false);

      toast({
        title: "Blog Post Updated",
        description: `"${formData.title}" has been successfully updated.`,
      });
    }, 500);
  };

  // Submit delete post
  const handleDeleteSubmit = () => {
    if (!currentPost) return;

    setIsLoading(true);

    // API call
    setTimeout(() => {
      setBlogPosts(prev =>
        prev.filter(post => post.id !== currentPost.id)
      );
      setIsDeleteDialogOpen(false);
      setCurrentPost(null);
      setIsLoading(false);

      toast({
        title: "Blog Post Deleted",
        description: `"${currentPost.title}" has been deleted.`,
      });
    }, 500);
  };

  // Publish/unpublish post
  const togglePublishStatus = (post: BlogPostType) => {
    setBlogPosts(prev =>
      prev.map(item => {
        if (item.id === post.id) {
          const newStatus = item.status === "published" ? "draft" : "published";
          return {
            ...item,
            status: newStatus,
            publishDate: newStatus === "published" ? new Date().toISOString().split("T")[0] : ""
          };
        }
        return item;
      })
    );

    const action = post.status === "published" ? "unpublished" : "published";
    toast({
      title: `Blog Post ${action}`,
      description: `"${post.title}" has been ${action}.`,
    });
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SecondHeader pageTitle="Blog Posts" dialogOpen={handleCreateClick} />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <CustomCard title="Total Posts" middleValue={String(blogPosts.length)} desc="All blog posts" />
          <CustomCard title="Published" middleValue={String(blogPosts.filter(post => post.status === "published").length)} desc="Live on your site" />
          <CustomCard title="Drafts" middleValue={String(blogPosts.filter(post => post.status === "draft").length)} desc="Not yet published" />
          <CustomCard title="Categories" middleValue={String(categories.length)} desc="Content categories" />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search posts..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={(val) => {
              setFilterCategory(val === "all" ? "" : val);
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Blog Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Blog Posts</CardTitle>
            <CardDescription>
              Manage your blog content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No blog posts found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-start space-x-3">
                          {post.featuredImage && (
                            <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <FileText className="h-6 w-6" />
                              </div>
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{post.title}</div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">{post.excerpt}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {post.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                          }`}>
                          {post.status === "published" ? "Published" : "Draft"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {post.publishDate ? (
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            {post.publishDate}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditClick(post)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            {post.status === "published" && (
                              <DropdownMenuItem onClick={() => handlePreviewClick(post)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => togglePublishStatus(post)}>
                              {post.status === "published" ? (
                                <>
                                  <Clock className="mr-2 h-4 w-4" />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Publish
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteClick(post)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Category Overview */}
        <h2 className="text-xl font-semibold mt-10 mb-4">Categories Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Hash className="mr-2 h-5 w-5 text-blue-500" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{category.postCount}</span>
                  <span className="text-sm text-gray-500">posts</span>
                </div>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{
                        width: category.postCount > 0 ? `${Math.min(Math.max((category.postCount / Math.max(...categories.map(c => c.postCount), 1)) * 100, 5), 100)}%` : '0%'
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Add Blog Post */}
      <BlogDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={handleCreateSubmit}
        categories={categories}
        isEdit={false}
      />

      {/* Edit Blog Post */}
      <BlogDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={handleEditSubmit}
        categories={categories}
        isEdit={true}
      />

      {/* Delete Blog Post */}
      <DeleteBlogDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        post={currentPost}
        onDelete={handleDeleteSubmit}
        isDeleting={isLoading}
      />
    </div>
  );
}