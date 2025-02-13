import Header from "@/components/website/Header.tsx";
import PropertyListItem from "@/components/website/PropertyListItem.tsx";
import Footer from "@/components/website/Footer.tsx";


function LandingPage() {
    return (
        <>
            {/*-------  Header ------------*/}
            <Header />
            {/*------- End of Header ------------*/}


            <div className="-mt-[116px] container mx-auto">

                {/*------- Exclusive Listings ------------*/}
                <section id="listings">
                    <h1 className="text-center"> Exclusive Listings For Sale </h1>
                    <p className="text-center my-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dicta ex itaque neque officia repellat sunt. Inventore similique totam voluptates?</p>
                    <div className="h-[52px]"></div>
                    <div className="grid grid-cols-5">
                        {Array.from({length: 10}).map((_, index) => (
                            <PropertyListItem key={"item-" + index}/>
                        ))}
                    </div>
                </section>
                {/*------- End of Exclusive Listings ------------*/}


                {/*------- Packages ------------*/}
                <section id="packages">
                    <div className="my-[52px]">
                        <h1 className="text-center "> Packages </h1>
                        <p className="text-center my-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
                            dicta ex itaque neque officia repellat sunt. Inventore similique totam voluptates?</p>
                    </div>
                </section>
                {/*------- End of Packages ------------*/}

            </div>

            {/*------- Footer ------------*/}
            <Footer/>
            {/*------- End of Footer ------------*/}

        </>
    )
}

export default LandingPage