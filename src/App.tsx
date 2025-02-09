import {Button} from "@/components/ui/button.tsx";
import Searchbar from "./components/website/Searchbar";

function App() {

  // const [count, setCount] = useState(0)

  return (
      <div className="container mx-auto mt-10 space-y-4">
          <h1 className="text-3xl">
              Welcome to Listing and Property Management System
          </h1>
          <div>
              <Button>Click me</Button>
          </div>

          <Searchbar />
      </div>
  )
}

export default App
