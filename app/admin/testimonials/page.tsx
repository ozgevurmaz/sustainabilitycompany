"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Pencil,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import { TestimonialType } from "@/lib/types/types";
import DeleteTestimonialDialog from "@/components/admin/Testimonial/DeleteTestimonialDialog";
import TestimonialCard, { renderRatingStars } from "@/components/admin/Testimonial/TestimonialCard";
import SecondHeader from "@/components/admin/SecondHeader";
import { fetchTestimonials } from "@/lib/actions";
import { getCachedTestimonials, setCachedTestimonials } from "@/lib/cache";
import { TestimonialForm } from "@/components/admin/Testimonial/TestimonialForm";

export default function TestimonialsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialType | null>(null);

  const DEFAULT_FORM: TestimonialType = {
    name: "",
    company: "",
    position: "",
    comment: "",
    rating: 5,
    imageUrl: "",
    featured: true
  };

  useEffect(() => {
    if (status !== "loading" && (!session || session.user?.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status !== "loading" && session?.user?.role === "admin") {
      const loadTestimonials = async () => {
        setIsLoading(true);
        const cachedTestimonials = getCachedTestimonials();
        if (cachedTestimonials) {
          setTestimonials(cachedTestimonials);
          setIsLoading(false);
          return;
        }

        try {
          const data = await fetchTestimonials();
          setTestimonials(data);
        } catch (error) {
          console.error('Error fetching testimonials:', error);
          toast({
            title: "Error",
            description: "Failed to load testimonials.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      loadTestimonials();
    }
  }, [status, session, toast]);

  const handleEditClick = (testimonial: TestimonialType) => {
    setShowAddForm(false);
    setEditingId(testimonial._id);
    setCurrentTestimonial({
      ...testimonial,
      imageUrl: testimonial.imageUrl || "",
    });
  };

  // Reset edit form
  const resetEditForm = () => {
    setEditingId(null);
    setCurrentTestimonial(null);
  };

  // Handle delete testimonial
  const handleDeleteClick = (testimonial: TestimonialType) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  // Reset add form
  const resetForm = () => {
    setCurrentTestimonial(DEFAULT_FORM);
    setShowAddForm(false);
    setEditingId(null);
  };

  // Submit delete testimonial
  const handleDeleteSubmit = () => {

    const deleteTestimonial = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/testimonial/${currentTestimonial?._id}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error("Failed to delete testimonial");
        }
        setIsDeleteDialogOpen(false);
        setCurrentTestimonial(null);
        setIsLoading(false);
        setCachedTestimonials(null);
        toast({
          title: "Testimonial Deleted",
          description: "The testimonial has been successfully deleted."
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete testimonial.",
          variant: "destructive",
        });
      }
    }

    deleteTestimonial()
  };

  // Toggle featured status
  const toggleFeatured = async (testimonial: TestimonialType) => {
    let newFeatured;
    if (testimonial.featured === true) {
      newFeatured = false;
    } else {
      newFeatured = true;
    }

    try {

      const response = await fetch(`/api/testimonial/${testimonial._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: newFeatured })
      });
      if (!response.ok) {
        throw new Error("Failed to update testimonial");
      }
      setCachedTestimonials(null);

      const updatedList = await fetchTestimonials()
      setTestimonials(updatedList)
      toast({
        title: "Featured Status Updated",
        description: "The testimonial featured status has been updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      });
    }

  };

  const handleAddNewClick = () => {
    setCurrentTestimonial(DEFAULT_FORM);
    setShowAddForm(!showAddForm);
    setEditingId(null);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SecondHeader
        pageTitle="Testimonial"
        dialogOpen={handleAddNewClick}
      />

      <main className="container mx-auto px-4 py-8">

        {/* Add Form */}
        {showAddForm && (
          <TestimonialForm
            formData={currentTestimonial}
            onCancel={resetForm}
          />
        )}

        {/* Edit Form */}
        {editingId !== null && (
          <TestimonialForm
            formData={currentTestimonial}
            onCancel={resetEditForm}
            isForEdit={true}
          />
        )}

        {/* Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Testimonials Overview</CardTitle>
            <CardDescription>
              Manage customer testimonials that appear on your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-700">{testimonials.length}</div>
                <div className="text-sm text-gray-600">Total Testimonials</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-700">
                  {testimonials.filter(t => t.featured).length}
                </div>
                <div className="text-sm text-gray-600">Featured Testimonials</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-700">
                  {testimonials.length > 0
                    ? (testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length).toFixed(1)
                    : "0.0"}
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Testimonials</CardTitle>
            <CardDescription>
              Click on a testimonial to edit or delete it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial._id} className={testimonial._id === editingId ? "bg-blue-50" : ""}>
                    <TableCell className="font-medium">{testimonial.name}</TableCell>
                    <TableCell>{testimonial.company}</TableCell>
                    <TableCell>{renderRatingStars(testimonial.rating)}</TableCell>
                    <TableCell>
                      <Button
                        variant={testimonial.featured ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFeatured(testimonial)}
                      >
                        {testimonial.featured ? "Featured" : "Not Featured"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {testimonial._id === editingId ? (
                          <Button variant="outline" size="sm" className="text-green-600" onClick={resetEditForm}>
                            <X className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(testimonial)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteClick(testimonial)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Testimonial Preview */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Testimonial Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.filter(t => t.featured).map((testimonial) => (
            <TestimonialCard testimonial={testimonial} key={testimonial._id} />
          ))}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <DeleteTestimonialDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setCurrentTestimonial(null);
        }}
        onConfirm={handleDeleteSubmit}
        testimonial={currentTestimonial}
      />
    </div>
  );
}