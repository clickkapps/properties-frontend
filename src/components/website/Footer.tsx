import { Globe } from 'lucide-react';
import {shellImg} from "@/assets";

function Footer() {
    return (
        <>
            <div className="bg-black text-white">


                <div className="container mx-auto px-6 py-20">

                    <div className="flex flex-row justify-between">

                        <ul className="flex flex-col decoration-0 gap-4 ">
                            <li className='tracking-tight hover:text-primary hover:font-bold text-sm mb-4 font-bold'>Quick
                                links
                            </li>
                            <li className='tracking-tight hover:text-primary hover:font-bold text-sm'>Consultants
                            </li>
                            <li className='tracking-tight hover:text-primary hover:font-bold text-sm'>Clients
                            </li>
                            <li className='tracking-tight hover:text-primary hover:font-bold text-sm'>About us</li>
                        </ul>

                        <ul className="flex flex-col decoration-0 gap-4 ">
                            <li className='tracking-tight hover:text-primary text-sm mb-4 font-bold'>Get in touch
                            </li>
                            <li className='tracking-tight hover:text-primary text-sm'>Email: support@guidem.services
                            </li>
                            <li className='tracking-tight hover:text-primary text-sm'>Tel: +1709333333
                            </li>
                            <li className='tracking-tight hover:text-primary text-sm'> Website: guideme.services </li>
                        </ul>

                        <ul className="flex flex-col decoration-0 gap-4 items-start">
                            <li className='tracking-tight hover:text-primary text-sm mb-4 font-bold'>Address
                            </li>
                            <li className='tracking-tight hover:text-primary text-sm'>St. John's
                            </li>
                            <li className='tracking-tight hover:text-primary text-sm'>Newfoundland & Labrador
                            </li>
                            <li className='tracking-tight hover:text-primary text-sm'>Canada</li>
                        </ul>
                    </div>

                </div>

                <div className="h-[1px] bg-slate-700"></div>

                {/* Bottom Footer */}
                <div className="container mx-auto flex justify-between px-6 py-4">
                    <div className="inline-flex gap-8">
                        {/*<img src={GuideMeLogoWhite} alt="GuidMe Logo" className='-mt-1'/>*/}
                        <div className='flex justify-center items-center space-x-2'>
                            <img src={shellImg} className='w-[25px] h-[25px]' alt="Company logo"/>
                            <span className='italic text-white'>Name</span>
                        </div>
                        © <span className="font[Inter]">2025</span> GuideMe, Inc.
                    </div>
                    <div className="inline-flex gap-4">
                        <Globe/>
                        <p>Canada</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;