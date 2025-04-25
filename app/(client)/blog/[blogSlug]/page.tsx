"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/client/navbar'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { BlogPostType, CategoryType } from '@/lib/types/types'
import { toast } from '@/hooks/use-toast'
import LoadingPage from '@/components/LoadingPage'
import BlogCard from '@/components/client/Blog/BlogCard'
import { getCachedPublishedBlogs } from '@/lib/cache'

const BlogPostView = () => {
  const params = useParams()
  const blogSlug = decodeURIComponent(params.blogSlug as string)
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryType[]>([])

  useEffect(() => {
    if (blogSlug) {
      loadBlog();
    }
  }, [])

  const loadBlog = async () => {
    if (blogSlug) {
      try {
        setLoading(true);

        const cachedPBlogs = getCachedPublishedBlogs()

        if (cachedPBlogs) {
          const found = cachedPBlogs.find(b => b.slug === blogSlug);
          if(found){
            setPost(found);
            return;
          }
        }

        const res = await fetch(`/api/blog/${blogSlug}`)
        if (!res.ok) {
          throw new Error("Failed to fecth blog post data")
        }

        const data = await res.json();
        setPost(data)

      } catch (err) {
        console.log("Error fetching blog:", err)
        toast({
          title: "Error",
          description: "Failed to load blog post data",
          variant: "destructive"
        });
      } finally {
        setLoading(false)
      }
    }
  }
  const fetchCat = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  useEffect(() => {
    fetchRelatedPosts();
    fetchCat();
  }, [post])

  const fetchRelatedPosts = async () => {

    const cats = post?.categories;
    const tags = post?.tags;

    try {
      setLoading(true);
      const res = await fetch(`/api/blog`)
      if (!res.ok) {
        throw new Error("Failed to fecth blog posts data")
      }
      const data = await res.json();
      const filtered = data.filter((d: BlogPostType) => {
        const hasCommonCategory = d.categories?.some((cat: string) => cats?.includes(cat));
        const hasCommonTag = d.tags?.some((tag: string) => tags?.includes(tag));
        return (hasCommonCategory || hasCommonTag) && d._id !== post?._id;
      });

      setRelatedPosts(filtered)
      setLoading(false)
    } catch (err) {
      console.log("Error fetching blogs:", err)
      toast({
        title: "Error",
        description: "Failed to load blog posts data",
        variant: "destructive"
      });
    }
  }

  if (loading) {
    return <LoadingPage />
  }

  const findCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category?.name;
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Post not found</h1>
          <p className="mt-4 text-gray-600">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isBg={true} />

      {/* Hero Section */}
      <div className="w-full h-[50vh] relative pt-16">
        <Image
          src={post.featuredImage || '/placeholder-image.jpg'}
          alt={post.title}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center space-x-2 mb-3">
              {post.categories && post.categories.map((category, index) => (
                <span key={index} className="bg-green-600 px-3 py-1 text-xs rounded-full">
                  {findCategoryName(category)}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center text-sm md:text-base gap-4 text-gray-200">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-10">
          {/* Blog content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} className='blog-content' />
          </div>

          {/* Tags */}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs h-min">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Related Articles */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.slice(0, 3).map((relatedPost, index) =>
            <BlogCard post={relatedPost} key={index} />
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPostView