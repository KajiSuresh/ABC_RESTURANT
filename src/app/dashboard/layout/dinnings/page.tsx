"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import Image from 'next/image';
 // Adjust this import path as needed
import AddDining from "./model/add_dinning"
import { DiningTable, diningTableService } from '@/action/dinning';
import EditDinning from './model/edit_dinning';

export default function DiningDashboard() {
  const [diningTables, setDiningTables] = useState<DiningTable[]>([]);
  console.log("diningTables", diningTables);
  
  useEffect(() => {
    fetchDiningTables();
  }, []);

  

  const fetchDiningTables = async () => {
    try {
      const fetchedDiningTables = await diningTableService.getDiningTables();
      setDiningTables(fetchedDiningTables);
    } catch (error) {
      console.error("Failed to fetch dining tables:", error);
    }
  };



  const handleDelete = async (id: string) => {
    try {
      await diningTableService.deleteDiningTable(id);
      fetchDiningTables(); // Refresh the list after deletion
    } catch (error) {
      console.error(`Failed to delete dining table ${id}:`, error);
    }
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Dining Tables</div>
        <div className="flex justify-end mb-4 flex-shrink-0">
          <AddDining onAdd={fetchDiningTables} />
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
  {!diningTables ? (
    <TableRow>
      <TableCell colSpan={3} className="text-center">
        Loading...
      </TableCell>
    </TableRow>
  ) : (
    diningTables.map((diningTable) => (
      <TableRow key={diningTable.id}>
        <TableCell className="font-medium">{diningTable.diningName}</TableCell>
        <TableCell>
          <Image
            src={diningTable.diningImage || "/placeholder.svg"}
            width={64}
            height={64}
            alt="Dining Table Image"
            className="aspect-square rounded-md object-cover"
          />
        </TableCell>
        <TableCell>
          <EditDinning dinning={diningTable} onDinningUpdated={fetchDiningTables} />
          <Button variant="outline" size="icon" onClick={() => handleDelete(diningTable.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

        </Table>
      </div>
    </div>
  )
}