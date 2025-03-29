import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";

function AddListingPage() {
  return (
    <div className="container mx-auto">
      
      <h2 className="text-2xl font-semibold mb-6">Add Listings</h2>

      {/* File Attachment */}
      <div className="border bg-white px-10 py-6 mb-10">
      <div>
      <h2 className="text-xl font-semibold mb-6"> Add Property Photo </h2>
        <h3 className="text-md font-medium mb-2">File Attachment</h3>

        {/* Uploaded File List */}
        <div className="space-y-4 mb-4">
          <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
            <p className="text-sm text-gray-700">PropertyImage_01.jpg</p>
            <X className="w-4 h-4 text-gray-600 cursor-pointer" />
          </div>

          <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
            <p className="text-sm text-gray-700">PropertyImage_01.jpg</p>
            <X className="w-4 h-4 text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Upload File Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button>
            <Plus className="w-5 h-5" />
            Upload File
          </Button>
          <p className="text-sm text-gray-500">Upload file.jpg, .png, .mp4</p>
        </div>
      </div>

      {/* Property Information */}
      <h3 className="text-xl font-semibold mb-6">Property Information</h3>
      <form className="space-y-6">
        {/* Property Name & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">Property Name</label>
            <Input placeholder="name" />
          </div>
          <div>
            <label className="block text-sm mb-1">Property Address</label>
            <Input placeholder="name" />
          </div>
        </div>

        {/* Price, Bedrooms, Bathrooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm mb-1">Price</label>
            <Input placeholder="$5000000" />
          </div>
          <div>
            <label className="block text-sm mb-1">Bedrooms</label>
            <Input placeholder="5" />
          </div>
          <div>
            <label className="block text-sm mb-1">Bathrooms</label>
            <Input placeholder="5" />
          </div>
        </div>

        {/* Property For, Category, Garages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm mb-1">Property For</label>
            <Input placeholder="Sale" />
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <Input placeholder="Apartment" />
          </div>
          <div>
            <label className="block text-sm mb-1">Garages</label>
            <Input placeholder="2" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Property Description</label>
          <Textarea placeholder="name" className="min-h-[120px]" />
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex justify-end gap-4 pt-6 pb-6">
          <Button
            type="submit"
            className="bg-[#000050] hover:bg-[#0D0B66]] text-white px-6"
          >
            Submit Property
          </Button>
          <Button variant="outline" className="border border-gray-400 text-black px-6">
            Cancel
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default AddListingPage;
