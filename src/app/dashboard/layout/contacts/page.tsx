"use client"
import React from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {  Trash2 } from "lucide-react"


const contacts = [
  {
    id: "CONTACT001",
    name: "John Smith",
    email: "john.smith@example.com",
    message: "Inquiry about dinner reservations",
  },
  {
    id: "CONTACT002",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    message: "Feedback on recent visit",

  },

  // Add more contacts as needed
]

export default function Contact() {
  const handleEdit = (id: string) => {
    console.log(`Edit contact ${id}`);
    // Implement edit functionality
  }

  const handleDelete = (id: string) => {
    console.log(`Delete contact ${id}`);
    // Implement delete functionality
  }


  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Contacts</div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
               <TableHead>Message</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.message}</TableCell>
                <TableCell>
                
                  <Button variant="outline" size="icon" onClick={() => handleDelete(contact.id)}>
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