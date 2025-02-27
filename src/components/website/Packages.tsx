import { Check } from "lucide-react";

const pricingPlans = [
  { title: "BASIC", description: "Basic", price: "$1500", color: "bg-[#F2B2D7]" },
  { title: "STANDARD", description: "Standard", price: "$1500", color: "bg-[#7DE2D5]" },
  { title: "PREMIUM", description: "Premium", price: "$1500", color: "bg-[#FFBB04]" },
];

const features = [
  "List your home",
  "Free market evaluation",
  "Buying and selling consultation",
  "Manage your property showings",
  "Forward title for your property",
];

const Packages = () => {
  return (
      <div className="py-12 bg-white">

        <div id="packages-heading" className="mb-10">
          <h2 className="text-3xl font-bold text-center ">Packages</h2>
          {/*<p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa*/}
          {/*  dicta ex itaque neque officia repellat sunt. Inventore similique totam voluptates?</p>*/}
        </div>


        {/* pricing card */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {pricingPlans.map((plan, index) => (
              <div
                  key={index}
                  className={`${plan.color} group p-8 rounded-xl w-80 hover:bg-slate-800 hover:text-white cursor-pointer transition duration-150`}
              >
                <h3 className="text-lg font-semibold mb-4">{plan.title}</h3>
                <p className="text-4xl font-semibold mb-6 font-[Inter]">{plan.price}</p>
                <p className="text-md font-semibold text-gray-700 mb-6 group-hover:text-gray-400">
                  Basic plan for all users
                </p>

                {/* features */}
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

                <button className="mt-6 bg-black text-white text-[15px] py-2 px-3 rounded-md
                 group-hover:border-white
                 group-hover:border
                 group-hover:scale-110
                 transition duration-1000
                 ">
                  Get {plan.description} Plan
                </button>
              </div>
          ))}
        </div>
      </div>
  )
}

export default Packages