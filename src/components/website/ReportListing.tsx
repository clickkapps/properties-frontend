import { reportIcon } from "@/assets"

const ReportListing = () => {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md m-4 p-3 gap-3 cursor-pointer hover:shadow-md">
        <img 
        src={reportIcon} 
        alt="report" 
        className="w-8 h-8"
        />
        <span className="text-[#E50005] font-medium text-base">Report Listing</span>
    </div>
  )
}

export default ReportListing