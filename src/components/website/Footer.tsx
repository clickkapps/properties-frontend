import { Globe } from 'lucide-react';
import {shellImg} from "@/assets";
import {Link} from "react-router";

function Footer({collapse = false, bgColor, className}: {collapse?: boolean, bgColor?: string, className?: string}) {
    return (
        <>
            <div className={`${bgColor || 'bg-black'} text-white ${className}`}>


                {!collapse &&
                    <div className="container mx-auto px-6 py-20">

                    <div className="flex flex-col  md:flex-row justify-between gap-10">

                        <ul className="flex flex-col decoration-0 gap-4 ">
                            <li className='tracking-tight hover:text-gray-300 text-sm mb-4 font-bold'>Quick
                                links
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>
                                <Link to="/account/agent">My account</Link>
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>
                                <Link to="/properties/sale">Properties For Sale</Link>
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>
                                <Link to="/properties/sale">Properties For Rent</Link>
                            </li>
                        </ul>

                        <ul className="flex flex-col decoration-0 gap-4 ">
                            <li className='tracking-tight hover:text-gray-300 text-sm mb-4 font-bold'>Get in touch
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>Email: support@guidem.services
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>Tel: +233 24 345 6789
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'><a target="_blank" href="https://blog.propertiespark.com">Blog: blog.propertiespark.com</a> </li>
                        </ul>

                        <ul className="flex flex-col decoration-0 gap-4 items-start">
                            <li className='tracking-tight hover:text-gray-300 text-sm mb-4 font-bold'>Address
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>Accra
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>East Legon Apartments
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>Accra</li>
                        </ul>
                    </div>

                </div>
                }


                <div className="h-[1px] bg-slate-700"></div>

                {/* Bottom Footer */}
                <div className="container mx-auto flex flex-col md:flex-row justify-between px-6 py-4 gap-4">
                    <div className="inline-flex gap-8">
                        {/*<img src={GuideMeLogoWhite} alt="GuidMe Logo" className='-mt-1'/>*/}
                        <div className='flex justify-center items-center space-x-1'>
                            <img src={shellImg} className='w-[25px] h-[25px]' alt="Company logo"/>
                            <span className='italic text-white'>Name</span>
                        </div>
                        <span>©</span>
                        <span className="font[Inter]">2025</span> Properties, Inc.
                    </div>
                    <div className="hidden md:inline-flex gap-4 ">
                        <Globe/>
                        <p>Ghana</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;