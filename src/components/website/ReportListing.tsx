// import { reportIcon } from "@/assets"

import {Button} from "@/components/ui/button.tsx";
import {MessageCircleWarning} from "lucide-react";

const ReportListing = () => {
  return (
    <Button variant="outline" className="w-full py-6 text-red-700">  <MessageCircleWarning /> Report this listing</Button>
  )
}

export default ReportListing