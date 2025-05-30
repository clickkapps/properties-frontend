import {createPortal} from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {forwardRef, ReactNode, Ref, useImperativeHandle, useState} from "react";
// import {useNavigate} from "react-router";
import {ModalHandle} from "@/lib/types";
import SearchbarExtendedForm from "@/components/website/SearchbarExtendedForm.tsx";

const SearchbarModal =  forwardRef( ({ children }: { children?: ReactNode }, ref: Ref<ModalHandle | undefined>) => {

  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();

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
        <DialogContent className="h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>What are you looking for?</DialogTitle>
            <DialogDescription>
              Search for any property of your choice
            </DialogDescription>
          </DialogHeader>
          { children || <div className="p-4">
            <SearchbarExtendedForm showSearchButton={true} onSearchBtnTapped={ () => {
              setOpen(false)
            }} onClearBtnTapped={ () => setOpen(false)} />
          </div>
          }

        </DialogContent>
      </Dialog>,
      document.getElementById('modal') as HTMLElement
  );


})


export default SearchbarModal;
