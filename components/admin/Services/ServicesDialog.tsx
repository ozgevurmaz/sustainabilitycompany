"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Leaf,
  Sun,
  Recycle,
  Building,
  Lightbulb,
  Flower2,
  Droplet,
  Earth,
  Globe,
  Trees,
  Wind,
  Car,
  Battery,
  Waves,
  Zap,
  Sprout,
  X,
  Plus,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUploader from "@/components/admin/ImageUploader";
import { ServicesType } from "@/lib/types/types";
import { COLOR_OPTIONS, ICON_OPTIONS } from "@/lib/constant";

interface ServicesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service?: ServicesType | null;
  onSave: (service: ServicesType) => void;
}

// Define a default service state
const DEFAULT_SERVICE: ServicesType = {
  id: "",
  title: "",
  description: "",
  content: "",
  importance: "",
  benefits: [],
  imageUrl: "",
  icon: Leaf,
  color: "bg-green-500",
};

export default function ServicesDialog({
  isOpen,
  onClose,
  service,
  onSave,
}: ServicesDialogProps) {
  const [form, setForm] = useState<ServicesType>(service || DEFAULT_SERVICE);
  const [newBenefit, setNewBenefit] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens or service changes
  useEffect(() => {
    if (isOpen) {
      setForm(service || DEFAULT_SERVICE);
      setError("");
      setNewBenefit("");
    }
  }, [isOpen, service]);

  const generateSlug = useCallback(
    (title: string) =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    []
  );

  const updateForm = (field: keyof ServicesType, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;
      setForm((prev) => ({ ...prev, title, id: generateSlug(title) }));
    },
    [generateSlug]
  );

  const handleBenefitAdd = useCallback((benefit: string) => {
    if (benefit.trim()) {
      setForm((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefit.trim()],
      }));
      setNewBenefit("");
    }
  }, []);

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

  const validateForm = useCallback(() => {
    if (!form.title.trim()) {
      setError("Please enter a service title");
      return false;
    }
    if (!form.description.trim()) {
      setError("Please enter a service description");
      return false;
    }
    if (!form.content.trim()) {
      setError("Please enter service content");
      return false;
    }
    if (!form.importance.trim()) {
      setError("Please enter service importance");
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
      // Pass the updated service to the parent component
      onSave(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get icon component by name
  const getIconByName = (iconName: string) => {
    const found = ICON_OPTIONS.find((icon) => icon.name === iconName);
    return found?.component || Leaf;
  };

  // Get icon name from component
  const getIconName = (iconComponent: any) => {
    const found = ICON_OPTIONS.find((icon) => icon.component === iconComponent);
    return found?.name || "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {service ? "Edit Service" : "Create New Service"}
          </DialogTitle>
          <DialogDescription>
            {service
              ? "Update the service details below"
              : "Fill out the form to create a new service"}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-sm font-medium">Service Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={handleTitleChange}
              placeholder="Enter service title"
              className="mt-1.5"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              ID: {form.id || "Will be generated from title"}
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium">Cover Image</Label>
            <ImageUploader
              value={form.imageUrl}
              onChange={(url) => updateForm("imageUrl", url)}
              onRemove={() => updateForm("imageUrl", "")}
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">Brief Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              placeholder="Write a brief description"
              className="mt-1.5"
              rows={2}
              required
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-sm font-medium">Service Content</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => updateForm("content", e.target.value)}
              placeholder="Describe the service in detail"
              className="mt-1.5"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="importance" className="text-sm font-medium">Service Importance</Label>
            <Textarea
              id="importance"
              value={form.importance}
              onChange={(e) => updateForm("importance", e.target.value)}
              placeholder="Why is this service important?"
              className="mt-1.5"
              rows={3}
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Benefits</Label>
            <div className="flex gap-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                onKeyPress={handleBenefitKeyPress}
                placeholder="Add a benefit and press Enter"
                className="flex-1"
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
                value={getIconName(form.icon)}
                onValueChange={(value) => {
                  updateForm("icon", getIconByName(value));
                }}
              >
                <SelectTrigger className="mt-1.5">
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
            </div>

            <div>
              <Label className="text-sm font-medium">Color Theme</Label>
              <Select
                value={form.color}
                onValueChange={(value) => updateForm("color", value)}
              >
                <SelectTrigger className="mt-1.5">
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
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : service
                ? "Update Service"
                : "Create Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}