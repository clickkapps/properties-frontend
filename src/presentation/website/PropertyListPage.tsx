import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
// import HeaderImageItem1 from "@/assets/images/header-image-item-1.svg";
import Searchbar from "@/components/website/Searchbar.tsx";
import {useParams} from "react-router";
import PropertyListItem from "@/components/website/PropertyListItem.tsx";

function PropertyListPage() {

    const params = useParams();

    return (
        <>
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-16 md:h-16 bg-black"></div>
            <div className="h-[20vh] relative bg-[#F5F5F5]">
                {/*<img src={HeaderImageItem1} alt="" className="w-full object-cover h-[20vh] absolute"/>*/}
                <div className="absolute flex justify-center items-center w-full h-full">
                    {/*<Searchbar className="animated fadeInUp animate__delay-5s hidden md:flex border shadow" />*/}
                    <Searchbar className="animated fadeInUp animate__delay-5s shadow" />
                </div>

            </div>

            <div className="container mx-auto">

                <h2 className="font-normal text-xl md:text-3xl py-6 text-center">
                    Properties For <span className="capitalize">{ params.type || 'Sale' }</span>
                </h2>

                {/*<div className="h-16 md:h-16 "></div>*/}

                <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-10 mx-5 md:mx-0">
                    {Array.from({length: 10}).map((_, index) => {
                        return (
                            <PropertyListItem key={"item-" + index}/>
                        )
                    })}
                </div>

            </div>


            <div className="h-20"></div>
            <Footer/>
        </>
    )
}

export default PropertyListPage