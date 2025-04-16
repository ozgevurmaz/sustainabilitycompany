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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Pencil,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import { TestimonialFormType, TestimonialType } from "@/lib/types/types";
import { dummyTestimonials } from "@/lib/constant";
import DeleteTestimonialDialog from "@/components/admin/Testimonial/DeleteTestimonialDialog";
import TestimonialCard, { renderRatingStars } from "@/components/admin/Testimonial/TestimonialCard";
import SecondHeader from "@/components/admin/SecondHeader";
import ImageUploader from "@/components/admin/ImageUploader";

export default function TestimonialsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);

  // Form display states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialType | null>(null);

  // Form states
  const [addFormData, setAddFormData] = useState<TestimonialFormType>({
    name: "",
    company: "",
    position: "",
    comment: "",
    rating: 5,
    imageUrl: "",
  });

  const [editFormData, setEditFormData] = useState<TestimonialFormType>({
    name: "",
    company: "",
    position: "",
    comment: "",
    rating: 5,
    imageUrl: "",
  });

  // Redirect if not logged in as admin
  useEffect(() => {
    if (status !== "loading" && (!session || session.user?.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  // Mock fetch testimonials data (replace with actual API call)
  useEffect(() => {
    if (status !== "loading" && session?.user?.role === "admin") {
      // API fetch
      setTimeout(() => {
        setTestimonials(dummyTestimonials);
        setIsLoading(false);
      }, 800);
    }
  }, [status, session]);

  // Handle add form input changes
  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle edit form input changes
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle edit testimonial
  const handleEditClick = (testimonial: TestimonialType) => {
    // Close add form if it's open
    setShowAddForm(false);
    
    // Set editing id and form data
    setEditingId(testimonial.id);
    setEditFormData({
      name: testimonial.name,
      company: testimonial.company,
      position: testimonial.position,
      comment: testimonial.comment,
      rating: testimonial.rating,
      imageUrl: testimonial.imageUrl || ""
    });
  };

  // Handle delete testimonial
  const handleDeleteClick = (testimonial: TestimonialType) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  // Reset add form
  const resetAddForm = () => {
    setAddFormData({
      name: "",
      company: "",
      position: "",
      comment: "",
      rating: 5,
      imageUrl: "",
    });
    setShowAddForm(false);
  };

  // Reset edit form
  const resetEditForm = () => {
    setEditFormData({
      name: "",
      company: "",
      position: "",
      comment: "",
      rating: 5,
      imageUrl: "",
    });
    setEditingId(null);
  };

  // Submit new testimonial
  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // API call
    setTimeout(() => {
      const newTestimonial = {
        id: Math.max(...testimonials.map(t => t.id), 0) + 1,
        ...addFormData,
        featured: false,
        date: new Date().toISOString().split('T')[0]
      };

      setTestimonials(prev => [...prev, newTestimonial]);
      resetAddForm();
      setIsLoading(false);

      toast({
        title: "Testimonial Added",
        description: "The testimonial has been successfully added.",
      });
    }, 500);
  };

  // Submit edit testimonial
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // API call
    setTimeout(() => {
      setTestimonials(prev =>
        prev.map(item =>
          item.id === editingId ? { ...item, ...editFormData } : item
        )
      );
      resetEditForm();
      setIsLoading(false);

      toast({
        title: "Testimonial Updated",
        description: "The testimonial has been successfully updated."
      });
    }, 500);
  };

  // Submit delete testimonial
  const handleDeleteSubmit = () => {
    setIsLoading(true);

    // API call
    setTimeout(() => {
      setTestimonials(prev =>
        prev.filter(item => item.id !== currentTestimonial?.id)
      );
      setIsDeleteDialogOpen(false);
      setCurrentTestimonial(null);
      setIsLoading(false);

      toast({
        title: "Testimonial Deleted",
        description: "The testimonial has been successfully deleted."
      });
    }, 500);
  };

  // Toggle featured status
  const toggleFeatured = (id: number) => {
    setTestimonials(prev =>
      prev.map(item =>
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );

    toast({
      title: "Featured Status Updated",
      description: "The testimonial featured status has been updated."
    });
  };

  const handleImageChange = (imageUrl: string) => {
    setTestimonials(prev => ({
      ...prev,
      featuredImage: imageUrl
    }));
  };

  const handleAddNewClick = () => {
    // Reset the edit form if it's open
    resetEditForm();
    
    // Toggle the add form
    setShowAddForm(!showAddForm);
  };


  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // Form component for reuse
  const TestimonialForm = ({
    formData,
    handleInputChange,
    handleSubmit,
    formTitle,
    submitButtonText,
    onCancel,
    isForEdit = false
  }: {
    formData: TestimonialFormType,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    formTitle: string,
    submitButtonText: string,
    onCancel: () => void,
    isForEdit?: boolean
  }) => (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{formTitle}</CardTitle>
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
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-company`}>Company</Label>
              <Input 
                id={`${isForEdit ? 'edit' : 'add'}-company`} 
                name="company" 
                value={formData.company} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-position`}>Position</Label>
              <Input 
                id={`${isForEdit ? 'edit' : 'add'}-position`} 
                name="position" 
                value={formData.position} 
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
                value={formData.rating} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
                <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-imageUrl`}>Image URL</Label>
                <ImageUploader
                value={formData.imageUrl}
                onChange={(url) => handleImageChange(url)}
                onRemove={() => handleImageChange("")}
                /> 
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${isForEdit ? 'edit' : 'add'}-comment`}>Testimonial</Label>
              <Textarea 
                id={`${isForEdit ? 'edit' : 'add'}-comment`} 
                name="comment" 
                rows={4} 
                value={formData.comment} 
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
              {submitButtonText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

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
            formData={addFormData}
            handleInputChange={handleAddInputChange}
            handleSubmit={handleAddSubmit}
            formTitle="Add New Testimonial"
            submitButtonText="Add Testimonial"
            onCancel={resetAddForm}
          />
        )}

        {/* Edit Form */}
        {editingId !== null && (
          <TestimonialForm 
            formData={editFormData}
            handleInputChange={handleEditInputChange}
            handleSubmit={handleEditSubmit}
            formTitle={`Edit Testimonial: ${editFormData.name}`}
            submitButtonText="Update Testimonial"
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
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id} className={testimonial.id === editingId ? "bg-blue-50" : ""}>
                    <TableCell className="font-medium">{testimonial.name}</TableCell>
                    <TableCell>{testimonial.company}</TableCell>
                    <TableCell>{renderRatingStars(testimonial.rating)}</TableCell>
                    <TableCell>
                      <Button
                        variant={testimonial.featured ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFeatured(testimonial.id)}
                      >
                        {testimonial.featured ? "Featured" : "Not Featured"}
                      </Button>
                    </TableCell>
                    <TableCell>{testimonial.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {testimonial.id === editingId ? (
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
            <TestimonialCard testimonial={testimonial} key={testimonial.id} />
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