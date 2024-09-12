import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { diningTableService } from '@/action/dinning';

export default function AddDining({ onAdd }: { onAdd: () => Promise<void> }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!name || !image) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
    
      const base64Image = await convertToBase64(image);

      const newDiningTable = await diningTableService.createDiningTable({
        diningName: name,
        diningImage: base64Image,
      });

      console.log('New dining table created:', newDiningTable);
  
      setName('');
      setImage(null);
      
      await onAdd();
     
    } catch (error) {
      console.error('Failed to create dining table:', error);
      setError('Failed to create dining table. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus /> Add Dining</Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Dining</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 py-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              placeholder="Enter name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <Input 
              id="image" 
              type="file" 
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}