import {Notebook} from "lucide-react";

function PendingViewsTodayCard() {
    return (
        <div className="border rounded-md p-6 w-full h-32 bg-white text-center flex flex-col justify-between items-center">
            <div className="mb-2">
                <Notebook className="w-7 h-7 text-gray-600" />
            </div>

            <p className="text-gray-600">Pending Views Today</p>
            <p className="text-black font-semibold text-lg font-[inter]">154</p>
        </div>
    )
}

export default PendingViewsTodayCard