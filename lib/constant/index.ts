import {Battery, Building, Car, Droplet, Earth, Flower2, Globe, Leaf, Lightbulb, Recycle, Sprout, Sun, Trash2, Trees, Waves, Wind, Zap } from "lucide-react";

import { BlogPostType, CategoryType, HeroSectionType, ServicesType, TestimonialType } from "../types/types";

export const dummyBlog: BlogPostType[] = [
    {
        id: 1,
        title: "Understanding Carbon Footprint",
        slug: "understanding-carbon-footprint",
        excerpt: "Learn how carbon footprint affects the environment and what you can do to reduce it in your daily life. Small changes can make a big difference.",
        content: "Full article content for 'Understanding Carbon Footprint'...",
        categories: ["Sustainable Living"],
        tags: ["carbon", "environment", "daily habits"],
        featuredImage: "/images/carbonfootprint.jpg",
        status: "published",
        isPublished: true,
        metaTitle: "Understanding Carbon Footprint",
        metaDescription: "Explore how carbon footprint impacts the environment and how to reduce it in your everyday routine.",
        publishDate: "2025-03-28",
        readTime: "5 min read",
        views: 320,
        likes: 24,
        comments: 5
    },
    {
        id: 2,
        title: "Water Conservation Tips",
        slug: "water-conservation-tips",
        excerpt: "Simple and effective ways to conserve water and reduce wastage in your home, garden and community.",
        content: "Full article content for 'Water Conservation Tips'...",
        categories: ["Zero Waste"],
        tags: ["water", "sustainability", "home hacks"],
        featuredImage: "/images/waterfootprint.jpg",
        status: "published",
        isPublished: true,
        metaTitle: "Top Water Conservation Tips",
        metaDescription: "Discover easy ways to save water in daily life and help preserve natural resources.",
        publishDate: "2025-03-22",
        readTime: "4 min read",
        views: 289,
        likes: 18,
        comments: 3
    },
    {
        id: 3,
        title: "The Future of Renewable Energy",
        slug: "future-of-renewable-energy",
        excerpt: "Exploring the latest innovations in solar and wind energy and how they are reshaping our energy landscape.",
        content: "Full article content for 'The Future of Renewable Energy'...",
        categories: ["Renewable Energy"],
        tags: ["solar", "wind", "green tech"],
        featuredImage: "/images/sustainableenergy.jpg",
        status: "published",
        isPublished: true,
        metaTitle: "Future of Renewable Energy",
        metaDescription: "Learn about innovations in renewable energy and their impact on the global energy shift.",
        publishDate: "2025-03-15",
        readTime: "6 min read",
        views: 452,
        likes: 37,
        comments: 10
    },
    {
        id: 4,
        title: "Sustainable Fashion: Beyond the Trends",
        slug: "sustainable-fashion-beyond-trends",
        excerpt: "How sustainable fashion is changing the industry and practical tips for building an eco-friendly wardrobe.",
        content: "Full article content for 'Sustainable Fashion'...",
        categories: ["Sustainable Living"],
        tags: ["fashion", "eco", "clothing"],
        featuredImage: "/images/sustainablefashion.jpg",
        status: "published",
        isPublished: true,
        metaTitle: "Sustainable Fashion Movement",
        metaDescription: "Explore how sustainable fashion is transforming the industry for the better.",
        publishDate: "2025-03-10",
        readTime: "7 min read",
        views: 399,
        likes: 29,
        comments: 7
    },
    {
        id: 5,
        title: "Corporate Sustainability Success: Green Office Initiative",
        slug: "corporate-sustainability-success",
        excerpt: "Case study of how a mid-sized tech company reduced their environmental impact by 40% through simple office policies.",
        content: "Full article content for 'Green Office Initiative'...",
        categories: ["Case Studies"],
        tags: ["business", "office", "sustainability"],
        featuredImage: "/images/greenoffice.jpg",
        status: "published",
        isPublished: true,
        metaTitle: "Corporate Green Success Story",
        metaDescription: "Case study: how one company achieved sustainability success in the office.",
        publishDate: "2025-03-05",
        readTime: "8 min read",
        views: 274,
        likes: 19,
        comments: 4
    },
    {
        id: 6,
        title: "Community Garden Transformation",
        slug: "community-garden-transformation",
        excerpt: "How an urban neighborhood converted vacant lots into thriving community gardens with impressive environmental benefits.",
        content: "Full article content for 'Community Garden Transformation'...",
        categories: ["Case Studies"],
        tags: ["urban", "gardening", "community"],
        featuredImage: "/images/communitygarden.jpg",
        status: "published",
        isPublished: true,
        metaTitle: "Community Gardening for Good",
        metaDescription: "Discover how empty urban spaces were transformed into green community gardens.",
        publishDate: "2025-02-28",
        readTime: "6 min read",
        views: 360,
        likes: 22,
        comments: 6
    },
    {
        id: 7,
        title: "Zero-Waste Home Challenge Results",
        slug: "zero-waste-home-challenge-results",
        excerpt: "Real-world results from families who took our 30-day zero-waste challenge, including challenges and measurable outcomes.",
        content: "Full article content for 'Zero-Waste Home Challenge Results'...",
        categories: ["Zero Waste"],
        tags: ["challenge", "minimalism", "waste reduction"],
        featuredImage: "/images/zerowastehome.jpg",
        status: "published",
        isPublished: true,
        metaTitle: "Zero-Waste Challenge Results",
        metaDescription: "See the real-life outcomes of zero-waste lifestyle experiments.",
        publishDate: "2025-02-20",
        readTime: "5 min read",
        views: 342,
        likes: 25,
        comments: 5
    },
    {
        id: 8,
        title: "Climate Policy Changes: What You Need to Know",
        slug: "climate-policy-changes",
        excerpt: "Summary of recent climate policy developments and how they might affect individuals and businesses.",
        content: "Full article content for 'Climate Policy Changes'...",
        categories: ["Climate Action"],
        tags: ["policy", "climate law", "environment"],
        featuredImage: "/images/climatepolicy.jpg",
        status: "published",
        isPublished: true,
        metaTitle: "New Climate Policies",
        metaDescription: "Get updated on recent changes in climate policy and regulations.",
        publishDate: "2025-02-15",
        readTime: "9 min read",
        views: 421,
        likes: 31,
        comments: 9
    },
    {
        id: 9,
        title: "Eco-Friendly Product Reviews: Home Cleaning",
        slug: "eco-friendly-product-reviews-cleaning",
        excerpt: "Honest reviews of popular eco-friendly home cleaning products that actually work and are truly sustainable.",
        content: "Full article content for 'Eco-Friendly Product Reviews'...",
        categories: ["Eco-Friendly Products"],
        tags: ["products", "home", "cleaning"],
        featuredImage: "/images/ecocleaners.jpg",
        status: "published",
        isPublished: true,
        metaTitle: "Eco Cleaning Product Reviews",
        metaDescription: "We review sustainable cleaning products you can trust.",
        publishDate: "2025-02-08",
        readTime: "7 min read",
        views: 388,
        likes: 28,
        comments: 8
    }
];


export const COLOR_OPTIONS = [
    { label: "Green", hex: "#dcfce7" },
    { label: "Light Green", hex: "#bbf7d0" },
    { label: "Blue", hex: "#dbeafe" },
    { label: "Sky Blue", hex: "#bfdbfe" },
    { label: "Yellow", hex: "#fef9c3" },
    { label: "Light Yellow", hex: "#fef08a" },
    { label: "Purple", hex: "#f3e8ff" },
    { label: "Lavender", hex: "#e9d5ff" },
    { label: "Peach", hex: "#ffedd5" },
    { label: "Coral", hex: "#fed7aa" },
    { label: "Light Red", hex: "#fee2e2" },
    { label: "Rose", hex: "#fecaca" },
    { label: "Light Gray", hex: "#f3f4f6" },
    { label: "Cool Gray", hex: "#e5e7eb" },
] as const;


export const sections: HeroSectionType[] = [
    {
        title: "Future Footprint",
        subtitle: "Building a sustainable future, one step at a time.",
        image: "/images/homepage.jpg",
    },
    {
        title: "About Future Footprint",
        subtitle: "Our mission is to create a greener, more sustainable world for future generations.",
        image: "/images/about.jpg",
    },
    {
        title: "Blog",
        subtitle: "Explore the latest insights on sustainability and green living..",
        image: "/images/blog.jpg",
    },
    {
        title: "Sustainable Solutions for a Better Tomorrow",
        subtitle: " We offer innovative environmental services designed to reduce your ecological footprint, improve sustainability performance, and create a positive impact on our planet.",
        image: "/images/services.jpg",
    },
    {
        title: "Get in Touch",
        subtitle: " Ready to start your sustainability journey? We're here to help you create a greener future for your organization.",
        image: "/images/contact.jpg",
    }
]

export const ICON_OPTIONS = [
    { name: "Leaf", component: Leaf },
    { name: "Droplet", component: Droplet },
    { name: "Sun", component: Sun },
    { name: "Building", component: Building },
    { name: "Recycle", component: Recycle },
    { name: "Trees", component: Trees },
    { name: "Globe", component: Globe },
    { name: "Wind", component: Wind },
    { name: "Waves", component: Waves },
    { name: "Energy", component: Zap },
    { name: "Battery", component: Battery },
    { name: "Flower", component: Flower2 },
    { name: "Earth", component: Earth },
    { name: "ElectricCar", component: Car },
    { name: "Lightbulb", component: Lightbulb },
    { name: "Sprout", component: Sprout },
    { name: "Trash", component: Trash2 }
] as const


export const dummyTestimonials: TestimonialType[] = [
    {
        id: 1,
        name: "Jane Smith",
        company: "GreenTech Solutions",
        position: "Sustainability Director",
        comment: "Working with your team transformed our sustainability initiatives. The energy audit saved us 30% on utility costs and helped us achieve our carbon reduction goals.",
        rating: 5,
        imageUrl: "/testimonials/jane-smith.jpg",
        featured: true,
        date: "2023-10-15"
    },
    {
        id: 2,
        name: "Michael Johnson",
        company: "Eco Builders",
        position: "CEO",
        comment: "Your waste reduction program helped us achieve zero waste certification for our construction sites. Excellent service and knowledge throughout the process.",
        rating: 4.5,
        imageUrl: "/testimonials/michael-johnson.jpg",
        featured: false,
        date: "2023-09-22"
    },
    {
        id: 3,
        name: "Sarah Williams",
        company: "Organic Foods Co-op",
        position: "Operations Manager",
        comment: "The sustainability audit provided clear, actionable steps that were easy to implement. We've seen immediate improvements in our energy usage and waste management.",
        rating: 5,
        imageUrl: "/testimonials/sarah-williams.jpg",
        featured: true,
        date: "2023-11-05"
    },
]

export const dummyCategories: CategoryType[] = [
    { id: 1, name: "Renewable Energy", postCount: 14 },
    { id: 2, name: "Zero Waste", postCount: 9 },
    { id: 3, name: "Sustainable Living", postCount: 8 },
    { id: 4, name: "Climate Action", postCount: 12 },
    { id: 5, name: "Case Studies", postCount: 6 },
    { id: 6, name: "Tips & Tricks", postCount: 1 },
]