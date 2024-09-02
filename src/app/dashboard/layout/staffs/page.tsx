"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import { Staff, staffService } from '@/action/staff';
import AddStaff from './model/add_staff';

export default function StaffDashboard() {
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const fetchedStaff = await staffService.getStaff();
      setStaff(fetchedStaff);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await staffService.deleteStaff(id);
      fetchStaff(); // Refresh the list after deletion
    } catch (error) {
      console.error(`Failed to delete staff member ${id}:`, error);
    }
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Staff</div>
        <AddStaff onAdd={fetchStaff} />
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((staffMember) => (
              <TableRow key={staffMember.id}>
                <TableCell className="font-medium">{staffMember.staffname}</TableCell>
                <TableCell>{staffMember.email}</TableCell>
                <TableCell>{staffMember.phone}</TableCell>
                <TableCell>{staffMember.position}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(staffMember.id)}>
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