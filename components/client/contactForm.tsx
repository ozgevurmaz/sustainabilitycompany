"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormTypes } from '@/lib/types/types';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '../ui/card';
import { Briefcase, Building, Clock, HandHelping, Landmark, Leaf, Recycle, Send, Sun, University, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const ContactForm = () => {
    const pathname = usePathname();

    const [form, setForm] = useState<FormTypes>({ name: "", email: "", title: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const isContactPage = pathname === "/contact";
    return (
        < section className="py-16 bg-gray-50" >
            <div className="container mx-auto px-2">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Form Column */}
                        <div className="lg:col-span-3">
                            <Card className="border-none shadow-md overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="bg-green-600 p-6 text-white">
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">Send Us a Message</h2>
                                        <p className="opacity-90 text-md md:text-lg">Fill out the form below and we'll get back to you soon</p>
                                    </div>

                                    <div className="p-6">
                                        <form className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name *</label>
                                                    <Input
                                                        id="firstName"
                                                        placeholder="Your first name"
                                                        required
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name *</label>
                                                    <Input
                                                        id="lastName"
                                                        placeholder="Your last name"
                                                        required
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="Your email address"
                                                        required
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="Your phone number"
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="company" className="text-sm font-medium text-gray-700">Company Name</label>
                                                <Input
                                                    id="company"
                                                    placeholder="Your organization"
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="service" className="text-sm font-medium text-gray-700">Service of Interest</label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a service" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="sustainability-audits">Sustainability Audits</SelectItem>
                                                        <SelectItem value="green-building">Green Building Consultation</SelectItem>
                                                        <SelectItem value="renewable-energy">Renewable Energy Implementation</SelectItem>
                                                        <SelectItem value="carbon-offset">Carbon Offset Programs</SelectItem>
                                                        <SelectItem value="waste-reduction">Waste Reduction Strategies</SelectItem>
                                                        <SelectItem value="water-conservation">Water Conservation</SelectItem>
                                                        <SelectItem value="other">Other (Please Specify)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message *</label>
                                                <Textarea
                                                    id="message"
                                                    placeholder="Tell us about your sustainability goals or questions"
                                                    required
                                                    className="w-full p-2 border border-gray-300 rounded-md min-h-[150px]"
                                                />
                                            </div>

                                            <div className="flex items-start">
                                                <input
                                                    id="consent"
                                                    type="checkbox"
                                                    className="mt-1 mr-2"
                                                    required
                                                />
                                                <label htmlFor="consent" className="text-sm text-gray-600">
                                                    I consent to having this website store my information for future communications. See our <a href="/privacy-policy" className="text-green-600 hover:underline">privacy policy</a> to learn more.
                                                </label>
                                            </div>

                                            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md flex items-center justify-center w-full md:w-auto">
                                                <Send className="h-5 w-5 mr-2" />
                                                Send Message
                                            </Button>
                                        </form>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Information Column */}
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="border-none shadow-md">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                                        <Clock className="h-5 w-5 mr-2 text-green-600" />
                                        Hours of Operation
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex md:gap-2 flex-col md:flex-row">
                                            <span className="text-gray-600">Monday - Friday:</span>
                                            <span className="font-medium">9:00 AM - 5:00 PM</span>
                                        </div>
                                        <div className="flex md:gap-2 flex-col md:flex-row">
                                            <span className="text-gray-600">Saturday:</span>
                                            <span className="font-medium">By appointment</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-gray-600">Sunday:</span>
                                            <span className="font-medium">Closed</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md bg-green-50">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">Our Sustainability Services</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <Leaf className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                                            <span>Sustainability Audits</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Building className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                                            <span>Green Building Consultation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Sun className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                                            <span>Renewable Energy Implementation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Recycle className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                                            <span>Carbon Offset Programs</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                                        <Users className="h-5 w-5 mr-2 text-green-600" />
                                        Who We Serve
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <Briefcase className="h-4 w-4 mr-2 text-green-600" />
                                            <span>Small and Medium Businesses</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Building className="h-4 w-4 mr-2 text-green-600" />
                                            <span>Large Corporations</span>
                                        </li>
                                        <li className="flex items-center">
                                            <University className="h-4 w-4 mr-2 text-green-600" />
                                            <span>Educational Institutions</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Landmark className="h-4 w-4 mr-2 text-green-600" />
                                            <span>Government Organizations</span>
                                        </li>
                                        <li className="flex items-center">
                                            <HandHelping className="h-4 w-4 mr-2 text-green-600" />
                                            <span>Non-Profit Organizations</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ContactForm