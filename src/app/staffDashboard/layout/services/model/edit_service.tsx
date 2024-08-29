
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil, Plus, XIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


export default function EditService() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant="outline" size="icon" className="mr-2">
                    <Pencil className="h-4 w-4" />
                  </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter Service name" />
            </div>
            <div className="space-y-2">

              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" />

            </div>
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