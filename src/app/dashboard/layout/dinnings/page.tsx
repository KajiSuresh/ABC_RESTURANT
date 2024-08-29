"use client"
import React from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import AddDining from "./model/add_dinning"
import EditDinning from './model/edit_dinning';
import Image from 'next/image';

const diningTables = [
  {
    id: "",
    tableName: "lough",
    image:""
    
  },
  
  // Add more dining tables as needed
]

export default function Dining() {
  const handleEdit = (id: string) => {
    console.log(`Edit table ${id}`);
    // Implement edit functionality
  }

  const handleDelete = (id: string) => {
    console.log(`Delete table ${id}`);
    // Implement delete functionality
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Dining Tables</div>
        <div className="flex justify-end mb-4 flex-shrink-0">
          <AddDining/>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Table Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {diningTables.map((dinning) => (
              <TableRow key={dinning.id}>
                <TableCell className="font-medium">{dinning.tableName}</TableCell>
                <TableCell>
                <Image
                  src="/placeholder.svg"
                  width={64}
                  height={64}
                  alt="Product Image"
                  className="aspect-square rounded-md object-cover"
                />
                  {dinning.image}</TableCell>
                
                <TableCell>
                 <EditDinning/>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(dinning.id)}>
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