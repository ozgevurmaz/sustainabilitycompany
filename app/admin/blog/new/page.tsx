"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploader from "@/components/admin/ImageUploader";

export default function NewBlog() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    coverImage: []
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleImageUpload = (url: string) => {
    setForm((prev) => ({ ...prev, coverImage: [...prev.coverImage, url] }));
  };

  const handleImageRemove = (url: string) => {
    setForm((prev) => ({
      ...prev,
      coverImage: prev.coverImage.filter((img) => img !== url)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (form.coverImage.length === 0) {
      setError("Please upload a cover image.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/blog");
      } else {
        setError("Error creating blog post. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-900"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Create New Blog</h2>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Cover Image
              </label>
              <ImageUploader
                value={form.coverImage}
                onChange={handleImageUpload}
                onRemove={handleImageRemove}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Blog Title
              </label>
              <Input
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter your blog title"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Content
              </label>
              <Textarea
                name="content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write your blog content here..."
                className="min-h-[200px]"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Publish Blog"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}