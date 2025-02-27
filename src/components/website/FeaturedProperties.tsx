import PropertyListItem from "@/components/website/PropertyListItem.tsx";

function FeaturedProperties() {
    return (
        <div className="space-y-8">
            {/* Featured Row 1*/}
            <div className="columns-1 md:columns-5 mx-4 md:mx-0 gap-10">
                {Array.from({length: 5}).map((_, index) => (
                    <PropertyListItem key={"item-" + index}/>
                ))}
            </div>

            {/* Featured Row 2*/}
            <div className="columns-1 md:columns-5 mx-4 md:mx-0 gap-10">
                {Array.from({length: 5}).map((_, index) => (
                    <PropertyListItem key={"item-" + index}/>
                ))}
            </div>
        </div>
    )
}

export default FeaturedProperties