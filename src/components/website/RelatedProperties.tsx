import PropertyListItem from "@/components/website/PropertyListItem.tsx";

function RelatedProperties() {
    return (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-10 mx-5 md:mx-0">
            {Array.from({length: 10}).map((_, index) => {
                return (
                    <PropertyListItem key={"item-" + index}/>
                )
            })}
        </div>
    )
}

export default RelatedProperties