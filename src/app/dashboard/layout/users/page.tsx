"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import EditUser from './model/edit_user';
import { User, userService } from '@/action/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await userService.getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await userService.deleteUser(id);
      fetchUsers();
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error(`Failed to delete user ${id}:`, error);
      toast.error(`Failed to delete user.`);
    }
  }

  return (
    <div className="w-full p-6">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Users</div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.phoneNo}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                 
                  <Button variant="outline" size="icon" className="ml-2" onClick={() => handleDelete(user.id)}>
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