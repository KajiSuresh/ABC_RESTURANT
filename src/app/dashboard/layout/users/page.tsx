"use client"
import React from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Trash2 } from "lucide-react"

import EditUser from './model/edit_user';

const userData = [
  {
    id:"",
    Name: "Kajee",
    Phone: "0787703283",
    Password: "0815",
    Email: "Kaji15@gmail.com",
  },
  {
    id:"",
    Name: "Suve",
    Phone: "0787723456",
    Password: "1224",
    Email: "Suve24@gmail.com",
  },
]

export default function User() {
  const handleEdit = (id: any) => {
    console.log(`Edit ${id}`);
    // Implement edit functionality
  }

  const handleDelete = (id: any) => {
    console.log(`Delete ${id}`);
    // Implement delete functionality
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">User</div>
        <div className="flex justify-end mb-4 flex-shrink-0">
         
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.Name}</TableCell>
                <TableCell>{user.Phone}</TableCell>
                <TableCell>{user.Password}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>
                 <EditUser/>
                  <Button variant="outline" size="icon" className="ml-2" onClick={() => handleDelete(user.Name)}>
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