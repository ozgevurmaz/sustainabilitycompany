"use client"

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Battery, Building, Car, Droplet, Earth, Edit2, Flower2, Globe, Leaf, Lightbulb, Recycle, Sprout, Sun, Trash2, Trees, Waves, Wind, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUploader from "@/components/admin/ImageUploader";
import { ServicesType } from "@/lib/types/types";
import { COLOR_OPTIONS, ICON_OPTIONS } from "@/lib/constant";



const DEFAULT_FORM_STATE: ServicesType = {
    id: "",
    title: "",
    description: "",
    content: "",
    importance: "",
    benefits: [],
    imageUrl: "",
    icon: null,
    color: "",
};

export default function NewService() {
    const [form, setForm] = useState<ServicesType>(DEFAULT_FORM_STATE);
    const [newBenefit, setNewBenefit] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const generateSlug = useCallback((title: string) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        []);

    const updateForm = (field: keyof ServicesType, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setForm(prev => ({ ...prev, title, id: generateSlug(title) }));
    }, [generateSlug]);

    const handleBenefitAdd = useCallback((benefit: string) => {
        if (benefit.trim()) {
            setForm(prev => ({
                ...prev,
                benefits: [...prev.benefits, benefit.trim()]
            }));
            setNewBenefit("");
        }
    }, []);

    const handleBenefitKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleBenefitAdd(newBenefit);
        }
    }, [newBenefit, handleBenefitAdd]);

    const handleBenefitEdit = useCallback((index: number, newValue: string) => {
        setForm(prev => ({
            ...prev,
            benefits: prev.benefits.map((benefit, i) =>
                i === index ? newValue : benefit
            )
        }));
    }, []);

    const handleBenefitRemove = useCallback((index: number) => {
        setForm(prev => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index)
        }));
    }, []);

    const validateForm = useCallback(() => {
        if (!form.imageUrl) {
            setError("Please upload a cover image");
            return false;
        }
        if (!form.title.trim()) {
            setError("Please enter a service title");
            return false;
        }
        if (!form.description.trim()) {
            setError("Please enter a service description");
            return false;
        }
        if (!form.icon) {
            setError("Please select an icon");
            return false;
        }
        if (!form.color) {
            setError("Please select a color");
            return false;
        }
        return true;
    }, [form]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to create service");
            router.push("/admin/services");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create service");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;
        // Add delete logic here
    };

    useEffect(() => { console.log("Form:", form) }, [form])

    useEffect(() => {
        console.log("Image URL:", form.imageUrl);
      }, [form.imageUrl]);
      
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                <Button
                    variant="ghost"
                    className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Create New Service</h2>

                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="title">Service Title</Label>
                                <Input
                                    id="title"
                                    value={form.title}
                                    onChange={handleTitleChange}
                                    placeholder="Enter service title"
                                    className="mt-1"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">ID: {form.id || 'Will be generated from title'}</p>
                            </div>

                            <div>
                                <Label>Cover Image</Label>
                                <ImageUploader
                                    value={form.imageUrl}
                                    onChange={(url) => updateForm('imageUrl', url)}
                                    onRemove={() => updateForm('imageUrl', '')}
                                />

                            </div>

                            <div>
                                <Label htmlFor="content">Service Content</Label>
                                <Textarea
                                    id="content"
                                    value={form.content}
                                    onChange={e => updateForm('content', e.target.value)}
                                    placeholder="Describe the service in detail"
                                    className="mt-1"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Brief Description</Label>
                                <Textarea
                                    id="description"
                                    value={form.description}
                                    onChange={e => updateForm('description', e.target.value)}
                                    placeholder="Write a brief description"
                                    className="mt-1"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="importance">Service Importance</Label>
                                <Textarea
                                    id="importance"
                                    value={form.importance}
                                    onChange={e => updateForm('importance', e.target.value)}
                                    placeholder="Why is this service important?"
                                    className="mt-1"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div>
                                <Label>Benefits</Label>
                                <div className="flex gap-2 mt-1">
                                    <Input
                                        value={newBenefit}
                                        onChange={e => setNewBenefit(e.target.value)}
                                        onKeyPress={handleBenefitKeyPress}
                                        placeholder="Add a benefit and press Enter"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => handleBenefitAdd(newBenefit)}
                                        disabled={!newBenefit.trim()}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <ul className="mt-2 space-y-2">
                                    {form.benefits.map((benefit, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                                        >
                                            <span>{benefit}</span>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newValue = prompt("Edit benefit:", benefit);
                                                        if (newValue) handleBenefitEdit(index, newValue);
                                                    }}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleBenefitRemove(index)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Icon</Label>
                                    <Select
                                        value={form.icon ? ICON_OPTIONS.find(
                                            icon => icon.component === form.icon
                                        )?.name : ""}
                                        onValueChange={value => {
                                            const icon = ICON_OPTIONS.find(i => i.name === value);
                                            updateForm('icon', icon?.component || null);
                                        }}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select an icon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ICON_OPTIONS.map(icon => (
                                                <SelectItem key={icon.name} value={icon.name}>
                                                    <div className="flex items-center gap-2">
                                                        <icon.component className="w-4 h-4" />
                                                        <span>{icon.name}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Color Theme</Label>
                                    <Select
                                        value={form.color}
                                        onValueChange={value => updateForm('color', value)}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select a color" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {COLOR_OPTIONS.map(color => (
                                                <SelectItem key={color.value} value={color.value}>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-4 h-4 rounded ${color.value}`} />
                                                        <span>{color.label}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between pt-6">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isSubmitting}
                            >
                                Delete Service
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Publish Service"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}