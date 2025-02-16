'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Droplet, Sun, Building } from "lucide-react";
import HeroSection from "@/components/Hero";
import { dummyPosts, services } from "@/lib/constant/pages";


export default function Home() {

  const [posts, setPosts] = useState(dummyPosts);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}

      <HeroSection index={0} />

      {/* Mission Section */}
      <section className="bg-white" >
        <div className="container mx-auto h-full py-14">
          <div className="w-full h-full py-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grap-800">Our Mission</h2>
            <p className="text-xl leading-relaxed text-gray-700">
              We help individuals and businesses reduce their environmental impact through innovative solutions and data-driven strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Latest Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post._id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" className="w-full" >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}