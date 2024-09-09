import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DiningTable, DiningTableData, diningTableService } from "@/action/dinning";
import Image from 'next/image';

interface EditDinningProps {
  dinning: DiningTable;
  onDinningUpdated: () => void;
}

export default function EditDinning({ dinning, onDinningUpdated }: EditDinningProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<DiningTableData>({
    diningName: dinning.diningName,
    diningImage: dinning.diningImage,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "diningImage" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          diningImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Submitting data:', formData);
      const updatedDining = await diningTableService.updateDiningTable(dinning.id, formData);
      console.log('Update successful:', updatedDining);
      onDinningUpdated();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to update Dining:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="mr-2">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Dining</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-6">
          <div className="space-y-2">
            <Label htmlFor="diningName">Name</Label>
            <Input 
              id="diningName" 
              name="diningName"
              placeholder="Enter name"
              value={formData.diningName}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="diningImage">Image</Label>
            <Input 
              id="diningImage" 
              name="diningImage"
              type="file" 
              onChange={handleInputChange}
              accept="image/*"
            />
            {formData.diningImage && (
              <div>
                <p>Current image:</p>
                <Image src={formData.diningImage} alt="Dining table" style={{maxWidth: '200px'}} />
              </div>
            )}
          </div>
        
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}