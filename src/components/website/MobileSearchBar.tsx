import { Search } from "lucide-react";

const MobileSearchBar = () => {
  return (
    <div 
      className="flex items-center justify-between bg-white rounded-full px-4 py-3 shadow-md w-[250px] mx-auto cursor-pointer"
    >
      <Search className="text-gray-600 w-5 h-5" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none "
      />
    </div>
  )
}

export default MobileSearchBar;
