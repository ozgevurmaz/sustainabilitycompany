"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { dummyServices } from "@/lib/constant";
import { ServicesType } from "@/lib/types/types";
import ContactForm from "@/components/client/contactForm";
import { ArrowLeft, Check } from "lucide-react";

export default function ServicePage() {
    const router = useRouter();
    const params = useParams();
    const [service, setService] = useState<ServicesType | null>(null);

    useEffect(() => {
        if (params?.serviceId) {
            const foundService = dummyServices.find((s) => s.id === params.serviceId);
            setService(foundService || null);
        }
    }, [params?.serviceId]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                    <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
                    <Button
                        onClick={() => router.push("/services")}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Return to Services
                    </Button>
                </div>
            </div>
        );
    }

    const ServiceIcon = service.icon;

    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* Hero Section */}
            <div
                className="relative h-[50vh] flex items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${service.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="bg-greenCover/50 w-full h-full flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="container mx-auto px-4 text-center"
                    >
                        <div className="flex justify-center mb-2 md:mb-4">
                            <div style={{ backgroundColor: service.color }} className="w-14 h-14 rounded-lg flex items-center justify-center">
                                <ServiceIcon className="w-10 h-10 text-gray-700" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 md:mb-4">
                            {service.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                            {service.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            { /* Content Sections */}
            <div className="container mx-auto px-4 pt-12 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {/* Importance Section */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-green-900 mb-4 flex items-center">
                            Why This Is Important
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {service.importance}
                        </p>
                    </div>

                    {/* Benefits Section */}
                    <div className={`${service.color} rounded-xl p-8 text-white`}>
                        <h2 className="text-2xl font-semibold  mb-4">
                            Key Benefits
                        </h2>
                        <div className="space-y-4">
                            {service.benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="flex items-start space-x-3"
                                >
                                    <Check className="w-5 h-5  mt-1 flex-shrink-0" />
                                    <p className="text-white">{benefit}</p>
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
                    className="mt-12 bg-white rounded-xl shadow-lg p-8"
                >
                    <h2 className="text-2xl font-semibold text-green-900 mb-4">
                        What This Service Includes
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {service.content}
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <ContactForm />
                </motion.div>

                {/* Back Button */}
                <div className="absolute text-center top-4 right-4">
                    <Button
                        onClick={() => router.push("/services")}
                        className="bg-gray-900 hover:bg-green-700 inline-flex items-center space-x-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Services</span>
                    </Button>
                </div>
            </div>
        </div >
    );
}