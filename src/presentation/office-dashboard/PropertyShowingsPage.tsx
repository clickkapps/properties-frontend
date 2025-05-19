import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import CompletedShowingsCard from "@/components/office-dashboard/showings/CompletedShowingsCard.tsx";
import PendingShowingsCard from "@/components/office-dashboard/showings/PendingShowingsCard.tsx";
import AddShowingForm from "@/components/office-dashboard/showings/AddShowingForm.tsx";
import ShowingsTable from "@/components/office-dashboard/showings/ShowingsTable.tsx";
import {useRef} from "react";
import {ShowingModel, TableUpdateReq} from "@/lib/types";
import CancelledShowingsCard from "@/components/office-dashboard/showings/CancelledShowingsCard.tsx";



function PropertyShowingsPage() {

    const pendingTableRef = useRef<TableUpdateReq<ShowingModel>>()
    const completedTableRef = useRef<TableUpdateReq<ShowingModel>>()
    const cancelledTableRef = useRef<TableUpdateReq<ShowingModel>>()

    // makes changes to the table
    const recordAddedHandler = (record: ShowingModel) => {
        pendingTableRef.current?.add(record);
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Scheduled viewings </h2>

            <div className=" grid grid-cols-1 md:grid-cols-3 md:gap-16 gap-4 mb-10">
                <PendingShowingsCard/>
                <CompletedShowingsCard/>
                <CancelledShowingsCard/>
            </div>

            <AddShowingForm onRecordAdded={recordAddedHandler} />
            <div className="h-10"></div>

            <Tabs defaultValue="pending" className="w-full">

                <TabsList className="flex justify-start border-b rounded-none bg-white p-0 m-0">

                    <TabsTrigger value="pending" className="h-full md:pr-36 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold  flex justify-start">
                        Pending
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="h-full md:pr-36 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold flex justify-start">
                        Completed
                    </TabsTrigger>

                    <TabsTrigger value="cancelled" className="h-full md:pr-36 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold flex justify-start">
                        Cancelled
                    </TabsTrigger>

                </TabsList>

                <TabsContent value="pending">
                    <ShowingsTable ref={pendingTableRef} key="pending" status="pending"/>
                </TabsContent>

                <TabsContent value="completed">
                    <ShowingsTable ref={completedTableRef} key="completed" status="completed" />
                </TabsContent>

                <TabsContent value="cancelled">
                    <ShowingsTable ref={cancelledTableRef} key="completed" status="cancelled" />
                </TabsContent>


            </Tabs>
        </div>
    )
}

export default PropertyShowingsPage;