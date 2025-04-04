import { Button } from "@/components/ui/button.tsx";
import {AlertCircle, CircleCheck} from "lucide-react";
import { useNavigate } from "react-router";

function AddListingOptionPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4"> Add Listings</h2>
      <div className="bg-white border px-10 py-6">
        <p className="py-4 text-sm font-medium">
          {" "}
          Do you want to use our Professional Photography Services to upload
          your <br /> property?{" "}
        </p>

        {/* Option 1 - Yes */}
        <div className="border bg-[#F5F5F5] p-8 max-w-3xl rounded-sm mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Yes the office should upload high quality listing for me</p>
              <p className="text-[13px] text-green-500 flex items-start gap-1 mt-1">
                <CircleCheck className="w-4 h-4  hidden md:block"/>
                <span>Recommended</span>
              </p>
            </div>
            <CircleCheck className="w-6 h-6 fill-[#000050] stroke-white"/>
          </div>
        </div>

        {/* Option 2 - No */}
        <div className="border p-8 max-w-3xl rounded-sm mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
              No, I will upload it my self
              </p>
              <p className="text-[13px] text-red-600 flex items-start gap-1 mt-1">
                <AlertCircle className="w-4 h-4 text-red-500 hidden md:block" />
                <span>Note : Would require approval from our office</span>
              </p>
            </div>
            <div className="w-5 h-5 border border-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Confirm & Cancel Buttons */}
        <div className="flex justify-center gap-4 max-w-3xl mt-8 mb-16">
          <Button
            className="bg-[#000050] hover:bg-[#0D0B66] my-4"
            onClick={() => {
              navigate("/account/agent/add-listing");
            }}
          >
            {" "}
            Confirm
          </Button>

          <Button
            variant="outline"
            className="text-black my-4 border border-gray-400"
          >
            {" "}
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddListingOptionPage;
