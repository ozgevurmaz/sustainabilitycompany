import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BlogType } from '@/lib/types/types'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const BlogCard = ({ post }: { post: BlogType }) => {
    return (
        <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                    src={post.imageUrl}
                    fill
                    style={{ objectFit: 'cover' }}
                    alt={post.title}
                    className="transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 m-3 rounded">
                    {post.category || 'Sustainability'}
                </div>
            </div>
            <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{post.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date || 'Apr 2, 2025'}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" className="w-full">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default BlogCard