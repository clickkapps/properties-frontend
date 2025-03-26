import { Notebook } from "lucide-react";

const TotalPendingPaymentsCard = () => {
  return (
    <div className="border rounded-md p-6 w-full h-32 bg-white text-center flex flex-col justify-between items-center">
      <div className="mb-2">
      <Notebook className="w-7 h-7 text-gray-600" />
      </div>
      
      <p className="text-gray-600">Total Pending Payments</p>
      <p className="text-black font-semibold text-lg">15000</p>
    </div>
  )
}

export default TotalPendingPaymentsCard