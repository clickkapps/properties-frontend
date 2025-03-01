import Navbar from "@/components/website/Navbar.tsx";
import {Link} from "react-router";
import AgentTopBar from "@/components/agent-dashboard/AgentTopBar.tsx";

const AgentHeader = () => {

  return (
      <div id="fixed-header">
          <Navbar className="fixed bg-black w-full z-30 " animate={false}>
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

          <AgentTopBar/>
      </div>

  )
}

export default AgentHeader