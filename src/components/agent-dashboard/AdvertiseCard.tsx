import { Plus } from "lucide-react";

const AdvertiseCard = () => {
  return (
    <div className="bg-[#893dc0] border rounded-md p-6 w-60 text-white flex flex-col justify-between h-32">

        <Plus className="w-7 h-7 rounded-full border-2 border-white text-white" />    

      <p className="text-lg font-medium">Advertise here</p>
    </div>
  );
};

export default AdvertiseCard;
