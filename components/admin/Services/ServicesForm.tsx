"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Leaf,
  Plus,
  Save,
  Trash2,
  Loader2,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from "@/components/admin/ImageUploader";
import { ServicesType } from "@/lib/types/types";
import { COLOR_OPTIONS, ICON_OPTIONS } from "@/lib/constant";
import { generateSlug } from "@/lib/actions";
import { useParams, useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { serviceSchema } from "@/lib/Schema/services";
import LoadingPage from "@/components/LoadingPage";

interface ServicesFormProps {
  isEdit: boolean;
}

const DEFAULT_SERVICE: ServicesType = {
  title: "",
  slug: "",
  description: "",
  content: "",
  importance: "",
  benefits: [],
  imageUrl: "",
  icon: "Leaf",
  color: "bg-green-500",
};

export default function ServicesForm({
  isEdit
}: ServicesFormProps) {

  const router = useRouter();
  const params = useParams();

  const { toast } = useToast();
  const [loading, setLoading] = useState(isEdit);
  const [service, setService] = useState<ServicesType>(DEFAULT_SERVICE);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [form, setForm] = useState<ServicesType>(service);
  const [newBenefit, setNewBenefit] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<string>("");
  const [originalSlug, setOriginalSlug] = useState<string>("");

  const slug = params.serviceSlug as string;

  useEffect(() => {
    const fetchServiceData = async () => {
      if (isEdit && slug) {
        try {
          setLoading(true);
          const response = await fetch(`/api/services/${slug}`);

          if (!response.ok) {
            throw new Error('Failed to fetch service data');
          }

          const serviceData = await response.json();
          setService(serviceData);
          setForm(serviceData);
          setOriginalSlug(serviceData.slug);
          setImage(serviceData.imageUrl || "");
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
      }
    };

    fetchServiceData();
  }, [isEdit, slug, toast]);

  useEffect(() => {
    if (image) {
      updateForm("imageUrl", image);
    }
  }, [image]);

  const title = isEdit ? "Edit Service" : "Create New Service";
  const description = isEdit
    ? "Update your service with the latest information"
    : "Add a new service to your website";
  const submitButtonText = isEdit ? "Update Service" : "Create Service";

  const updateForm = (field: keyof ServicesType, value: any) => {
    // Clear error for this field when it's updated
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;
      setForm((prev) => ({ ...prev, title, slug: generateSlug(title) }));
      
      // Clear title and slug errors when title changes
      if (formErrors.title || formErrors.slug) {
        setFormErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.title;
          delete newErrors.slug;
          return newErrors;
        });
      }
    },
    [formErrors]
  );

  const handleBenefitAdd = useCallback((benefit: string) => {
    if (benefit.trim()) {
      setForm((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefit.trim()],
      }));
      setNewBenefit("");
      
      // Clear benefits error if it exists
      if (formErrors.benefits) {
        setFormErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.benefits;
          return newErrors;
        });
      }
    }
  }, [formErrors]);

  const handleBenefitKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleBenefitAdd(newBenefit);
      }
    },
    [newBenefit, handleBenefitAdd]
  );

  const handleBenefitRemove = useCallback((index: number) => {
    setForm((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  }, []);

  // Helper component to display field errors
  const FormErrorMessage = ({ field }: { field: string }) => {
    if (!formErrors[field]) return null;
    
    return (
      <p className="text-sm text-red-500 mt-1">
        {formErrors[field]}
      </p>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setFormErrors({});
    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    const rawData = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string || form.slug,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      importance: formData.get("importance") as string,
      benefits: form.benefits, // Use the benefits array from state
      imageUrl: form.imageUrl || "",
      icon: formData.get("icon") as string || form.icon,
      color: formData.get("color") as string || form.color,
    };
  
    const result = serviceSchema.safeParse(rawData);
    
    if (!result.success) {
      // Transform Zod errors into field-specific error messages
      const errors = result.error.flatten().fieldErrors;
      const newFormErrors: Record<string, string> = {};
      
      // Process each field with errors
      Object.entries(errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          newFormErrors[field] = messages[0];
        }
      });
      
      setFormErrors(newFormErrors);
      
      // Set a general error message
      setError("Please correct the highlighted errors");
      
      // Scroll to the top of the form to show the error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      return;
    }

    setIsSubmitting(true);

    try {
      // Make API call based on whether we're creating or updating
      const endpoint = isEdit
        ? `/api/services/${originalSlug}`
        : '/api/services';

      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save service');
      }

      const savedService = await response.json();

      // Show success toast
      toast({
        title: isEdit ? "Service Updated" : "Service Created",
        description: `Successfully ${isEdit ? 'updated' : 'created'} ${form.title}`,
        variant: "default"
      });

      // Redirect to the services list page on success
      router.push('/admin/services');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = () => {
    const deleteFunction = async () => {
      try {
        const response = await fetch(`/api/services/${originalSlug}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete service");
        }

        toast({
          title: "Service Deleted",
          description: `"${service?.title}" has been deleted.`,
        });
      } catch (error) {
        console.error("Error deleting service:", error);
        toast({
          title: "Error",
          description: "Failed to delete service.",
          variant: "destructive",
        });
      } finally {
        router.push("/admin/services")
      }
    };

    deleteFunction()
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">{description}</p>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
              {error}
            </div>
          )}
        </div>

        {loading ? (
          <LoadingPage/>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">Service Title</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="Enter service title"
                className={`mt-1.5 ${formErrors.title ? "border-red-500 focus:ring-red-500" : ""}`}
                required
              />
              <FormErrorMessage field="title" />
              <p className="text-xs text-gray-500 mt-1">
                Slug: {form.slug || "Will be generated from title"}
              </p>
              <FormErrorMessage field="slug" />
            </div>

            <div>
              <Label className="text-sm font-medium">Cover Image</Label>
              <ImageUploader
                value={image}
                onChange={setImage}
                onRemove={() => {
                  setImage("");
                  updateForm("imageUrl", "");
                }}
              />
              <FormErrorMessage field="imageUrl" />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">Brief Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Write a brief description"
                className={`mt-1.5 ${formErrors.description ? "border-red-500 focus:ring-red-500" : ""}`}
                rows={2}
                required
              />
              <FormErrorMessage field="description" />
            </div>

            <div>
              <Label htmlFor="content" className="text-sm font-medium">Service Content</Label>
              <Textarea
                id="content"
                name="content"
                value={form.content}
                onChange={(e) => updateForm("content", e.target.value)}
                placeholder="Describe the service in detail"
                className={`mt-1.5 ${formErrors.content ? "border-red-500 focus:ring-red-500" : ""}`}
                rows={3}
                required
              />
              <FormErrorMessage field="content" />
            </div>

            <div>
              <Label htmlFor="importance" className="text-sm font-medium">Service Importance</Label>
              <Textarea
                id="importance"
                name="importance"
                value={form.importance}
                onChange={(e) => updateForm("importance", e.target.value)}
                placeholder="Why is this service important?"
                className={`mt-1.5 ${formErrors.importance ? "border-red-500 focus:ring-red-500" : ""}`}
                rows={3}
                required
              />
              <FormErrorMessage field="importance" />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Benefits</Label>
              <div className="flex gap-2">
                <Input
                  name="benefitInput" // Changed from benefits to avoid conflict with the actual benefits array
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyDown={handleBenefitKeyPress}
                  placeholder="Add a benefit and press Enter"
                  className={`flex-1 ${formErrors.benefits ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                <Button
                  type="button"
                  onClick={() => handleBenefitAdd(newBenefit)}
                  disabled={!newBenefit.trim()}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              <FormErrorMessage field="benefits" />

              {form.benefits.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-md max-h-48 overflow-y-auto">
                  <ul className="space-y-2">
                    {form.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-white p-2 px-3 rounded border text-sm"
                      >
                        <span>{benefit}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBenefitRemove(index)}
                          className="h-8 w-8 p-0 ml-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Icon</Label>
                <Select
                  name="icon"
                  value={form.icon}
                  onValueChange={(value) => updateForm("icon", value)}
                >
                  <SelectTrigger className={`mt-1.5 ${formErrors.icon ? "border-red-500 focus:ring-red-500" : ""}`}>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {ICON_OPTIONS.map((icon) => (
                      <SelectItem key={icon.name} value={icon.name}>
                        <div className="flex items-center gap-2">
                          <icon.component className="w-4 h-4" />
                          <span>{icon.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormErrorMessage field="icon" />
              </div>

              <div>
                <Label className="text-sm font-medium">Color Theme</Label>
                <Select
                  name="color"
                  value={form.color}
                  onValueChange={(value) => updateForm("color", value)}
                >
                  <SelectTrigger className={`mt-1.5 ${formErrors.color ? "border-red-500 focus:ring-red-500" : ""}`}>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLOR_OPTIONS.map((color) => (
                      <SelectItem key={color.label} value={color.hex}>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: color.hex }} />
                          <span>{color.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormErrorMessage field="color" />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center pt-4 border-t mt-8">
              <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/services")}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>

                {isEdit && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {submitButtonText}
                  </>
                )}
              </Button>
            </div>
            {isEdit && (
              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the service &quot;{service?.title}&quot;.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault();
                        handleConfirmDelete();
                      }}
                      disabled={isSubmitting}
                      className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Delete Service"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </form>
        )}
      </div>
    </div>
  );
}