
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, XIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


export default function AddDinning() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="gap-2"> <Plus /> Add Dinning</Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Dinning</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 py-6">
          
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter name" />
            </div>
            
        
          <div className="grid gap-2">
          <Label htmlFor="image">Image</Label>
          <Input id="image" type="file" />
        </div>
        
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}