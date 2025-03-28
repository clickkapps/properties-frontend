import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HomeIcon} from "lucide-react";
import {useNavigate} from "react-router";

function ErrorPage() {

    const navigate = useNavigate();
    // const error = useRouteError()
    // console.log("error", error)

    return (
        <div className="md:bg-gray-100 bg-white overflow-y-auto">
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-4 md:h-16"></div>

            <div className="flex justify-center mt-12 h-[50vh]">
                <div className="bg-white p-8 w-full md:w-[500px] space-y-8">
                    <h2 className="text-center text-lg font-semibold">Oops! Wrong Location</h2>
                    <p className="text-center">Looks like you're in the wrong place. Check the link in your browser again or simply click on the button below to go home</p>
                   <div className="flex flex-row justify-center">
                       <Button onClick={() => navigate('/')} ><HomeIcon /> Go Home</Button>
                   </div>
                </div>
            </div>

            <div className="h-4 md:h-16"></div>
            <Footer/>
        </div>
    )
}

export default ErrorPage