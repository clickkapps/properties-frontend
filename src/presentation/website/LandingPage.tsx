import Header from "@/components/website/Header.tsx";
import Footer from "@/components/website/Footer.tsx";
import Packages from "@/components/website/Packages.tsx";
import FeaturedProperties from "@/components/website/FeaturedProperties.tsx";


function LandingPage() {
    return (
        <>
            {/*-------  Header ------------*/}
            <Header />
            {/*------- End of Header ------------*/}


            <div className="container mx-auto -mt-[20vh]">

                {/* Because of the featured listing height, we need to give space below to accomodate it*/}
                <div className="h-[100px]"></div>

                {/* This is the margin that equals the title space below*/}
                <div className="h-[50px]"></div>

                {/*------- Exclusive Listings ------------*/}
                <section id="listings">
                    <h2 className="mx-12 text-3xl font-bold text-center"> Exclusive Listings </h2>
                    <p className="text-center my-2 mx-12">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Culpa
                        dicta ex itaque neque officia repellat sunt. Inventore similique totam voluptates?</p>
                    <div className="h-[50px]"></div>
                    {/*<div className="grid grid-cols-5">*/}


                    {/*Listing content*/}

                    <FeaturedProperties />

                </section>
                {/*------- End of Exclusive Listings ------------*/}


                {/*------- Packages ------------*/}
                <section id="packages">
                    <Packages/>
                </section>
                {/*------- End of Packages ------------*/}

                {/*------- Partners ------------*/}
                {/*<section id="partners" className="my-16">*/}
                {/*    <Partners/>*/}
                {/*</section>*/}
                {/*------- End of Partners ------------*/}

            </div>

            {/*------- Footer ------------*/}
            <Footer/>
            {/*------- End of Footer ------------*/}

        </>
    )
}

export default LandingPage