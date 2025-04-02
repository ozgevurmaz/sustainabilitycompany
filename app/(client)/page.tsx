'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Droplet, Sun, Building, TrendingUp, Award } from "lucide-react";
import HeroSection from "@/components/client/Hero";
import { dummyPosts, dummyServices } from "@/lib/constant";
import ServicesSection from "@/components/client/servicesSection";
import Testimonial from "@/components/client/testimonial";
import InformationCards from "@/components/client/Home/InformationCards";
import BlogCard from "@/components/client/Blog/BlogCard";
import { BlogType } from "@/lib/types/types";

export default function Home() {
  const [posts, setPosts] = useState<BlogType[]>(dummyPosts);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection index={0} />

      {/* Mission Section */} 
      <section className="bg-white py-16">
        <div className="container mx-auto px-12 xxl:px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-xl leading-relaxed text-gray-700 mb-6">
                We help individuals and businesses reduce their environmental impact through innovative solutions and data-driven strategies that create measurable results.
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-3">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Sustainable Solutions</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-3">
                    <Droplet className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Water Conservation</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mr-3">
                    <Sun className="h-6 w-6 text-yellow-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Renewable Energy</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/images/ourmission.jpg"
                  fill
                  style={{ objectFit: 'cover' }}
                  alt="Our Mission"
                  className="rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Impact since 2020</p>
                    <p className="text-xl font-bold text-gray-900">25k+ CO₂ Tons Reduced</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Future Footprints</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We combine expertise, innovation, and passion to deliver sustainable solutions that make a real difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InformationCards icon={Award} title="Expert Team" desc="Our team brings together decades of experience in environmental science, data analytics, and sustainable business practices." className="text-green-600 bg-green-100 rounded-full" />
            <InformationCards icon={Building} title="Tailored Approach" desc="We create customized sustainability strategies that align with your specific goals, industry, and organizational culture." className="text-blue-600 bg-blue-100 rounded-full" />
            <InformationCards icon={TrendingUp} title="Measurable Results" desc=" We focus on delivering quantifiable outcomes with comprehensive reporting to track your sustainability progress." className="text-yellow-600 bg-yellow-100 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection services={dummyServices} />

      {/* Testimonial */}
      <Testimonial />

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to reduce your environmental footprint?</h2>
              <p className="text-xl opacity-90">
                Take the first step towards a more sustainable future. Our team is ready to help you create meaningful change.
              </p>
            </div>
            <div>
              <Link href="/contact">
                <Button className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-green-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Latest Insights</h2>
              <p className="text-lg text-gray-700">Stay informed with our latest articles and research</p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="hidden md:flex">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <BlogCard post={post} key={post._id}/>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link href="/blog">
              <Button variant="outline">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}