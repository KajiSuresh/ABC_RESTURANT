"use client"
import React from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import AddMenu from "./model/add_menu"
import EditMenu from './model/edit_menu';

const menuItems = [
  {
    id: "ITEM001",
    name: "Margherita Pizza",
    category: "Pizza",
    price: "$12.99",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
  },
  {
    id: "ITEM002",
    name: "Caesar Salad",
    category: "Salad",
    price: "$8.99",
    description: "Romaine lettuce, croutons, parmesan cheese, and Caesar dressing",
  },
  // Add more menu items as needed
]

export default function Menu() {
  const handleEdit = (id: string) => {
    console.log(`Edit item ${id}`);
    // Implement edit functionality
  }

  const handleDelete = (id: string) => {
    console.log(`Delete item ${id}`);
    // Implement delete functionality
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Menu</div>
        <div className="flex justify-end mb-4 flex-shrink-0">
          <AddMenu/>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead >Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <EditMenu/>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}>
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