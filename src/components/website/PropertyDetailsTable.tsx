const PropertyDetailsTable = () => {
  return (
    <div className="border p-4 ">

      {/* Property Details Table */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0 text-center">

        {/* Row 1 */}
        <div className="p-3 bg-[#F5F5F5] border font-medium">Bedroom: <span className="font-normal">5</span></div>
        <div className="p-3 bg-[#F5F5F5] border  font-medium">Type: <span className="font-normal">House</span></div>
        <div className="p-3 bg-[#F5F5F5] border  font-medium hidden md:block">Added: <span className="font-normal">17th Jan. 2025</span></div>

        {/* Row 2 */}
        <div className="p-3 border font-medium">Bathroom: <span className="font-normal">6</span></div>
        <div className="p-3 border font-medium">Toilet: <span className="font-normal">5</span></div>
        <div className="p-3 border font-medium hidden md:block">Address: <span className="font-normal">Labadi</span></div>

        {/* Row 3 */}
        <div className="p-3 bg-[#F5F5F5] border  font-medium">Total Area: <span className="font-normal">250 sqm</span></div>
        <div className="p-3 bg-[#F5F5F5] border  font-medium">Reference: <span className="font-normal">44258612</span></div>
        <div className="p-3 bg-[#F5F5F5] border  font-medium hidden md:block">Garage: <span className="font-normal">2</span></div>
      </div>

      {/* Description */}
      <div className="border  mt-4">
        <div className="bg-[#F5F5F5] px-3 py-2 font-bold rounded-t-md">Description</div>
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
