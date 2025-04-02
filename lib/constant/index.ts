import { AlertCircle, ArrowLeft, Battery, Building, Car, Droplet, Earth, Edit2, Flower2, Globe, Leaf, Lightbulb, Recycle, Sprout, Sun, Trash2, Trees, Waves, Wind, Zap } from "lucide-react";

import { BlogPostType, BlogType, CategoryType, HeroSectionType, ServicesType, TestimonialType } from "../types/types";

export const dummyPosts: BlogType[] = [
    {
        _id: "1",
        title: "Understanding Carbon Footprint",
        excerpt: "Learn how carbon footprint affects the environment and what you can do to reduce it in your daily life. Small changes can make a big difference.",
        imageUrl: "/images/carbonfootprint.jpg",
        slug: "understanding-carbon-footprint",
        readTime: "5 min read",
        category: ["Sustainable Living"],
        date: "March 28, 2025"
    },
    {
        _id: "2",
        title: "Water Conservation Tips",
        excerpt: "Simple and effective ways to conserve water and reduce wastage in your home, garden and community.",
        imageUrl: "/images/waterfootprint.jpg",
        slug: "water-conservation-tips",
        readTime: "4 min read",
        category: ["Zero Waste"],
        date: "March 22, 2025"
    },
    {
        _id: "3",
        title: "The Future of Renewable Energy",
        excerpt: "Exploring the latest innovations in solar and wind energy and how they are reshaping our energy landscape.",
        imageUrl: "/images/sustainableenergy.jpg",
        slug: "future-of-renewable-energy",
        readTime: "6 min read",
        category: ["Renewable Energy"],
        date: "March 15, 2025"
    },
    {
        _id: "4",
        title: "Sustainable Fashion: Beyond the Trends",
        excerpt: "How sustainable fashion is changing the industry and practical tips for building an eco-friendly wardrobe.",
        imageUrl: "/images/sustainablefashion.jpg",
        slug: "sustainable-fashion-beyond-trends",
        readTime: "7 min read",
        category: ["Sustainable Living"],
        date: "March 10, 2025"
    },
    {
        _id: "5",
        title: "Corporate Sustainability Success: Green Office Initiative",
        excerpt: "Case study of how a mid-sized tech company reduced their environmental impact by 40% through simple office policies.",
        imageUrl: "/images/greenoffice.jpg",
        slug: "corporate-sustainability-success",
        readTime: "8 min read",
        category: ["Case Studies"],
        date: "March 5, 2025"
    },
    {
        _id: "6",
        title: "Community Garden Transformation",
        excerpt: "How an urban neighborhood converted vacant lots into thriving community gardens with impressive environmental benefits.",
        imageUrl: "/images/communitygarden.jpg",
        slug: "community-garden-transformation",
        readTime: "6 min read",
        category: ["Case Studies"],
        date: "February 28, 2025"
    },
    {
        _id: "7",
        title: "Zero-Waste Home Challenge Results",
        excerpt: "Real-world results from families who took our 30-day zero-waste challenge, including challenges and measurable outcomes.",
        imageUrl: "/images/zerowastehome.jpg",
        slug: "zero-waste-home-challenge-results",
        readTime: "5 min read",
        category: ["Zero Waste"],
        date: "February 20, 2025"
    },
    {
        _id: "8",
        title: "Climate Policy Changes: What You Need to Know",
        excerpt: "Summary of recent climate policy developments and how they might affect individuals and businesses.",
        imageUrl: "/images/climatepolicy.jpg",
        slug: "climate-policy-changes",
        readTime: "9 min read",
        category: ["Climate Action"],
        date: "February 15, 2025"
    },
    {
        _id: "9",
        title: "Eco-Friendly Product Reviews: Home Cleaning",
        excerpt: "Honest reviews of popular eco-friendly home cleaning products that actually work and are truly sustainable.",
        imageUrl: "/images/ecocleaners.jpg",
        slug: "eco-friendly-product-reviews-cleaning",
        readTime: "7 min read",
        category: ["Eco-Friendly Products"],
        date: "February 8, 2025"
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


export const dummyServices: ServicesType[] = [{
    id: "sustainability-audits",
    title: "Sustainability Audits",
    description: "Comprehensive evaluation of your organization's environmental impact and sustainability practices.",
    content: "Our sustainability audits provide a detailed assessment of your company's environmental footprint, resource usage, and operational practices. We identify areas for improvement and provide actionable recommendations to enhance your sustainability performance.",
    importance: "Understanding your current environmental impact is the first step toward meaningful change. Our audits establish a baseline and identify the most effective opportunities for improvement.",
    benefits: [
        "Environmental impact assessment",
        "Resource efficiency analysis",
        "Carbon footprint calculation",
        "Waste management review",
        "Detailed report with recommendations"
    ],
    imageUrl: "/images/sustainability.jpg",
    icon: Leaf,
    color: `${COLOR_OPTIONS[7].hex}`,
},
{
    id: "green-building-consultation",
    title: "Green Building Consultation",
    description: "Expert guidance on sustainable building practices, materials, and certifications.",
    content: "Our green building consultation services help you design, construct, or retrofit buildings to meet sustainability standards. We provide guidance on energy-efficient designs, sustainable materials, renewable energy integration, and certification processes like LEED or BREEAM.",
    importance: "Buildings account for approximately 40% of global energy consumption and carbon emissions. Green building practices can drastically reduce this impact while creating healthier, more efficient spaces.",
    benefits: [
        "Sustainable design assessment",
        "Energy efficiency modeling",
        "Material selection guidance",
        "Certification support (LEED, BREEAM)",
        "ROI analysis for green features"
    ],
    imageUrl: "/images/sustainablitystrategies.jpg",
    icon: Building,
    color: `${COLOR_OPTIONS[1].hex}`,
},
{
    id: "renewable-energy-implementation",
    title: "Renewable Energy Implementation",
    description: "Custom solutions for integrating renewable energy sources into your operations.",
    content: "We help businesses transition to renewable energy sources such as solar, wind, or geothermal. Our services include feasibility studies, system design, vendor selection, installation oversight, and performance monitoring to ensure optimal energy production.",
    importance: "Transitioning to renewable energy reduces carbon emissions, offers long-term cost savings, and provides resilience against energy price volatility and supply disruptions.",
    benefits: [
        "Renewable energy feasibility studies",
        "System design and specification",
        "Vendor selection assistance",
        "Installation project management",
        "Performance monitoring setup"
    ],
    imageUrl: "/images/sustainableenergy.jpg",
    icon: Sun,
    color: `${COLOR_OPTIONS[5].hex}`,
},
{
    id: "carbon-offset-programs",
    title: "Carbon Offset Programs",
    description: "Develop and implement effective carbon offset strategies to achieve carbon neutrality.",
    content: "Our carbon offset programs help organizations balance their carbon emissions through investment in environmental projects. We guide you through the process of measuring your carbon footprint, selecting appropriate offset projects, and verifying the impact of your investments.",
    importance: "Carbon offsetting allows businesses to take immediate action on their unavoidable emissions while working on long-term reduction strategies, contributing to global climate goals.",
    benefits: [
        "Carbon footprint assessment",
        "Offset strategy development",
        "Project selection guidance",
        "Verification and reporting",
        "Marketing and communication support"
    ],
    imageUrl: "/images/carbonfootprint.jpg",
    icon: Recycle,
    color: `${COLOR_OPTIONS[13].hex}`,
},
{
    id: "waste-reduction-strategies",
    title: "Waste Reduction Strategies",
    description: "Comprehensive waste audit and management plans to minimize waste and increase recycling.",
    content: "Our waste reduction services help organizations minimize waste generation and maximize recycling efforts. We conduct detailed waste audits, identify reduction opportunities, design circular economy approaches, and implement effective waste management systems.",
    importance: "Reducing waste not only minimizes environmental impact but also often leads to significant cost savings and can enhance brand reputation among increasingly eco-conscious consumers.",
    benefits: [
        "Waste audit and analysis",
        "Reduction strategy development",
        "Recycling program implementation",
        "Staff training and education",
        "Progress tracking and reporting"
    ],
    imageUrl: "/images/wastereduction.jpg",
    icon: Trash2,
    color: `${COLOR_OPTIONS[11].hex}`,
},
{
    id: "water-conservation",
    title: "Water Conservation",
    description: "Effective strategies to optimize water usage and reduce consumption across operations.",
    content: "We help businesses identify and implement water-saving opportunities throughout their operations. Our approach includes comprehensive water audits, fixture upgrades, process improvements, rainwater harvesting, and behavior change initiatives.",
    importance: "As water scarcity becomes more prevalent globally, improving water efficiency reduces environmental impact, ensures operational resilience, and often results in substantial cost savings.",
    benefits: [
        "Water usage audit",
        "Efficiency improvement plan",
        "Low-flow fixture recommendations",
        "Process water recycling solutions",
        "Employee awareness programs"
    ],
    imageUrl: "/images/waterfootprint.jpg",
    icon: Droplet,
    color: `${COLOR_OPTIONS[2].hex}`,
},
];


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

export const navItems = [
    {
        label: 'Services',
        children: [
            { label: 'Sustainability Audits', href: '/services/sustainability-audits' },
            { label: 'Green Building Consultation', href: '/services/green-building-consultation' },
            { label: 'Renewable Energy Implementation', href: '/services/renewable-energy-implementation' },
            { label: 'Carbon Offset Programs', href: '/services/carbon-offset-programs' },
            { label: 'Waste Reduction Strategies', href: '/services/waste-reduction-strategies' },
            { label: 'Water Conservation', href: '/services/water-conservation' },
        ],
    },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

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

export const dummyBlog: BlogPostType[] = [
    {
        id: 1,
        title: "10 Ways to Reduce Your Carbon Footprint",
        excerpt: "Simple changes to your daily routine that can help reduce your environmental impact.",
        content: "Full content of the article...",
        category: "Tips & Tricks",
        tags: ["carbon footprint", "sustainable living", "climate action"],
        featuredImage: "/blog/carbon-footprint.jpg",
        status: "published",
        metaTitle: "Reduce Carbon Footprint: 10 Simple Daily Changes",
        metaDescription: "Learn 10 easy ways to reduce your carbon footprint and live more sustainably with these simple lifestyle changes.",
        author: "Jane Smith",
        authorImage: "/team/jane-smith.jpg",
        publishDate: "2023-10-15",
        readTime: "5 min",
        views: 1243,
        likes: 89,
        comments: 24
    },
    {
        id: 2,
        title: "The Business Case for Sustainability",
        excerpt: "How implementing sustainable practices can benefit your company's bottom line.",
        content: "Full content of the article...",
        category: "Business",
        tags: ["sustainable business", "green economy", "CSR"],
        featuredImage: "/blog/business-sustainability.jpg",
        status: "published",
        metaTitle: "Business Sustainability: The Economic Benefits Explained",
        metaDescription: "Discover how sustainability initiatives can improve your business operations and increase profitability.",
        author: "John Davis",
        authorImage: "/team/john-davis.jpg",
        publishDate: "2023-09-28",
        readTime: "8 min",
        views: 856,
        likes: 62,
        comments: 17
    },
    {
        id: 3,
        title: "Understanding Carbon Offset Programs",
        excerpt: "A comprehensive guide to carbon offset programs and how they work.",
        content: "Full content of the article...",
        category: "Guides",
        tags: ["carbon offsets", "emissions", "climate change"],
        featuredImage: "/blog/carbon-offset.jpg",
        status: "draft",
        metaTitle: "Carbon Offset Programs Explained: A Complete Guide",
        metaDescription: "Everything you need to know about carbon offset programs, their effectiveness, and how to choose the right one.",
        author: "Jane Smith",
        authorImage: "/team/jane-smith.jpg",
        publishDate: "",
        readTime: "12 min",
        views: 0,
        likes: 0,
        comments: 0
    },
]

export const dummyCategories: CategoryType[] = [
    { id: 1, name: "Renewable Energy", postCount: 14 },
    { id: 2, name: "Zero Waste", postCount: 9 },
    { id: 3, name: "Sustainable Living", postCount: 8 },
    { id: 4, name: "Climate Action", postCount: 12 },
    { id: 5, name: "Eco-Friendly Products", postCount: 6 },
    { id: 6, name: "Case Studies", postCount: 6 },
]