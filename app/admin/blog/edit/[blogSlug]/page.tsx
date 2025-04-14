"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { BlogPostType, CategoryType } from "@/lib/types/types";
import { BlogForm } from "@/components/admin/Blog/BlogForm";
import { dummyBlog, dummyCategories } from "@/lib/constant";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const blogSlug = decodeURIComponent(params.blogSlug as string);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BlogPostType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    // Simulate fetching the blog post based on title
    const post = dummyBlog.find((b) => b.slug === blogSlug);
    if (post) {
      setFormData(post);
    } else {
      toast({
        title: "Not Found",
        description: `No blog post found with title "${blogSlug}"`,
        variant: "destructive",
      });
      router.push("/admin/blog");
    }
    setCategories(dummyCategories);
    setIsLoading(false);
  }, [blogSlug]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => prev && ({ ...prev, [name]: value }));
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => prev && ({ ...prev, featuredImage: imageUrl }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (!formData) return;

    const updated = { ...formData, [name]: checked };
    if (name === "isPublished") {
      updated.status = checked ? "published" : "draft";
      updated.publishDate = checked ? new Date().toISOString().split("T")[0] : "";
    }

    setFormData(updated);
  };

  const handleCategoriesChange = (categories: string[]) => {
    setFormData((prev) => prev && ({ ...prev, categories }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API update
      await new Promise((res) => setTimeout(res, 1000));
      toast({
        title: "Blog Updated",
        description: `"${formData?.title}" was updated successfully.`,
      });
      router.push("/admin/blog");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Edit Blog Post</h1>
          <p className="text-gray-500">Editing: {formData.title}</p>
        </div>

        <BlogForm
          isOpen={true}
          onOpenChange={() => router.push("/admin/blog")}
          formData={formData}
          handleImageChange={handleImageChange}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleCategoriesChange={handleCategoriesChange}
          handleSubmit={handleEditSubmit}
          categories={categories}
          isEdit={true}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
