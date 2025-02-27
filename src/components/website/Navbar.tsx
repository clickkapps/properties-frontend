import { shellImg } from '@/assets'
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router";

const Navbar = ({ animate = true, className } : { className? : string, animate?: boolean }) => {

  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 0); // Updates on scroll and removes when at top
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }

  }, []);

  console.log("Nav bar rendered")

  return (
    <nav className={ `${scrolled ? `bg-black ${animate ? 'animated fadeInDown' : ''}` : '' } ${className || ''} px-4 md:px-0` } >
      <div className={`container mx-auto flex justify-between items-center py-2`}>
        <NavLink to="/">
          <div className='flex justify-center items-center space-x-2'>
            <img src={shellImg} className='w-[50px] h-[50px]' alt="Company logo"/>
            <span className='italic text-white'>Name</span>
          </div>
        </NavLink>
        <ul className='hidden  md:flex text-white space-x-6'>
          <li>
            <Link to={'/properties/sale'}> For Sale </Link>
          </li>
          <li>
            <Link to={'/properties/rent'}> For Rent </Link>
          </li>
          <li>
            <Link to="/agents">Agents</Link>
          </li>
          {/*<li><a href="#developers">Developers</a></li>*/}
          {/*<li><a href="#advice">Advice</a></li>*/}
          <li><a href="#blog">Blog</a></li>
        </ul>

        <div className="flex">
          <Button className="" onClick={ () => { navigate("/signup") } } >Register</Button>
          <Button variant="link" className="text-white" onClick={ () => { navigate("/login") } } >Login</Button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar