import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import ManagePropertiesList from "@/components/shared-dashboard/ManagePropertiesList.tsx";
import TotalPublishedPropertiesCard from "@/components/agent-dashboard/TotalPublishedPropertiesCard.tsx";
import TotalUnpublishedPropertiesCard from "@/components/agent-dashboard/TotalUnpublishedPropertiesCard.tsx";


function ApprovalsPage() {
    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Property Approvals </h2>

            <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-4 mb-10">
                <TotalPublishedPropertiesCard />
                <TotalUnpublishedPropertiesCard />
            </div>

            <Tabs defaultValue="pending" className="w-full">

                <TabsList className="flex justify-start rounded-none bg-white p-0 m-0 border-b mb-12">

                    <TabsTrigger value="pending" className="pl-0 h-full md:pr-36  data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold  flex justify-start">Pending
                        Unpublished Properties 🔒
                    </TabsTrigger>

                    <TabsTrigger value="approvals"
                                 className="h-full pl-0 md:pr-36 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold flex justify-start">
                        Published ✓
                    </TabsTrigger>

                </TabsList>

                <TabsContent value="pending">
                    <ManagePropertiesList published={false} />
                </TabsContent>

                <TabsContent value="approvals">
                    <ManagePropertiesList published={true} />
                </TabsContent>


            </Tabs>
        </div>
    )
}

export default ApprovalsPage;