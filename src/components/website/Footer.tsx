import { Globe } from 'lucide-react';
import {brandLogoImg} from "@/assets";
import {Link, useRouteLoaderData} from "react-router";

function Footer({collapse = false, bgColor, className}: {collapse?: boolean, bgColor?: string, className?: string}) {

    const { support } = useRouteLoaderData('index')

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
                            <li className='tracking-tight hover:text-gray-300 text-sm'>Email: { support.contactEmail }
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>Tel: { support.contactPhone }
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'><a target="_blank" href="https://blog.propertiespark.com">Blog: blog.propertiespark.com</a> </li>
                        </ul>

                        <ul className="flex flex-col decoration-0 gap-4 items-start">
                            <li className='tracking-tight hover:text-gray-300 text-sm mb-4 font-bold'>Address
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>{ support.contactRegion }
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>{ support.contactAddress }
                            </li>
                            <li className='tracking-tight hover:text-gray-300 text-sm'>{ support.contactCountry }</li>
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
                            <img src={brandLogoImg} className='w-[25px] h-[25px]' alt="Company logo"/>
                            <span className='font-bold text-white'>Properties Park</span>
                        </div>
                        <span>©</span>
                        <span className="font[Inter]">2025</span> Properties Park, Inc.
                    </div>
                    <div className="hidden md:inline-flex gap-4 ">
                        <Globe/>
                        <p>Canada</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;