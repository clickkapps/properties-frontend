import Navbar from "@/components/website/Navbar.tsx";
import HeaderImageItem1 from "@/assets/images/header-image-item-1.svg";
import Searchbar from "@/components/website/Searchbar.tsx";
// import FeaturedImages from "@/components/website/FeaturedImages.tsx";
import FeaturedHeaderImages from "@/components/website/FeaturedHeaderImages.tsx";

function Header() {
    return (
        <>
            <Navbar  className="fixed w-full z-20"/>
            <div className="h-screen w-full">

                <div className="h-[80%] w-full">
                    <div className={`h-full w-full bg-cover bg-center relative`}
                         style={{backgroundImage: `url(${HeaderImageItem1})`}}>
                        <div className="h-full w-full bg-black/50 absolute"></div>
                        <div className="absolute h-full w-full -mt-[50px]">
                            <div className="flex flex-col justify-center items-center h-full text-white gap-4 mx-8 text-center">
                                <h1 className="animated fadeInUp">Find Your Dream Home With Ease</h1>
                                <p className="animated fadeInUp">Explore Smart Listings with Beautiful Custom Designs</p>
                                <Searchbar className="animated fadeInUp animate__delay-5s" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 mx-4 -mb-[100px]">
                            <FeaturedHeaderImages className="mx-auto" />
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}

export default Header;