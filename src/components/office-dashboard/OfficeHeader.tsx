import OfficeTopBar from "@/components/office-dashboard/OfficeTopBar.tsx";
import OfficeNavbar from "@/components/office-dashboard/OfficeNavbar.tsx";

function OfficeHeader() {

    return (
        <div id="fixed-header" className="w-full">
            <OfficeNavbar />
            <OfficeTopBar/>
        </div>

    )

}

export default OfficeHeader;