import {FileQuestion} from "lucide-react";

function EmptyDisplayPage() {
    return (
        <div className="h-[50vh] flex items-center justify-center border border-dashed p-6">
            <div className="text-center max-w-md mx-auto">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100">
                    <FileQuestion className="h-10 w-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Nothing here yet</h2>
                <p className="text-gray-500 mt-2">
                    This section seems empty. Once you start adding content, it’ll show up here.
                </p>
            </div>
        </div>
    );
}

export default EmptyDisplayPage;