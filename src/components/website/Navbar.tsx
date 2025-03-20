import {Button} from "@/components/ui/button.tsx";
import {ReactNode, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router";
import Logo from "@/components/website/Logo.tsx";
import { Menu, X } from 'lucide-react'
import {WebsiteMenuLinks} from "@/utils/website.constants.ts";
import {MenuLink} from "@/types/website.types";

const defaultLinks = WebsiteMenuLinks.map((link: MenuLink) => {
  return (
      <li className="hover:text-white/70" key={link.url}>
        { !link.external && <Link to={link.url} className="block px-4 py-4 "> { link.title } </Link> }
        {link.external && <a href={link.url} className="block px-4 py-4"> { link.title } </a>}
      </li>
  )
});

const Navbar = ({ animate = true, className, children, rightMenuLinks } : { className? : string, animate?: boolean, children?: ReactNode, rightMenuLinks?: ReactNode }) => {

  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  // Default if no links are provided
  // const defaultLinks = <ul className='flex flex-col md:flex-row text-white md:space-x-6 space-y-2 divide-y-1 divide-amber-500'>
  //
  // </ul>


  const defaultRightMenuLinks = (
      <ul className="flex flex-row gap-2 py-4 md:py-0 mx-4">
        <Button className="w-full md:w-auto rounded-none md:rounded" onClick={() => {
          navigate("/signup")
        }}>Register</Button>
        <Button variant={'secondary'} className="w-full md:w-auto rounded-none md:rounded" onClick={() => {
          navigate("/login")
        }}>Login</Button>
        {/*<Button variant="link" className="text-white" onClick={() => {*/}
        {/*  navigate("/office")*/}
        {/*}}>Admin</Button>*/}
        {/*<Button variant="link" className="text-white" onClick={() => {*/}
        {/*  navigate("/")*/}
        {/*}}>Logout</Button>*/}
      </ul>
  )


  return (
      <nav
          className={`${!showMobileMenu ? (scrolled ? ` ${animate ? 'bg-black animated fadeInDown' : ''}` : '') : 'bg-black'} ${className || ''} md:px-0`}>
          <>
            {/* Desktop */}
            <div className={`container mx-auto flex justify-between items-center py-2 px-2 md:px-0`}>
              {/* Left Menu Items */}
              <Logo />

              {/* Middle Menu Items*/}
              {
                  <ul className="hidden md:flex md:flex-row text-white space-x-4 ">
                    { children || defaultLinks }
                  </ul>
              }

              {/* Right Menu Items*/}
              <>

                <div className="hidden md:flex">
                  { rightMenuLinks || defaultRightMenuLinks }
                </div>

                <div className="block md:hidden px-2">
                  { showMobileMenu ? <X className="text-white" onClick={() => { setShowMobileMenu(false)}}/> : <Menu className="text-white" onClick={() => { setShowMobileMenu(true)} }/>
                  }
                </div>

              </>

            </div>
            {/* mobile menu opened */}
            {
                showMobileMenu && <div className="absolute block md:hidden h-[50vh] w-full bg-black">

                  <ul className="text-white divide-y-[1px] divide-slate-800">
                    {children || defaultLinks}

                  </ul>
                  { defaultRightMenuLinks }


                </div>
            }
          </>
      </nav>
  )
}

export default Navbar