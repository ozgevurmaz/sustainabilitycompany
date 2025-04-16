"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Leaf, Trash2 } from "lucide-react";
import { ServicesType } from "@/lib/types/types";
import { ICON_OPTIONS } from "@/lib/constant";
import { toast } from "@/hooks/use-toast";

interface DeleteServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServicesType | null;
  onDeleteSuccess: (updatedList: ServicesType[]) => void;
}

export default function DeleteServiceDialog({
  isOpen,
  onClose,
  service,
  onDeleteSuccess
}: DeleteServiceDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmDelete = () => {
    const deleteFunction = async () => {
      try {
        const response = await fetch(`/api/services/${service?.slug}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete service");
        }

        const newListResponse = await fetch("/api/services");
        const updatedList = await newListResponse.json();
        onDeleteSuccess(updatedList);


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
      }
    };

    deleteFunction()
  };

  // If no service is provided, don't render the dialog content
  if (!service) return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Service</DialogTitle>
        </DialogHeader>
        <p>No service selected for deletion.</p>
      </DialogContent>
    </Dialog>
  );

  const IconComponent = ICON_OPTIONS.find(i => i.name === service.icon)?.component || Leaf;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Service</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this service? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-md ${service.color} bg-opacity-20`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <h3 className="font-medium">{service.title}</h3>
          </div>
          <p className="text-sm text-gray-600">{service.description}</p>

          {service.benefits.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-600">Benefits:</p>
              <ul className="text-xs text-gray-600 mt-1">
                {service.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
                {service.benefits.length > 3 && (
                  <li className="text-xs text-gray-500">
                    +{service.benefits.length - 3} more
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting ? "Deleting..." : "Delete Service"}
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}