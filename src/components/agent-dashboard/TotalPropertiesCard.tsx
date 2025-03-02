import { Home } from "lucide-react"

const TotalPropertiesCard = () => {
  return (
    <div className="border rounded-md p-6 w-60 h-32 bg-white text-center flex flex-col justify-between items-center">
      <div className="mb-2">
      <Home className="w-7 h-7 text-gray-600" />
      </div>
      
      <p className="text-gray-600">Total properties</p>
      <p className="text-black font-semibold text-lg">24568</p>
    </div>
  )
}

export default TotalPropertiesCard