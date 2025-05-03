import { type ChartConfig } from "@/components/ui/chart"

export const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

export const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig

export const entitlementsUIBuilder: { uiTitle:string, slug: string, uiFeatureList: string[], uiColor: string }[] = [

    {
        uiTitle: "BASIC",
        slug: 'basic',
        uiFeatureList:  [
            "List your property on the platform",
            "Promotion of property on other social platforms"
        ],
        uiColor: "bg-[#F2B2D7]"
    },
    {
        uiTitle: "STANDARD",
        slug: 'standard',
        uiFeatureList: [
            "List your property on the platform",
            "Promotion of property on other social platforms",
            "Manage your property showings",
            "Legal Coordination",
            "Handle Paperwork / Negotiations",
            "Virtual Tour"
        ],
        uiColor: "bg-[#7DE2D5]",
    }
]

