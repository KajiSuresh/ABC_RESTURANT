'use client'
import React from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {Trash2 } from "lucide-react"

import AddService from "./model/add_service"
import EditService from './model/edit_service';

const services = [
  {
    id: "SERVICE001",
    name: "Table Reservation",
    description: "Reserve a table for your dining experience",
    image:''
  },
  {
    id: "SERVICE002",
    name: "Private Dining Room",
    description: "Exclusive dining area for special events",
    image:''
  },
 
  // Add more services as needed
]

export default function Service() {
  const handleEdit = (id: string) => {
    console.log(`Edit service ${id}`);
    // Implement edit functionality
  }

  const handleDelete = (id: string) => {
    console.log(`Delete service ${id}`);
    // Implement delete functionality
  }
  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Services</div>
        <div className="flex justify-end mb-4 flex-shrink-0">
          <AddService/>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Action</TableHead>
              
  
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                <img
                  src="/placeholder.svg"
                  width={64}
                  height={64}
                  alt="Product Image"
                  className="aspect-square rounded-md object-cover"
                />
                  {service.image}</TableCell>
                <TableCell>
                  <EditService/>
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