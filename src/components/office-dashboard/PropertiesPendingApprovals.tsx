import {ChevronLeftIcon, ChevronRight} from 'lucide-react';
import {useState} from "react";
import {propertyImg} from "@/assets";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const pendingApprovalList = Array.from({ length: 5 }).map((_, i) => {
    return {
        id: `id-${i}`,
        title: "Dan's Villa",
        selected: i == 0
    }
})

function PropertiesPendingApprovals() {

    const [activatedMobileSection, setActivatedMobileSection] = useState<'list' | 'detail'>('list')

    return (
        <div className="py-4">
            <div className="flex flex-row border md:divide-x">
                <div className={` ${activatedMobileSection == 'list' ? 'block' : 'hidden' } md:block w-full md:w-[20%] `}>
                    { pendingApprovalList.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setActivatedMobileSection('detail')}
                            className={`flex flex-row justify-between py-4 px-4 ${item.selected ? 'bg-[#f5f5f5]' : ''}`}>
                            {item.title}
                            <ChevronRight className="block md:hidden"/>
                        </div>
                    ))}
                </div>
                <div
                    className={` ${activatedMobileSection == 'detail' ? 'block' : 'hidden'} md:block w-full md:w-[80%] flex flex-col `}>

                    <div className="py-4 px-2 border-b inline-flex w-full space-x-4" onClick={() => setActivatedMobileSection('list')}>
                        <div className="inline-flex space-x-1 text-blue-500 items-center md:hidden">
                            <ChevronLeftIcon />
                            <span className="text-sm">Back</span>
                        </div>
                        <p className="font-semibold"> Dan's Villa </p>
                    </div>

                    {/* Content here for item detail */}
                    <div className="px-6 py-4 space-y-10 animated slideInRight duration-100">
                        <div className="space-y-2">
                            <h2> Property Gallery </h2>
                            {/* Uploaded images   */}
                            <div className="flex flex-row overflow-y-auto gap-4">
                                {
                                    Array.from({length: 8}).map((_, index) => (
                                        <img key={'e-'+index} src={propertyImg} alt={"property image"}
                                             className="aspect-square w-48 h-48 rounded-lg object-cover"/>
                                    ))
                                }
                            </div>
                        </div>

                        <form className="space-y-6">
                            {/* Client Name & Contact */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <label className="block text-sm  mb-1">Client Name</label>
                                    <Input
                                        placeholder="name"
                                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm  mb-1">Service Type</label>
                                    <Input
                                        placeholder="name"
                                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                                    />
                                </div>
                            </div>

                            {/* Contact & Date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <label className="block text-sm  mb-1">Contact</label>
                                    <Input
                                        placeholder="name"
                                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm  mb-1">Date</label>
                                    <Input
                                        placeholder="name"
                                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                                    />
                                </div>
                            </div>

                            {/* Button */}
                            <Button
                                type="submit"
                                className="bg-[#020050] hover:bg-[#0D0B66] rounded-md text-sm"
                            >
                                Add Property
                            </Button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default PropertiesPendingApprovals;