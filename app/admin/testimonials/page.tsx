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
  Star,
  StarHalf,
  Pencil,
  Trash2,
  Plus,
  ArrowLeft,
  Loader2,
  UserCircle2,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { TestimonialFormType, TestimonialType } from "@/lib/types/types";
import { dummyTestimonials } from "@/lib/constant";
import TestimonialDialog from "@/components/admin/Testimonial/TestimonialDialog";
import DeleteTestimonialDialog from "@/components/admin/Testimonial/DeleteTestimonialDialog";

export default function TestimonialsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  
  // Dialog state management
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialType | null>(null);
  
  // Separate form states for add and edit
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
    setCurrentTestimonial(testimonial);
    setEditFormData({
      name: testimonial.name,
      company: testimonial.company,
      position: testimonial.position,
      comment: testimonial.comment,
      rating: testimonial.rating,
      imageUrl: testimonial.imageUrl || ""
    });
    setIsEditDialogOpen(true);
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
    setCurrentTestimonial(null);
  };

  // Submit new testimonial
  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // API call
    setTimeout(() => {
      const newTestimonial = {
        id: testimonials.length + 1,
        ...addFormData,
        featured: false,
        date: new Date().toISOString().split('T')[0]
      };

      setTestimonials(prev => [...prev, newTestimonial]);
      setIsAddDialogOpen(false);
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
          item.id === currentTestimonial?.id ? { ...item, ...editFormData } : item
        )
      );
      setIsEditDialogOpen(false);
      resetEditForm();
      setIsLoading(false);

      toast({
        title: "Testimonial Updated",
        description: "The testimonial has been successfully updated."
      });
    }, 500);
  };

  // Handle add dialog close
  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
    resetAddForm();
  };

  // Handle edit dialog close
  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    resetEditForm();
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

  // Render rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    return <div className="flex">{stars}</div>;
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
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/admin">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-green-700">Manage Testimonials</h1>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Add New Testimonial
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
                  <TableRow key={testimonial.id}>
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
                        <Button variant="outline" size="sm" onClick={() => handleEditClick(testimonial)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
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
            <Card key={`preview-${testimonial.id}`} className="overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                      {testimonial.imageUrl ? (
                        <img src={testimonial.imageUrl} alt={testimonial.name} className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle2 className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {testimonial.position} at {testimonial.company}
                      </CardDescription>
                    </div>
                  </div>
                  <div>
                    {renderRatingStars(testimonial.rating)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="relative">
                  <MessageSquare className="absolute top-0 left-0 w-8 h-8 text-gray-200 -z-10" />
                  <p className="text-sm text-gray-700 pl-6 line-clamp-4">
                    "{testimonial.comment}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Add Testimonial Dialog */}
      <TestimonialDialog
        isDialogOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onClose={handleAddDialogClose}
        mode="add"
        handleSubmit={handleAddSubmit}
        handleInputChange={handleAddInputChange}
        formData={addFormData}
      />

      {/* Edit Testimonial Dialog */}
      <TestimonialDialog
        isDialogOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onClose={handleEditDialogClose}
        mode="edit"
        handleSubmit={handleEditSubmit}
        handleInputChange={handleEditInputChange}
        formData={editFormData}
      />

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