import { PropertyModel } from "@/lib/types";

type Props = {
  property: PropertyModel;
};

const PropertyDetailsTable = ({ property }: Props) => {
  const { address, region, rooms, amount, currency, category, createdAt, description, specifications } = property;

  return (
    <div className="border p-4">
      {/* Property Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0 text-center">

        <div className="p-3 bg-[#F5F5F5] border font-medium">
          Type: <span className="font-normal">{category?.title ?? "N/A"}</span>
        </div>

        <div className="p-3 bg-[#F5F5F5] border font-medium">
          Location: <span className="font-normal">{region ?? "N/A"}</span>
        </div>

        <div className="p-3 bg-[#F5F5F5] border font-medium">
          Added: <span className="font-normal">
            {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </span>
        </div>

        <div className="p-3 border font-medium">
          Address: <span className="font-normal">{address ?? "N/A"}</span>
        </div>

        <div className="p-3 border font-medium">
          Bedroom(s): <span className="font-normal">{rooms ?? "N/A"}</span>
        </div>

        <div className="p-3 border font-medium">
          Price: <span className="font-normal">{currency} {amount}</span>
        </div>
      </div>

      {/* Description Section */}
      {description && (
        <div className="border mt-4">
          <div className="bg-[#F5F5F5] px-3 py-2 font-bold rounded-t-md">Description</div>
          <div className="p-4 text-sm md:text-base">
            <p className="font-medium">{description}</p>
          </div>
        </div>
      )}

      {/* Specifications Section */}
      {specifications && specifications.length > 0 && (
        <div className="border mt-4">
          <div className="bg-[#F5F5F5] px-3 py-2 font-bold rounded-t-md">Additional Info</div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
            {specifications.map((spec, index) => (
              <div key={index} className="font-medium">
                {spec.title}: <span className="font-normal">{spec.value ?? "N/A"}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsTable;
