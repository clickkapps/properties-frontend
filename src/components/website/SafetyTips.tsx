import { AlertTriangle, Check } from "lucide-react";

const SafetyTips = () => {
  return (
    <div className="bg-[#FFEBEB] px-4 py-3 sm:p-5 rounded-lg m-2 sm:m-4">
      <div className="flex items-center justify-center space-x-1 sm:space-x-2 font-semibold">
        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-black"/>
        <span className="text-sm sm:text-base">SAFETY TIPS</span>
      </div>

      <div className="mt-4 space-y-3 sm:space-y-4">
        {[
          "Never make an upfront payment for inspection fees or rent before viewing the property or meeting the agent in person.",
          "Never make an upfront payment for inspection fees or rent before viewing the property or meeting the agent in person.",
          "Never make an upfront payment for inspection fees or rent before viewing the property or meeting the agent in person.",
        ].map((tip, index) => (
          <div key={index} className="flex items-start space-x-1 sm:space-x-2">
            <Check className="w-5 h-5 sm:w-7 sm:h-7 text-black" />
            <p className="text-sm sm:text-[15px]">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyTips;
