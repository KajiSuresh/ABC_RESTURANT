
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, XIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AddMenu() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="gap-2"> <Plus /> Add Menu</Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add New Menu</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Price</Label>
              <Input id="email" type="text" placeholder="Enter Price" />
            </div>
          </div>
          <div className="space-y-2">
              <Label htmlFor="email">Category</Label>
              <Input id="email" type="text" placeholder="Enter Category" />
            </div>
          <div className="space-y-2">
            <Label htmlFor="message">Discribtion</Label>
            <Textarea id="message" placeholder="Enter Discribtion" className="min-h-[100px]" />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}