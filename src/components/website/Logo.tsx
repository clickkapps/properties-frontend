import {brandLogoImg} from "@/assets";
import {NavLink} from "react-router";

function Logo() {
    return (
        <NavLink to="/">
            <div className='flex justify-center items-center space-x-2'>
                <img src={brandLogoImg} className='w-[50px] h-[50px]' alt="Company logo"/>
                <span className='text-white font-bold font-[Inter] text-xl'>GHANA MLS</span>
            </div>
        </NavLink>
    )
}

export default Logo;