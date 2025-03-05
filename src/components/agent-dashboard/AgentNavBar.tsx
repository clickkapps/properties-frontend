import {Link} from "react-router";
import Navbar from "@/components/website/Navbar.tsx";

function AgentNavBar() {
    return (
        <Navbar className="fixed bg-black w-full z-30 " animate={false}>
            <ul className='hidden  md:flex text-white space-x-6'>
                <li>
                    <Link to={'/agents/sale'}> My listings </Link>
                </li>
                <li>
                    <Link to={'/agents/rent'}> Reviews </Link>
                </li>
                <li>
                    <Link to="/agents">Membership</Link>
                </li>
            </ul>
        </Navbar>
    )
}

export default AgentNavBar;