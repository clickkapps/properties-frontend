import {RocketIcon} from "lucide-react";
import {Link} from "react-router";

const AdvertiseActionCard = () => {
  return (
      <Link to="/account/agent/create-ads">
          <div className="bg-[#893dc0] border rounded-md p-6 w-full text-white flex flex-col justify-between h-32">
              <RocketIcon className="w-7 h-7 text-white" />
              <p className="text-lg font-medium">Advertise here</p>
          </div>
      </Link>
  );
};

export default AdvertiseActionCard;
