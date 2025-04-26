import ManagePropertiesList from "@/components/shared-dashboard/ManagePropertiesList.tsx";

function MyListingsPage() {

    return (
        <div className="container mx-auto">
            <h3 className="text-xl font-semibold mb-4">My Listings</h3>
            <ManagePropertiesList/>
        </div>
    )
}

export default MyListingsPage