'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/client/Hero";
import { useRouter } from "next/navigation";

export default function About() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white">

            <HeroSection index={1} />

            {/* Our Story Section */}
            <section className="py-20 bg-green-100 relative">
                <div className="absolute inset-0">
                    <Image
                        src="/images/sustain.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Our Story Background"
                        className="opacity-20"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Future Footprint was founded with a vision to help businesses and individuals reduce their carbon and water footprints.
                            Through innovative strategies and expert guidance, we empower people to take meaningful steps towards sustainability.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 shadow-lg rounded-lg bg-green-50">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
                            <p className="text-gray-700">We prioritize eco-friendly solutions to reduce environmental impact.</p>
                        </div>
                        <div className="p-6 shadow-lg rounded-lg bg-blue-50">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                            <p className="text-gray-700">We leverage technology and creativity to drive sustainable change.</p>
                        </div>
                        <div className="p-6 shadow-lg rounded-lg bg-yellow-50">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Education</h3>
                            <p className="text-gray-700">We believe in spreading awareness and knowledge for a greener future.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-green-100 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Us in Making a Difference</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Take the first step towards a sustainable future. Contact us today to learn how you can contribute.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-full" onClick={() => router.push("/contact")}>
                        Get Involved
                    </Button>
                </div>
            </section>

        </div>
    );
}
