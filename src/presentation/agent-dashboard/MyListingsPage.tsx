import ManagePropertiesList from "@/components/shared-dashboard/ManagePropertiesList.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";

function MyListingsPage() {

    const navigate = useNavigate();

    return (
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-8">
                <h3 className="text-2xl font-semibold">My Listings</h3>
                <Button className="hidden md:block" variant="outline" onClick={() => navigate("/account/agent/add-listing")}> Add New Property
                     </Button>
            </div>
            <ManagePropertiesList/>
        </div>
    )
}

export default MyListingsPage