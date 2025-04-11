import { Search } from "lucide-react";
import {createPortal} from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {forwardRef, ReactNode, Ref, useImperativeHandle, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {useNavigate} from "react-router";
import {ModalHandle} from "@/lib/types";

const SearchResults =  forwardRef(({ children }: { children?: ReactNode }, ref: Ref<ModalHandle | undefined>) => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      }
    }
  })

  return createPortal(
      <Dialog open={open} onOpenChange={setOpen}>
        {/*<DialogTrigger>Open</DialogTrigger>*/}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What are you looking for?</DialogTitle>
            <DialogDescription>
              Search for any property of your choice
            </DialogDescription>
          </DialogHeader>
          { children || <div className="p-4 flex justify-center">
            <form className="w-full rounded-xl bg-white relative">

              {/* Fields */}
              <div className="space-y-3">
                <Input placeholder="Location" className="py-6" autoFocus={false}/>
                <Input placeholder="Category" className="py-6" autoFocus={false} />
                <Input placeholder="Bedroom" className="py-6" autoFocus={false} />
                <Input placeholder="Price" className="py-6" autoFocus={false} />
              </div>

              {/* Bottom Buttons */}
              <div className="flex justify-between items-center mt-5">
                <button type='reset' className="font-semibold underline">Clear all</button>
                <button
                    type='button'
                    onClick={() => {
                      navigate('/properties/rent')
                    }}
                    className="flex items-center gap-2 bg-[#e50005] text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700">
                  <Search className="w-5 h-5"/> Search
                </button>
              </div>

            </form>
          </div>
          }

        </DialogContent>
      </Dialog>,
      document.getElementById('modal') as HTMLElement
  );


})


export default SearchResults;
