'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/client/Hero";
import { dummyPosts } from "@/lib/constant";

export default function Blog() {
    const [posts, setPosts] = useState(dummyPosts);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            <HeroSection index={2} />

            {/* Search Bar */}
            <div className="mx-auto px-4 py-6 text-center bg-green-100 w-full">
                <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Blog Posts Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <Card key={post._id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-56 overflow-hidden rounded-t-lg">
                                        <Image
                                            src={post.image}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            alt={post.title}
                                            className="transform hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 mb-2">
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                                        <p className="text-gray-700 mb-4">{post.excerpt}</p>
                                        <Link href={`/blog/${post.slug}`}>
                                            <Button variant="outline" className="w-full">
                                                Read More
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No posts found.</p>
                        )}
                    </div>
                </div>
            </section>


        </div>
    );
}
