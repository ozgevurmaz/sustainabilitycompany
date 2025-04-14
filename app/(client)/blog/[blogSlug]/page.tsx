"use client"

import React from 'react'
import Navbar from '@/components/client/navbar'
import { dummyBlog } from '@/lib/constant'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Eye, Heart, MessageCircle, User } from 'lucide-react'

const BlogPostView = () => {
  const params = useParams()
  const blogSlug = decodeURIComponent(params.blogSlug as string)
  const post = dummyBlog.find((b) => b.slug === blogSlug)
  
  // Filter for related posts based on categories or tags
  const relatedPosts = dummyBlog
    .filter((p) => p.slug !== blogSlug)
    .filter((p) => {
      // Find posts with matching categories or tags
      if (post?.categories) {
        return p.categories.some(cat => 
          post.categories.includes(cat)
        )
      }
      return true // Fallback if no categories
    })
    .slice(0, 3) // Limit to 3 related posts

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
                  {category}
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
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 text-sm rounded-full text-gray-700 hover:bg-gray-200 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Comments */}
          {post.comments && post.comments.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex items-center mb-6">
                <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-xl font-semibold">Comments ({post.comments.length})</h3>
              </div>
              <div className="space-y-6">
                {post.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden relative mr-3">
                        <Image 
                          src={comment.userImage || '/placeholder-user.jpg'} 
                          alt={comment.username}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{comment.username}</p>
                        <p className="text-xs text-gray-500">{comment.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
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
          {relatedPosts.map((relatedPost, index) => (
            <Link href={`/blog/${encodeURIComponent(relatedPost.slug)}`} key={index}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="h-48 relative">
                  <Image 
                    src={relatedPost.featuredImage || '/placeholder-image.jpg'} 
                    alt={relatedPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {relatedPost.categories && relatedPost.categories.slice(0, 1).map((category, catIndex) => (
                      <span key={catIndex} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{relatedPost.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{relatedPost.publishDate}</span>
                    <Clock className="h-4 w-4 ml-3 mr-1" />
                    <span>{relatedPost.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPostView