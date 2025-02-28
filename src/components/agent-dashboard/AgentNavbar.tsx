import Navbar from "@/components/website/Navbar.tsx";
import {Link} from "react-router";

const AgentNavbar = () => {

  return (
      <Navbar className="fixed bg-black w-full z-20 " animate={false}>
        <ul className='hidden  md:flex text-white space-x-6'>
          <li>
            <Link to={'/properties/sale'}> My listings </Link>
          </li>
          <li>
            <Link to={'/properties/rent'}> Reviews </Link>
          </li>
          <li>
            <Link to="/agents">Membership</Link>
          </li>
        </ul>
      </Navbar>
  )
}

export default AgentNavbar