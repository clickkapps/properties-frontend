import { X, Search } from "lucide-react";

const SearchResults = () => {
  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-md p-5 shadow-lg rounded-xl bg-white relative">
        
        {/* Close Button */}
        <button className="absolute top-3 left-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <X className="w-5 h-5" />
        </button>
        
        {/* Fields */}
        <div className="mt-10 space-y-3">
          <p className="p-3 border shadow-sm rounded-lg cursor-pointer w-full">Location</p>
          <p className="p-3 border shadow-sm rounded-lg cursor-pointer w-full">Category</p>
          <p className="p-3 border shadow-sm rounded-lg cursor-pointer w-full">Bedroom</p>
          <p className="p-3 border shadow-sm rounded-lg cursor-pointer w-full">Price</p>
        </div>
        
        {/* Bottom Buttons */}
        <div className="flex justify-between items-center mt-5">
          <button className="font-semibold underline">Clear all</button>
          <button className="flex items-center gap-2 bg-[#e50005] text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700">
            <Search className="w-5 h-5" /> Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
