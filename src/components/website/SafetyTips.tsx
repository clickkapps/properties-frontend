import { AlertTriangle, Check } from "lucide-react"

const SafetyTips = () => {
  return (
    <div className="bg-[#FFEBEB] py-12 px-5 rounded-lg w-full">
      <div className="flex items-center justify-center space-x-2 font-semibold">
        <AlertTriangle className="w-5 h-5 text-black"/>
        <span>SAFETY TIPS</span>
      </div>

      <div className="mt-4 space-y-8">
        {[
          "Never make an upfront payment for inspection fees or rent before viewing the property or meeting the agent in person.",
          "Never make an upfront payment for inspection fees or rent before viewing the property or meeting the agent in person.",
          "Never make an upfront payment for inspection fees or rent before viewing the property or meeting the agent in person.",
        ].map((tip, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Check className="w-7 h-7 text-black" />
            <p className="text-sm">{tip}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default SafetyTips