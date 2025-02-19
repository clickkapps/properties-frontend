import Header from "@/components/website/Header.tsx";
import PropertyListItem from "@/components/website/PropertyListItem.tsx";
import Footer from "@/components/website/Footer.tsx";
import Packages from "@/components/website/Packages.tsx";


function LandingPage() {
    return (
        <>
            {/*-------  Header ------------*/}
            <Header />
            {/*------- End of Header ------------*/}


            <div className="-mt-[0px] md:-mt-[0px] container mx-auto">

                {/*------- Exclusive Listings ------------*/}
                <section id="listings">
                    <h2 className="mx-12 text-3xl font-bold text-center"> Exclusive Listings </h2>
                    <p className="text-center my-2 mx-12">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
                        dicta ex itaque neque officia repellat sunt. Inventore similique totam voluptates?</p>
                    <div className="h-[52px]"></div>
                    {/*<div className="grid grid-cols-5">*/}


                    {/*Listing content*/}

                    <div className="space-y-8">
                        {/* Featured Row 1*/}
                        <div className="columns-1 md:columns-5 gap-8 mx-4 md:mx-0 space-y-8">
                            {Array.from({length: 5}).map((_, index) => (
                                <PropertyListItem key={"item-" + index}/>
                            ))}
                        </div>

                        {/* Featured Row 2*/}
                        <div className="columns-1 md:columns-5 gap-8 mx-4 space-y-8">
                            {Array.from({length: 5}).map((_, index) => (
                                <PropertyListItem key={"item-" + index}/>
                            ))}
                        </div>
                    </div>

                </section>
                {/*------- End of Exclusive Listings ------------*/}


                {/*------- Packages ------------*/}
                <section id="packages">
                    <Packages/>
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