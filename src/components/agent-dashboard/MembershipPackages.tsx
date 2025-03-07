import { BadgeCheck, Check } from "lucide-react";

const features = [
  "List your home",
  "Free market evaluation",
  "Buying and selling consultation",
  "Manage your property showings",
  "Forward title for your property",
];

const MembershipPackages = () => {
  return (
    <div className="container mx-auto py-10 bg-white">

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        
        {/* BASIC Plan */}
        <div className="bg-[#FFFFFF] group p-8 rounded-xl w-80 hover:bg-slate-800 hover:text-white cursor-pointer transition duration-150 border-2 border-[#1EFB0A]">
          
          <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-4">BASIC</h3>
          <BadgeCheck className=" text-[#1EFB0A]"/>
          </div>
          <p className="text-4xl font-semibold mb-6 font-[Inter]">$1500</p>
          <p className="text-md font-semibold text-gray-700 mb-6 group-hover:text-gray-400">
            Basic plan for all users
          </p>

          {/* Features List */}
          <ul className="mt-4 space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center border-2 group-hover:border-white border-black rounded-full">
                  <Check className="w-3 h-3 text-black group-hover:text-white" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <button className="mt-6 bg-white text-black text-[15px] py-2 px-3 rounded-md group-hover:border-black border-2 border-[#1EFB0A] group-hover:border group-hover:scale-110 transition duration-1000">
            Get Basic Plan
          </button>
        </div>

        {/* STANDARD Plan */}
        <div className="bg-[#7DE2D5] group p-8 rounded-xl w-80 hover:bg-slate-800 hover:text-white cursor-pointer transition duration-150">
          <h3 className="text-lg font-semibold mb-4">STANDARD</h3>
          <p className="text-4xl font-semibold mb-6 font-[Inter]">$1500</p>
          <p className="text-md font-semibold text-gray-700 mb-6 group-hover:text-gray-400">
            Standard plan for advanced users
          </p>

          <ul className="mt-4 space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center border-2 group-hover:border-white border-black rounded-full">
                  <Check className="w-3 h-3 text-black group-hover:text-white" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <button className="mt-6 bg-black text-white text-[15px] py-2 px-3 rounded-md group-hover:border-white group-hover:border group-hover:scale-110 transition duration-1000">
            Get Standard Plan
          </button>
        </div>

        {/* PREMIUM Plan */}
        <div className="bg-[#FFBB04] group p-8 rounded-xl w-80 hover:bg-slate-800 hover:text-white cursor-pointer transition duration-150">
          <h3 className="text-lg font-semibold mb-4">PREMIUM</h3>
          <p className="text-4xl font-semibold mb-6 font-[Inter]">$1500</p>
          <p className="text-md font-semibold text-gray-700 mb-6 group-hover:text-gray-400">
            Premium plan for top-tier users
          </p>

          <ul className="mt-4 space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center border-2 group-hover:border-white border-black rounded-full">
                  <Check className="w-3 h-3 text-black group-hover:text-white" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <button className="mt-6 bg-black text-white text-[15px] py-2 px-3 rounded-md group-hover:border-white group-hover:border group-hover:scale-110 transition duration-1000">
            Get Premium Plan
          </button>
        </div>

      </div>
    </div>
  )
}

export default MembershipPackages