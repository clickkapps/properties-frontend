import {SearchIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import SearchbarModal from "@/components/website/SearchbarModal.tsx";
import {useRef} from "react";
import {ModalHandle} from "@/lib/types";

const MobileSearchBar = () => {

  const modalRef = useRef<ModalHandle>()

  return (
    <>
      <Button
          onClick={ () => {
            modalRef.current?.open()
          }}
          size={"lg"} className={`rounded-full md:hidden bg-white text-black mt-4 animated fadeInUp animate__delay-5s shadow`}> <SearchIcon /> Search for properties </Button>
      <SearchbarModal ref={modalRef} />
    </>
  )
}

export default MobileSearchBar;
