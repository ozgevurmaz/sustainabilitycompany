'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from "@/components/client/Hero";
import ServicesSection from "@/components/client/servicesSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Leaf, Recycle, Droplet, Sun, Wind, TreePine, Trash2 } from "lucide-react";
import BlogCard from '@/components/client/Blog/BlogCard';
import Link from 'next/link';
import { BlogPostType } from '@/lib/types/types';
import { toast } from '@/hooks/use-toast';
import { getCachedPublishedBlogs } from '@/lib/cache';
import { fetchBlogs } from '@/lib/actions';

export default function Services() {
  const [posts, setPosts] = useState<BlogPostType[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const CASE_STUDY_ID = "68079fc8d37750ef1b01dc94";
  useEffect(() => {
    loadBlogs();
  }, [])

  const loadBlogs = async () => {

    try {
      setLoading(true);

      const cachedPBlogs = getCachedPublishedBlogs();
      if (cachedPBlogs) {
        const filtered = cachedPBlogs.filter((d: BlogPostType) =>
          d.categories.includes(CASE_STUDY_ID)
        );
        setPosts(filtered);
        return;
      }

      const data = await fetchBlogs();
      
      const filtered = data.filter((d: BlogPostType) =>
        d.categories.includes(CASE_STUDY_ID)
      );

      setPosts(filtered);
    } catch (err) {
      console.log("Error fetching blog:", err);
      toast({
        title: "Error",
        description: "Failed to load blog post data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection index={3} />

      {/* Sustainability Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: "450+", label: "Projects Completed", icon: Leaf },
              { value: "28K", label: "Tons of CO₂ Offset", icon: Recycle },
              { value: "65M", label: "Gallons of Water Saved", icon: Droplet },
              { value: "120+", label: "Corporate Partners", icon: TreePine }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Filter Tabs */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-white p-1 rounded-lg mb-8">
              <TabsTrigger
                key="all"
                value="all"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-md py-1 flex items-center justify-center"
              >
                <Leaf className="h-4 w-4 mr-2" />
                All Solutions
              </TabsTrigger>
              <TabsTrigger
                key="energy"
                value="energy"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-md py-2 flex items-center justify-center"
              >
                <Sun className="h-4 w-4 mr-2" />
                Energy
              </TabsTrigger>
              <TabsTrigger
                key="waste"
                value="waste"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-md py-2 flex items-center justify-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Waste
              </TabsTrigger>
              <TabsTrigger
                key="water"
                value="water"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-md py-2 flex items-center justify-center"
              >
                <Droplet className="h-4 w-4 mr-2" />
                Water
              </TabsTrigger>
              <TabsTrigger
                key="carbon"
                value="carbon"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-md py-2 flex items-center justify-center"
              >
                <Recycle className="h-4 w-4 mr-2" />
                Carbon
              </TabsTrigger>
            </TabsList>

            {/* All Solutions Tab */}
            <TabsContent value="all">
              <ServicesSection
                title="Our Sustainability Solutions"
                subtitle="Comprehensive services to improve your organization's environmental performance"
              />
            </TabsContent>

            {/* Energy Tab */}
            <TabsContent value="energy">
              <ServicesSection
                filter="energy"
                title="Energy Solutions"
                subtitle="Optimize energy usage and transition to renewable sources"
              />
            </TabsContent>

            {/* Waste Tab */}
            <TabsContent value="waste">
              <ServicesSection
                filter="waste"
                title="Waste & Water Management"
                subtitle="Reduce consumption and minimize environmental impact"
              />
            </TabsContent>

            {/* Water Tab */}
            <TabsContent value="water">
              <ServicesSection
                filter="water"
                title="Waste & Water Management"
                subtitle="Reduce consumption and minimize environmental impact"
              />
            </TabsContent>

            {/* Carbon Management Tab */}
            <TabsContent value="carbon">
              <ServicesSection
                filter="carbon"
                title="Carbon Management"
                subtitle="Measure, reduce and offset your carbon footprint"
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Sustainable Approach Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Sustainable Approach
            </h2>
            <p className="text-lg text-gray-600">
              We follow a holistic methodology that addresses environmental challenges at their roots
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Assessment",
                description: "We conduct comprehensive environmental assessments to identify opportunities for improvement.",
                icon: <Leaf className="h-8 w-8 text-white" />
              },
              {
                step: "02",
                title: "Planning",
                description: "Our experts develop tailored sustainability strategies aligned with science-based targets.",
                icon: <Recycle className="h-8 w-8 text-white" />
              },
              {
                step: "03",
                title: "Implementation",
                description: "We execute solutions that balance ecological impact with practical business needs.",
                icon: <TreePine className="h-8 w-8 text-white" />
              },
              {
                step: "04",
                title: "Measurement",
                description: "We track and report progress using verifiable metrics and transparent methodologies.",
                icon: <Wind className="h-8 w-8 text-white" />
              }
            ].map((process, index) => (
              <Card key={index} className="border-none shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-green-600 py-3 px-6 text-white font-bold flex items-center justify-between">
                    <span>{process.step}</span>
                    {process.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{process.title}</h3>
                    <p className="text-gray-600">{process.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Certifications & Partnerships
              </h2>
              <p className="text-lg text-gray-600">
                We work with leading sustainability organizations to ensure our methods meet the highest standards
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="bg-gray-100 h-24 w-full rounded-lg flex items-center justify-center p-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              See how our sustainable solutions have made a measurable impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts && posts
              .map((post) => (
                <BlogCard post={post} key={post._id} />
              ))
            }
          </div>

          <div className="mt-12 text-center flex justify-center">
            <Link
              href="/blog"
              className="border bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-lg flex items-center w-fit"
            >
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Get answers to common questions about our sustainability services
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "How do you measure sustainability impact?",
                  answer: "We use internationally recognized methodologies and standards to measure environmental impact, including GHG Protocol for carbon emissions, water footprint assessments following ISO 14046, and lifecycle assessments adhering to ISO 14040/14044. All metrics are independently verified for accuracy and transparency."
                },
                {
                  question: "What is your approach to carbon offsetting?",
                  answer: "We believe in first reducing emissions at the source through operational improvements and efficiency. For unavoidable emissions, we work with Gold Standard and Verified Carbon Standard (VCS) certified offset projects that deliver real, measurable benefits both environmentally and socially."
                },
                {
                  question: "How do your services help with regulatory compliance?",
                  answer: "Our team stays current with evolving environmental regulations across regions. We help organizations implement systems that not only meet current compliance requirements but prepare for future regulatory changes. Our documentation and reporting processes are designed to satisfy regulatory bodies and stakeholders."
                },
                {
                  question: "Can you help with sustainability reporting and disclosure?",
                  answer: "Yes, we provide comprehensive support for sustainability reporting frameworks including GRI, SASB, TCFD, and CDP. Our expertise includes data collection, analysis, preparation of disclosure documents, and strategic guidance on improving sustainability performance metrics over time."
                }
              ].map((faq, index) => (
                <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 bg-white p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Have specific sustainability questions?</h3>
              <p className="text-gray-600 mb-6">Our environmental experts are ready to help you navigate your sustainability journey.</p>
              <Link href="mailto:info@futurefootprint.com" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center mx-auto w-fit">
                <Leaf className="mr-2 h-5 w-5" />
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start your sustainability journey today</h2>
              <p className="text-lg opacity-90 mb-6">
                Schedule a consultation with our environmental experts to discover how we can help reduce your ecological footprint.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Science-based solutions",
                  "Measurable environmental impact",
                  "Compliance with global standards"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-5 w-5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium w-fit">
                Request a Sustainability Assessment
              </Link>
            </div>
            <div className="md:w-1/3 bg-white p-6 rounded-lg text-green-700">
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <p className="mb-2">
                <strong>Email:</strong> info@futurefootprint.com
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> (555) 555-5555
              </p>
              <p className="mb-6">
                <strong>Hours:</strong> Mon-Fri, 9am-5pm
              </p>
              <p className="text-sm text-gray-600">
                We're committed to carbon-neutral operations. Our consultations can be conducted virtually to reduce travel emissions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}