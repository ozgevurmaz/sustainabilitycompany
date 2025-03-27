"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormTypes } from '@/lib/types/types';
import { usePathname } from 'next/navigation';
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

        <div className="container mx-auto pb-20">
            <div className={`${isContactPage ? "max-w-2xl" : ""} mx-auto bg-white p-8 shadow-lg rounded-lg`}>
                {submitted ? (
                    <div className="text-center text-green-700 text-lg font-semibold">
                        Thank you for reaching out! We will get back to you soon.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {!isContactPage && <h2 className="text-3xl font-semibold text-green-900 mb-4 text-center">Contact Us</h2>}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor='email' className="block text-gray-700 font-semibold mb-2">Email</label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                            <Input
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor='message' className="block text-gray-700 font-semibold mb-2">Message</label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Write your message here..."
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={4}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                            Send Message
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ContactForm