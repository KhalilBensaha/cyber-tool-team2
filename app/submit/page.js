import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function submit() {
  const categories = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"]
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <h1 className='text-center text-white text-6xl pt-20'>
        Submit a tool
      </h1>
      <h5 className='text-center text-gray-400 py-10'>Help us grow our curated library of cybersecurity tools</h5>
      <div className="flex justify-center">
        <Card className="w-full max-w-xl bg-[#182138]">
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2 text-white">
                  <Label htmlFor="tool">Tool name</Label>
                  <Input
                    id="tool"
                    type="text"
                    placeholder="e.g. Nmap"
                    required
                  />
                </div>
                <div className="grid gap-2 text-white">
                  <div className="flex items-center">
                    <Label htmlFor="github">GitHub URL</Label>
                  </div>
                  <Input id="gihub" type="text" placeholder="https://github.com/user/repo" required />
                </div>
                <div className="grid gap-3 text-white">
                  <Label htmlFor="category">Category</Label>
                  <Select id="category">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="bg-[#182138] text-white">
                        {categories.map((value, key) => (
                          <SelectItem value={value}>{value}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full gap-3 text-white">
                  <Label htmlFor="description">Short description</Label>
                  <Textarea placeholder="provide a brief description of the tool" id="description" required />
                </div>
                <div className="grid w-full gap-3 text-white">
                  <Label htmlFor="instructions">Usage instruction (Optional)</Label>
                  <Textarea placeholder="provide intructions on how to use the tool" id="instructions" />
                </div>
                <div className="grid w-full gap-3 text-white">
                  <Label htmlFor="recources">Extra resources/links (Optional)</Label>
                  <Textarea placeholder="Add any extra resources or links related to the tool" id="recources" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button variant="outline" type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">
              Submit for review
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
