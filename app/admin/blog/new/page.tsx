// File: app/blog/new/page.tsx
"use client"

import { BlogForm } from '@/components/admin/Blog/BlogForm';
import { BlogPostType, CategoryType } from '@/lib/types/types';
import { useRouter } from 'next/navigation';
import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { dummyCategories } from '@/lib/constant';

export default function AddNewBlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [formData, setFormData] = useState<BlogPostType>({
    id: 0,
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
    readTime: "",
    views: 0,
    likes: 0,
    comments: 0
  });

  // Fetch categories (replace with actual API call)
  useEffect(() => {
    // Simulate API fetch with setTimeout
    const timer = setTimeout(() => {
      setCategories(dummyCategories);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      featuredImage: imageUrl
    }));
  };

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

  const handleCategoriesChange = (categories: string[]) => {
    setFormData(prev => ({
      ...prev,
      categories
    }));
  };

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would make an API call to create the blog post
      // For now, we'll simulate a successful creation
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Blog Post Created",
        description: `"${formData.title}" has been successfully created.`,
      });

      // Redirect to blog management page
      router.push('/admin/blog');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <BlogForm
      isOpen={true}
      onOpenChange={() => router.push('/admin/blog')}
      formData={formData}
      handleImageChange={handleImageChange}
      handleInputChange={handleInputChange}
      handleCheckboxChange={handleCheckboxChange}
      handleCategoriesChange={handleCategoriesChange}
      handleSubmit={handleCreateSubmit}
      categories={categories}
      isEdit={false}
      isSubmitting={isSubmitting}
    />


  );
}
