'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Clock, Calendar, Search, Tag } from "lucide-react";
import HeroSection from "@/components/client/Hero";
import { dummyBlog, dummyCategories } from "@/lib/constant";
import BlogCard from "@/components/client/Blog/BlogCard";

export default function Blog() {
    const [posts, setPosts] = useState(dummyBlog);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [featuredPost, ...regularPosts] = posts;

    // Handle filtering by both search query and category
    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || post.categories.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <HeroSection index={2} />

            {/* Search and Filter Section */}
            <div className="mx-auto px-4 py-8 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-1/2">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search sustainable ideas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                            {dummyCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-3 py-1 text-sm rounded-full transition-all ${selectedCategory === category.name
                                        ? "bg-green-600 text-white"
                                        : "bg-white text-gray-700 hover:bg-green-100"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Post Section */}
            {!searchQuery && selectedCategory === "All" && (
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2 className="text-2xl font-bold mb-8 border-l-4 border-green-500 pl-3">Featured Article</h2>
                        <Card className="border-none overflow-hidden shadow-xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative h-64 lg:h-full min-h-[320px]">
                                    <Image
                                        src={featuredPost.featuredImage}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        alt={featuredPost.title}
                                        className="brightness-90 hover:brightness-100 transition-all duration-300"
                                    />
                                </div>
                                <CardContent className="p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="mb-4">
                                            <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                                                {featuredPost.categories || "Sustainable Living"}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                                        <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span className="mr-4">{featuredPost.readTime}</span>
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span>{featuredPost.publishDate || "April 2, 2025"}</span>
                                        </div>
                                        <Link href={`/blog/${featuredPost.slug}`}>
                                            <Button className="bg-green-600 hover:bg-green-700">
                                                Read Full Article
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Blog Posts Grid Section */}
            <section className="py-12 bg-green-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3">
                            {searchQuery ? "Search Results" : "Latest Articles"}
                        </h2>
                        <p className="text-gray-500">
                            {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
                        </p>
                    </div>

                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <BlogCard post={post} key={post.id} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
                            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Stay Updated on Sustainability</h2>
                        <p className="text-gray-600 mb-6 max-w-xl mx-auto">Join our newsletter for the latest tips, trends, and insights on sustainable living and environmental conservation.</p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}