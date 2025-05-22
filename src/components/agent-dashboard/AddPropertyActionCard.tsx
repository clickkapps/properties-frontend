import { Plus } from "lucide-react";
import {Link} from "react-router";

const AddPropertyActionCard = () => {
  return (
    //
      <Link to="/account/agent/add-listing">
          <div className="bg-red-800 border rounded-md p-6 w-full text-white flex flex-col justify-between h-32">

              <Plus className="w-7 h-7 rounded-full border-2 border-white text-white"/>

              <p className="text-lg font-medium">Add New Property</p>
          </div>
      </Link>
  )
}

export default AddPropertyActionCard