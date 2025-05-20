"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Search,
  Loader2,
  LayoutGrid,
  List,
  ArrowUp,
  ArrowDown,
  Leaf,
} from "lucide-react";

// Import the type definitions
import { ServicesType } from "@/lib/types/types";
import CustomCard from "../../../components/admin/CustomCard";
import { ICON_OPTIONS } from "@/lib/constant";
import SecondHeader from "@/components/admin/SecondHeader";
import DeleteServiceDialog from "@/components/admin/Services/DeleteServicesDialog";
import { fetchServices } from "@/lib/actions";
import { getCachedServices, setCachedServices } from "@/lib/cache";

export default function ServicesManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<ServicesType | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [services, setServices] = useState<ServicesType[]>([]);

  // Redirect if not logged in as admin
  useEffect(() => {
    if (status !== "loading" && (!session || session.user?.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status !== "loading" && session?.user?.role === "admin") {
      loadServices();
    }
  }, [status, session]);

  // Fetch services data from the API
  const loadServices = async () => {

    const cached = getCachedServices();
    if (cached) {
      setServices(cached);
      setIsLoading(false);
      return
    }

    setIsLoading(true);
    try {
      const data = await fetchServices();
      setServices(data)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load services. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Filter and search services
  const filteredServices = services.filter(service => {
    return service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  });

  // Get icon component based on name
  const getIconComponent = (icon: string) => {
    const normalized = icon.trim();
    const Icon = ICON_OPTIONS.find((i) => i.name === normalized)?.component;
    return Icon ? <Icon className="h-5 w-5" /> : <Leaf className="h-5 w-5" />;
  };

  // Move service
  const swapServiceOrders = async (service1: ServicesType, service2: ServicesType) => {
    try {
      const updates = [
        { slug: service1.slug, order: service2.order },
        { slug: service2.slug, order: service1.order }
      ];

      const response = await fetch("/api/services/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update order");
      }

      setCachedServices(null);
      return true;

    } catch (error) {
      console.error("Error swapping service orders:", error);
      toast({
        title: "Reorder Error",
        description: "Failed to update service order in database.",
        variant: "destructive"
      });
      return false;
    }
  };

  const moveServiceUp = async (slug: string) => {
    const index = services.findIndex(s => s.slug === slug);

    if (index <= 0) return;

    try {
      const serviceToMove = services[index];
      const serviceAbove = services[index - 1];

      const newServices = [...services];

      [newServices[index], newServices[index - 1]] = [
        newServices[index - 1],
        newServices[index]
      ];

      setServices(newServices);

      const success = await swapServiceOrders(serviceToMove, serviceAbove);

      if (!success) {
        setServices(services);
        return;
      }

      toast({
        title: "Success",
        description: "Service moved up successfully"
      });

    } catch (error) {
      console.error("Error moving service up:", error);
      toast({
        title: "Error",
        description: "Failed to reorder service. Please try again.",
        variant: "destructive"
      });
    }
  };

  const moveServiceDown = async (slug: string) => {
    const index = services.findIndex(s => s.slug === slug);

    if (index < 0 || index >= services.length - 1) return;

    try {
      const serviceToMove = services[index];
      const serviceBelow = services[index + 1];

      const newServices = [...services];

      [newServices[index], newServices[index + 1]] = [
        newServices[index + 1],
        newServices[index]
      ];

      setServices(newServices);

      const success = await swapServiceOrders(serviceToMove, serviceBelow);

      if (!success) {
        setServices(services);
        return;
      }

      toast({
        title: "Success",
        description: "Service moved down successfully"
      });

    } catch (error) {
      console.error("Error moving service down:", error);
      toast({
        title: "Error",
        description: "Failed to reorder service. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle add click - Open dialog with no service
  const handleAddClick = () => {
    router.push("/admin/services/new")
  };

  // Handle edit click - Open dialog with the service to edit
  const handleEditClick = (service: ServicesType) => {
    router.push(`/admin/services/edit/${service.slug}`)
  };

  // Handle preview click
  const handlePreviewClick = (service: ServicesType) => {
    window.open(`/services/${service.slug}`, '_blank');
  };

  // Handle delete click
  const handleDeleteClick = (service: ServicesType) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
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
      <SecondHeader pageTitle="Services" dialogOpen={handleAddClick} />

      <main className="container mx-auto px-4 py-8 md:px-16">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CustomCard
            title="Total Services"
            middleValue={String(services.length)}
            desc="All services"
          />
          <CustomCard
            title="Featured Services"
            middleValue={String(services.filter(s => s.imageUrl).length)}
            desc="With featured images"
          />
          <CustomCard
            title="Categories"
            middleValue={String(new Set(services.map(s => s.color)).size)}
            desc="Color categories"
          />
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search services..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4 mr-1" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredServices.map((service) => (
              <Card key={service.slug} className="overflow-hidden">
                <div className="relative h-40 bg-gray-100">
                  {service.imageUrl ? (
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0 bg-black/5 z-10"></div>
                      <div className="absolute w-full h-full flex items-center justify-center">
                        <Image
                          src={service.imageUrl || "/placeholder.jpg"}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      {getIconComponent(service.icon)}
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <div className={`mr-3 p-2 rounded-md ${service.color} bg-opacity-20 text-gray-700`}>
                      {getIconComponent(service.icon)}
                    </div>
                    <h3 className="text-lg font-semibold truncate">{service.title}</h3>

                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditClick(service)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePreviewClick(service)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => moveServiceUp(service.slug)}>
                            <ArrowUp className="mr-2 h-4 w-4" />
                            Move Up
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => moveServiceDown(service.slug)}>
                            <ArrowDown className="mr-2 h-4 w-4" />
                            Move Down
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(service)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{service.description}</p>

                  {service.benefits.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-500 mb-1">Key Benefits:</p>
                      <ul className="text-xs text-gray-600">
                        {service.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-center">
                            <span className="mr-1 text-green-500">•</span> {benefit}
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

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleEditClick(service)}
                    >
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handlePreviewClick(service)}
                    >
                      <Eye className="mr-2 h-3 w-3" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">Order</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Benefits</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No services found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredServices.map((service, index) => (
                      <TableRow key={service.slug}>
                        <TableCell>
                          <div className="flex flex-col items-center">
                            <span className="font-medium">{index + 1}</span>
                            <div className="flex mt-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => moveServiceUp(service.slug)}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => moveServiceDown(service.slug)}
                                disabled={index === services.length - 1}
                              >
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-md ${service.color} bg-opacity-20`}>
                              {getIconComponent(service.icon)}
                            </div>
                            <div className="font-medium">{service.title}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {service.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {service.benefits.length} benefits
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePreviewClick(service)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditClick(service)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleDeleteClick(service)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </main>

      {/* Delete Dialog */}
      <DeleteServiceDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        service={currentService}
        onDeleteSuccess={(updatedList) => {
          setServices(updatedList);
          toast({
            title: "Service Deleted",
            description: `"${currentService?.title}" has been deleted.`,
          });
          setIsDeleteDialogOpen(false);
        }}
      />
    </div>
  );
}