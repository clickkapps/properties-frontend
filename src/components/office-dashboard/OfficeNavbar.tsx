import Navbar from "@/components/website/Navbar.tsx";
import {Link} from "react-router";

function OfficeNavbar() {
    return (
        <Navbar className="fixed bg-[#020050] w-full z-20" animate={false} rightMenuLinks={<></>}>
            <ul className='hidden md:flex text-white space-x-6'>
                <li>
                    <Link to={'/office/settings'}> Admin Settings </Link>
                </li>
                <li>
                    <Link to={'/office/notifications'}> Notifications </Link>
                </li>
            </ul>
        </Navbar>
    )
}

export default OfficeNavbar;