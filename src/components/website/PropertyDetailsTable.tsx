const PropertyDetailsTable = () => {
  return (
    <div className="border shadow-sm p-4 bg-white">
      <h2 className="text-2xl font-medium mb-6 text-left">Property Details</h2>

      {/* Property Details Table */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-gray-300 text-center">

        {/* Row 1 */}
        <div className="p-3 bg-[#d9d9d9] border border-gray-400 font-medium">Bedroom: <span className="font-normal">5</span></div>
        <div className="p-3 bg-[#d9d9d9] border border-gray-400 font-medium">Type: <span className="font-normal">House</span></div>
        <div className="p-3 bg-[#d9d9d9] border border-gray-400 font-medium hidden md:block">Added: <span className="font-normal">17th Jan. 2025</span></div>

        {/* Row 2 */}
        <div className="p-3 border border-gray-400 font-medium">Bathroom: <span className="font-normal">6</span></div>
        <div className="p-3 border border-gray-400 font-medium">Toilet: <span className="font-normal">5</span></div>
        <div className="p-3 border border-gray-400 font-medium hidden md:block">Address: <span className="font-normal">Labadi</span></div>

        {/* Row 3 */}
        <div className="p-3 bg-[#d9d9d9] border border-gray-400 font-medium">Total Area: <span className="font-normal">250 sqm</span></div>
        <div className="p-3 bg-[#d9d9d9] border border-gray-400 font-medium">Reference: <span className="font-normal">44258612</span></div>
        <div className="p-3 bg-[#d9d9d9] border border-gray-400 font-medium hidden md:block">Garage: <span className="font-normal">2</span></div>
      </div>

      {/* Description */}
      <div className="border border-gray-400 mt-4">
        <div className="bg-[#d9d9d9] px-3 py-2 font-bold rounded-t-md">Description</div>
        <div className="p-4 text-sm md:text-base">
          <p className="font-medium">Executive 5 - bedroom house for sale at Labadi</p>
          <p className="font-medium mt-2">Price: <span className="font-medium">$500,000</span></p>
          <p className="font-medium mt-2">With 2 - Boys Quarters</p>
          <p className="font-medium mt-2">Fully fitted kitchen</p>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailsTable;
