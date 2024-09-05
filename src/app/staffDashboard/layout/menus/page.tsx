"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Trash2 } from "lucide-react"

import AddMenu from "./model/add_menu"
import EditMenu from './model/edit_menu';
import { Menu, menuService } from '@/action/menu';

export default function MenuDashboard() {
  const [menuItems, setMenuItems] = useState<Menu[]>([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const fetchedMenuItems = await menuService.getMenuItems();
      setMenuItems(fetchedMenuItems);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await menuService.deleteMenuItem(id);
      fetchMenuItems(); // Refresh the list after deletion
    } catch (error) {
      console.error(`Failed to delete menu item ${id}:`, error);
    }
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Menu</div>
        <div className="flex justify-end mb-4 flex-shrink-0">
          <AddMenu onAdd={fetchMenuItems} />
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  {/* <EditMenu menuItem={item} onEdit={fetchMenuItems} /> */}
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