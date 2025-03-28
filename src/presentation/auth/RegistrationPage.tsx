import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
import {Input} from "@/components/ui/input.tsx";

function RegistrationPage() {
    return (
        <div className="md:bg-gray-100 bg-white overflow-y-auto">
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-4 md:h-16"></div>

            <div className="flex items-center justify-center mt-12">
                <div className="bg-white p-8 w-full md:w-[500px]">
                    <h2 className="text-center text-lg font-semibold">Complete your details</h2>

                    <form action="" className="my-12 flex flex-col gap-8">
                        <div>
                            <label className="block text-sm  mb-1">First name</label>
                            <Input
                                placeholder="Enter first name here"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm  mb-1">Last name</label>
                            <Input
                                placeholder="Enter last name here"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm  mb-1">Email address</label>
                            <Input
                                placeholder="Enter email here"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm  mb-1">Phone number</label>
                            <Input
                                placeholder="Enter phone here"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                        </div>

                    </form>

                </div>
            </div>

            <div className="h-4 md:h-16"></div>
            <Footer/>
        </div>
    )
}

export default RegistrationPage