import { PropertyModel } from "@/lib/types";

type Props = {
  property: PropertyModel;
};

const PropertyDetailsTable = ({ property }: Props) => {
  return (
    <div className="border p-4 ">

      {/* Property Details Table */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0 text-center">

        {/* Row 1 */}
        <div className="p-3 bg-[#F5F5F5] border font-medium">
          Bedroom: <span className="font-normal">{property.rooms ?? "N/A"}</span>
        </div>
        <div className="p-3 bg-[#F5F5F5] border font-medium">
          Type: <span className="font-normal">{property.category?.title ?? "N/A"}</span>
        </div>
        <div className="p-3 bg-[#F5F5F5] border font-medium hidden md:block">
          Added: <span className="font-normal">{property.createdAt  ? new Date(property.createdAt).toLocaleDateString() : "N/A"}</span>
        </div>

        {/* Row 2 */}
        <div className="p-3 border font-medium">
          Bathroom: <span className="font-normal">{property.specifications?.find(s => s.title === "Bathroom")?.value ?? "N/A"}</span>
        </div>
        <div className="p-3 border font-medium">
          Toilet: <span className="font-normal">{property.specifications?.find(s => s.title === "Toilet")?.value ?? "N/A"}</span>
        </div>
        <div className="p-3 border font-medium hidden md:block">
          Address: <span className="font-normal">{property.address ?? "N/A"}</span>
        </div>

        {/* Row 3 */}
        <div className="p-3 bg-[#F5F5F5] border font-medium">
          Total Area: <span className="font-normal">{property.specifications?.find(s => s.title === "Total Area")?.value ?? "N/A"}</span>
        </div>
        <div className="p-3 bg-[#F5F5F5] border font-medium">
          Reference: <span className="font-normal">{property.id}</span>
        </div>
        <div className="p-3 bg-[#F5F5F5] border font-medium hidden md:block">
          Garage: <span className="font-normal">{property.specifications?.find(s => s.title === "Garage")?.value ?? "N/A"}</span>
        </div>
      </div>

      {/* Description */}
      <div className="border mt-4">
        <div className="bg-[#F5F5F5] px-3 py-2 font-bold rounded-t-md">Description</div>
        <div className="p-4 text-sm md:text-base">
          <p className="font-medium">{property.description ?? "No description provided."}</p>
          <p className="font-medium mt-2">
            Price: <span className="font-medium">{property.currency ?? "GHS"} {property.amount?.toLocaleString() ?? "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsTable;
