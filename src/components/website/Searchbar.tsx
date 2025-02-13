import { Search } from "lucide-react"

const Searchbar = ({ className }: { className: string}) => {

    const classes  = `bg-white shadow-md p-2 rounded-full flex items-center w-full max-w-5xl mx-auto ${className}`

    return (
    <div className={classes}>

      <input type="text"
      placeholder="Location" 
      className="flex-1 bg-transparent px-4 py-3 rounded-full text-[#6A6A6A] focus:outline-none"
      />

      <div className="w-px h-8 bg-gray-300"></div>

      <input type="text"
      placeholder="Category" 
      className="flex-1 bg-transparent px-4 py-3 rounded-full text-[#6A6A6A] focus:outline-none"
      />

      <div className="w-px h-8 bg-gray-300"></div>

      <input type="text"
      placeholder="Bedroom" 
      className="flex-1 bg-transparent px-4 py-3 rounded-full text-[#6A6A6A] focus:outline-none"
      />

      <div className="w-px h-8 bg-gray-300"></div>

      <input type="text"
      placeholder="Price" 
      className="flex-1 bg-transparent px-4 py-3 rounded-full text-[#6A6A6A] focus:outline-none"
      />

      <button className="flex items-center justify-center bg-[#e50005] rounded-full px-4 py-3 space-x-2 text-white font-semibold hover:bg-red-700">
      <Search  className="w-5 h-5"/>
      <span>Search</span>
      </button>

    </div>
  )
}

export default Searchbar