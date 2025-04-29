"use client"

import { TestimonialType } from "@/lib/types/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUploader from "../ImageUploader";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { testimonialSchema } from "@/lib/Schema/testimonial";
import { setCachedTestimonials } from "@/lib/cache";

export const TestimonialForm = ({
    formData,
    onCancel,
    isForEdit = false
}: {
    formData: TestimonialType,
    onCancel: () => void,
    isForEdit?: boolean
}) => {
    const [form, setForm] = useState<TestimonialType>(formData);
    const [error, setError] = useState("");
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (url: string) => {
        setForm(prev => ({
            ...prev,
            imageUrl: url
        }));
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (value >= 1 && value <= 5) {
            setForm(prev => ({
                ...prev,
                rating: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});
        setError("");

        const rawData = form;
        const result = testimonialSchema.safeParse(rawData);
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            const newFormErrors: Record<string, string> = {};
            Object.entries(errors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                    newFormErrors[field] = messages[0];
                }
            });

            setFormErrors(newFormErrors);
            setError("Please correct the highlighted errors");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        try {
            const endpoint = isForEdit
                ? `/api/testimonial/${formData._id}`
                : '/api/testimonial';
            const method = isForEdit ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rawData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save testimonials');
            }

            setCachedTestimonials(null)
            toast({
                title: `Testimonial ${isForEdit ? "Updated" : "Added"}`,
                description: `The testimonial was successfully ${isForEdit ? "updated" : "added"}.`
            });

            onCancel();
        } catch (error: any) {
            console.error("Error while submitting testimonial:", error);
            toast({
                title: "Error",
                description: error.message || "An unexpected error occurred",
                variant: "destructive",
            });
            return; 
        }

    };

    useEffect(() => {
        if (formData) {
            setForm(formData);
        }
    }, [formData]);

    return (
        <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>{isForEdit ? "Edit" : "Add New"} Testimonial</CardTitle>
                    <CardDescription>
                        {isForEdit ? "Update the testimonial information" : "Fill in the details to add a new testimonial"}
                    </CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <X className="h-5 w-5" />
                </Button>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-name`}>Customer Name</Label>
                            <Input
                                id={`${isForEdit ? 'edit' : 'add'}-name`}
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-company`}>Company</Label>
                            <Input
                                id={`${isForEdit ? 'edit' : 'add'}-company`}
                                name="company"
                                value={form.company}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-position`}>Position</Label>
                            <Input
                                id={`${isForEdit ? 'edit' : 'add'}-position`}
                                name="position"
                                value={form.position}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-rating`}>Rating (1-5)</Label>
                            <Input
                                id={`${isForEdit ? 'edit' : 'add'}-rating`}
                                name="rating"
                                type="number"
                                min="1"
                                max="5"
                                step="0.5"
                                value={form.rating}
                                onChange={handleRatingChange}
                                required
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-featured`}>Featured</Label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={`${isForEdit ? 'edit' : 'add'}-featured`}
                                    name="featured"
                                    checked={form.featured}
                                    onChange={(e) => setForm(prev => ({
                                        ...prev,
                                        featured: e.target.checked
                                    }))}
                                    className="h-4 w-4"
                                />
                                <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-featured`}>
                                    Display this testimonial on the website
                                </Label>
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-imageUrl`}>Customer Image</Label>
                            <ImageUploader
                                value={form.imageUrl || ""}
                                onChange={(url) => handleImageChange(url)}
                                onRemove={() => handleImageChange("")}
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-comment`}>Testimonial</Label>
                            <Textarea
                                id={`${isForEdit ? 'edit' : 'add'}-comment`}
                                name="comment"
                                rows={4}
                                value={form.comment}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {isForEdit ? "Update" : "Add"} Testimonial
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};