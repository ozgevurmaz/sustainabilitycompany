'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/client/Hero";
import { useRouter } from "next/navigation";
import { BookOpen, Sparkle, WandSparkles } from "lucide-react";

export default function About() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white">
            <HeroSection index={1} />

            {/* Mission Statement Section */}
            <section className="py-16 px-4 md:px-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                            At Future Footprints, we're dedicated to creating a world where sustainability isn't just an option—it's a way of life.
                            We partner with businesses and individuals to measurably reduce environmental impact through actionable, data-driven strategies.
                        </p>
                        <div className="flex justify-center">
                            <div className="flex items-center space-x-2 text-green-700 font-medium">
                                <span className="inline-block w-6 h-0.5 bg-green-600"></span>
                                <span>Making sustainability accessible since 2020</span>
                                <span className="inline-block w-6 h-0.5 bg-green-600"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-4 md:px-16 bg-green-50 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                Future Footprints began when our founders witnessed firsthand the environmental challenges facing communities worldwide. Driven by a passion for change, we assembled a team of sustainability experts, data scientists, and environmental advocates.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                What started as a small consultancy has grown into a comprehensive sustainability partner helping organizations reduce their carbon and water footprints through innovative strategies and expert guidance.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Today, we're proud to have helped over 100 businesses and countless individuals make meaningful progress toward their sustainability goals.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src="/images/ourteam.jpg"
                                layout="fill"
                                objectFit="cover"
                                alt="Our Team"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Impact Section */}
            <section className="py-20 px-4 md:px-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Impact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 text-center">
                            <div className="text-5xl font-bold text-green-600 mb-2">25k+</div>
                            <p className="text-xl text-gray-700">Metric tons of CO₂ emissions reduced</p>
                        </div>
                        <div className="p-6 text-center">
                            <div className="text-5xl font-bold text-blue-600 mb-2">100+</div>
                            <p className="text-xl text-gray-700">Organizations partnered with</p>
                        </div>
                        <div className="p-6 text-center">
                            <div className="text-5xl font-bold text-yellow-600 mb-2">15M+</div>
                            <p className="text-xl text-gray-700">Gallons of water saved annually</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-20 px-4 md:px-16 bg-green-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                    <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
                        These principles guide everything we do, from client partnerships to community initiatives.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 shadow-lg rounded-lg bg-white border-t-4 border-green-500 transition-all hover:shadow-xl">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkle className="h-7 w-7 text-green-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
                            <p className="text-gray-700">
                                We prioritize eco-friendly solutions in everything we do, measuring our success by the positive environmental impact we create alongside our clients.
                            </p>
                        </div>
                        <div className="p-8 shadow-lg rounded-lg bg-white border-t-4 border-blue-500 transition-all hover:shadow-xl">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <WandSparkles className="h-7 w-7 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                            <p className="text-gray-700">
                                We harness cutting-edge technology and creative thinking to develop practical solutions that make sustainability achievable for organizations of all sizes.
                            </p>
                        </div>
                        <div className="p-8 shadow-lg rounded-lg bg-white border-t-4 border-yellow-500 transition-all hover:shadow-xl">
                            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="h-7 w-7 text-yellow-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Education</h3>
                            <p className="text-gray-700">
                                We empower our clients through knowledge sharing, workshops, and resources that build lasting internal capacity for sustainable decision-making.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Approach Section */}
            <section className="py-20 px-4 md:px-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Approach</h2>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-green-700 font-bold">1</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Assess</h3>
                                    <p className="text-gray-700">We begin with a comprehensive analysis of your current environmental footprint, identifying key areas for improvement.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-green-700 font-bold">2</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Plan</h3>
                                    <p className="text-gray-700">We develop a tailored sustainability roadmap with clear, achievable goals and measurable milestones.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-green-700 font-bold">3</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Implement</h3>
                                    <p className="text-gray-700">We work alongside your team to put sustainable practices into action, providing tools and training along the way.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-green-700 font-bold">4</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Measure</h3>
                                    <p className="text-gray-700">We track your progress with advanced analytics, celebrating wins and adjusting strategies as needed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 px-4 md:px-16 bg-green-50 text-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
                            <p className="text-xl italic text-gray-700 mb-4">
                                "Working with Future Footprints transformed not just our environmental impact, but our entire approach to business. Their team made sustainability accessible, practical, and impactful."
                            </p>
                            <p className="font-semibold text-gray-900">— Sarah Chen, CEO of GreenTech Solutions</p>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Us in Making a Difference</h2>
                        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                            Ready to reduce your environmental footprint? We're here to guide you every step of the way.
                            Schedule a free consultation to discover how we can help you build a more sustainable future.
                        </p>
                        <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-full shadow-lg transform transition hover:-translate-y-1" onClick={() => router.push("/contact")}>
                            Get Started Today
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}