"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ICON_OPTIONS } from "@/lib/constant";
import { ServicesType } from "@/lib/types/types";
import ContactForm from "@/components/client/contactForm";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import LoadingPage from "@/components/LoadingPage";
import { getCachedServices, setCachedServices } from "@/lib/cache";

export default function ServicePage() {
    const router = useRouter();
    const params = useParams();
    const [service, setService] = useState<ServicesType | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const slug = params.serviceSlug as string;

    useEffect(() => {
        if (slug) {
          const fetchServiceData = async () => {
            try {
              setLoading(true);
    
              const cachedServices = getCachedServices();
              if (cachedServices) {
                const found = cachedServices.find((s) => s.slug === slug);
                if (found) {
                  console.log("Loaded from cache ✅");
                  setService(found);
                  return; 
                }
              }

              const response = await fetch(`/api/services/${slug}`);
              if (!response.ok) {
                throw new Error('Failed to fetch service data');
              }
              const serviceData = await response.json();
              setService(serviceData);
    
              if (cachedServices) {
                setCachedServices([...cachedServices, serviceData]);
              } else {
                setCachedServices([serviceData]);
              }
    
            } catch (err) {
              console.error('Error fetching service:', err);
              toast({
                title: "Error",
                description: "Failed to load service data",
                variant: "destructive"
              });
            } finally {
              setLoading(false);
            }
          };
    
          fetchServiceData();
        }
      }, [slug]);
      
    if (loading) {
        return (
            <LoadingPage />
        )
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 w-screen">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center bg-white p-10 rounded-xl shadow-lg max-w-md"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                    <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or may have been moved.</p>
                    <Button
                        onClick={() => router.push("/services")}
                        className="bg-green-600 hover:bg-green-700 transition-all"
                    >
                        Return to Services
                    </Button>
                </motion.div>
            </div>
        );
    }
    const getIconByName = (name: string) => {
        return ICON_OPTIONS.find((icon) => icon.name === name)?.component || ICON_OPTIONS[0];
    };

    const ServiceIcon = getIconByName(service.icon);

    return (
        <div className="min-h-screen pb-16 m-0 w-full ">

            <div className="absolute inset-0 z-0 h-[60vh]">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    quality={90}
                />
            </div>
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-[60vh]"
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full px-0">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-center mb-2 md:mb-4"
                            >
                                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg p-4" style={{ backgroundColor: service.color }}>
                                    <ServiceIcon className="w-10 h-10 text-gray-600" />
                                </div>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight"
                            >
                                {service.title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed"
                            >
                                {service.description}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8"
                            >
                                <Button
                                    onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                                    className="hover:opacity-90 text-gray-600 px-8 py-6 text-lg rounded-full transition-all"
                                    style={{ backgroundColor: service.color }}
                                >
                                    Get Started Now
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>


            </motion.div>

            {/* Content Sections */}
            <div className="container mx-auto px-4 pt-12 relative">
                {/* Intro text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Transform Your Business with Our {service.title}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Our dedicated team of experts works closely with you to deliver customized solutions that align
                        perfectly with your sustainability goals.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid md:grid-cols-2 gap-8 mb-16"
                >
                    {/* Importance Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
                        <div className="flex items-start mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: service.color }}>
                                <ExternalLink className="w-6 h-6 text-gray-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Why This Is Important
                            </h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {service.importance}
                        </p>
                    </div>

                    {/* Benefits Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Key Benefits
                        </h2>
                        <div className="space-y-4">
                            {service.benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * (index + 1) }}
                                    className="flex items-start space-x-3 group"
                                >
                                    <div className="rounded-full p-1.5 group-hover:scale-110 transition-all" style={{ backgroundColor: service.color }}>
                                        <Check className="w-4 h-4 text-gary-600" />
                                    </div>
                                    <p className="text-gray-700 text-lg">{benefit}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Service Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        What This Service Includes
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto">
                        {service.content}
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    id="contact-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Ready to Get Started?</h2>
                    <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                        Fill out the form below and our team will get back to you within 24 hours to discuss how our {service.title} can benefit your organization.
                    </p>
                    <ContactForm />
                </motion.div>

                {/* Back Button */}

                <Button
                    onClick={() => router.push("/services")}
                    className=" absolute z-40 left-4 top-4 md:left-8 md:top-8 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 inline-flex items-center space-x-2 shadow-lg rounded-full px-4 py-2 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                </Button>

            </div>
        </div>
    );
}