import { Notebook } from "lucide-react";

const OfficeTotalOrders = () => {
  return (
    <div className="border rounded-md p-6 w-full h-32 bg-white text-center flex flex-col justify-between items-center">
      <div className="mb-2">
        <Notebook className="w-7 h-7 text-gray-600" />
      </div>

      <p className="text-gray-600">Total Orders</p>
      <p className="text-black font-semibold text-lg font-[inter]">354</p>
    </div>
  );
};

export default OfficeTotalOrders;
