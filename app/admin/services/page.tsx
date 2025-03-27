"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const dummyServices = [
  { id: 1, title: "Carbon Footprint Analysis", slug: "carbon-footprint" },
  { id: 2, title: "Water Footprint Reduction", slug: "water-footprint" },
];

export default function ServicesAdmin() {
  const [services, setServices] = useState(dummyServices);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Services</h1>

        <Link href="/admin/services/new">
          <Button className="mb-6">Add New Service</Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">{service.title}</h2>
                <div className="flex justify-between mt-4">
                  <Button variant="outline">Edit</Button>
                  <Button variant="destructive" onClick={() => setServices(services.filter(s => s.id !== service.id))}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
