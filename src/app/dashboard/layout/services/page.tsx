"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import AddService from "./model/add_service"
import EditService from './model/edit_service';
import { ServiceType, serviceTypeService } from '@/action/service'; // Adjust the import path as needed
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';


export default function Service() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const { toast } = useToast()

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const fetchedServices = await serviceTypeService.getServiceTypes();
      setServices(fetchedServices);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      toast({
        title: "Error",
        description: "Failed to fetch services. Please try again.",
        variant: "destructive",
      })
    }
  };

  const handleEdit = (id: string) => {
    console.log(`Edit service ${id}`);
    // Implement edit functionality
  }

  const handleDelete = async (id: string) => {
    try {
      await serviceTypeService.deleteServiceType(id);
      fetchServices(); // Refresh the list after deletion
      toast({
        title: "Service Deleted",
        description: "The service has been successfully deleted.",
      })
    } catch (error) {
      console.error(`Failed to delete service ${id}:`, error);
      toast({
        title: "Error",
        description: "Failed to delete the service. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Services</div>
        <div className="flex justify-end mb-4 flex-shrink-0">
          <AddService onServiceAdded={fetchServices} />
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[300px]'>Name</TableHead>
              <TableHead className='w-[500px]'>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.serviceName}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Image
                    src={service.serviceImage || "/placeholder.svg"}
                    width={64}
                    height={64}
                    alt="Service Image"
                    className="aspect-square rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>
                  <EditService service={service} onServiceUpdated={fetchServices} />
                  <Button variant="outline" size="icon" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}