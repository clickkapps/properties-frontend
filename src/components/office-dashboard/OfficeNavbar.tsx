import Navbar from "@/components/website/Navbar.tsx";
import {Link} from "react-router";

function OfficeNavbar() {
    return (
        <Navbar className="fixed w-full z-20" animate={false} bgColor='bg-[#020050]'>
            <li>
                <Link to={'/office/settings'} className="block px-4 py-4 "> Admin Settings </Link>
            </li>
            <li>
                <Link to={'/office/notifications'} className="block px-4 py-4 "> Notifications </Link>
            </li>
        </Navbar>
    )
}

export default OfficeNavbar;