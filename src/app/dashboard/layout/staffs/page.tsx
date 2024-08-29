"use client"
import React from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import AddStaff from "./model/add_staff"
import EditStaff from './model/edit_staff';

const staffData = [
  {
    id:"",
    StaffName: "Vithu",
    Password: "0000",
    PhoneNumber: "0726754378",
    Position: "Chef",
  },
  {
    id:"",
    StaffName: "Vithu",
    Password: "0000",
    PhoneNumber: "0726754378",
    Position: "Chef",
  },
  // Add more staff members here...
]

export default function Staffs() {
  const handleEdit = (id: string) => {
    console.log(`Edit ${id}`);
    // Implement edit functionality
  }

  const handleDelete = (id: string) => {
    console.log(`Delete ${id}`);
    // Implement delete functionality
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Staffs</div>
        <div className="flex justify-end mb-4 flex-shrink-0">
          <AddStaff/>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>StaffName</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>PhoneNumber</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffData.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{staff.StaffName}</TableCell>
                <TableCell>{staff.Password}</TableCell>
                <TableCell>{staff.PhoneNumber}</TableCell>
                <TableCell>{staff.Position}</TableCell>
                <TableCell>
                  <EditStaff/>
                  <Button variant="outline" size="icon" className="mt-1 ml-2" onClick={() => handleDelete(staff.StaffName)}>
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