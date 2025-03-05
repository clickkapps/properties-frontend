import { Check } from "lucide-react"
import { Button } from "../ui/button"

const MembershipCard = () => {
  return (
    <div className="container mx-auto w-full max-w-5xl  border bg-white p-6">
      <div className="flex items-center justify-center px-6">
        {/* left section */}
      <div className="w-1/2 space-y-2">
        <h3 className="text-black font-medium mb-2">Current Plan (Standard Plan)</h3>
        <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Check className="p-2 rounded-full border-2 border-black w-7 h-7 bg-transparent" />
                <p>List your home</p>
              </div>
            ))}
          </div>
      </div>
            {/* Divider */}
      <div className="h-24 w-px bg-gray-200"></div>

      <div className="flex justify-ceter items-center gap-4">
          <h3 className="text-5xl font-[inter]">$50</h3>
          <div className="flex flex-col items-center justify-center space-y-5">
            <h3 className=" text-black font-medium">Monthly Plan</h3>
            <p className="text-sm">Your subscription renews on <span className="font-[inter] font-medium">12th Jan 2025</span></p>
            <Button variant="destructive">
              Cancel Current Plan
            </Button>
          </div>
      </div>
      </div>
      
    </div>
  )
}

export default MembershipCard