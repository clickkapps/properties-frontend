import Navbar from "@/components/website/Navbar.tsx";
import {Link} from "react-router";

function OfficeNavbar() {
    return (
        <Navbar className="fixed bg-black w-full z-20 " animate={false}>
            <ul className='hidden  md:flex text-white space-x-6'>
                <li>
                    <Link to={'/properties/sale'}> Properties </Link>
                </li>
                <li>
                    <Link to={'/properties/rent'}> Agents </Link>
                </li>
                <li>
                    <Link to="/agents"> Membership </Link>
                </li>
            </ul>
        </Navbar>
    )
}

export default OfficeNavbar;