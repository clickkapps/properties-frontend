import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";

function AddListingOptionPage() {

    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-2xl font-semibold"> List Options Page</h2>
            <p className="py-4"> Listing options should be here </p>
            <Button className="my-4" onClick={() => {
                navigate('/account/agent/add-listing')
            }}> Go to Add Listing Page</Button>
        </div>

    )
}

export default AddListingOptionPage;