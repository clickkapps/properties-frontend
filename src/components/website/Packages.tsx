import {Check, LoaderCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import useFetchPackages from "@/hooks/use-fetch-packages.ts";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {PackageModel} from "@/lib/types";
import {useNavigate} from "react-router";
import {toggleSubscriptionDialog} from "@/store/ui-slice.ts";
import {Badge} from "@/components/ui/badge.tsx";


// const features = [
//   "List your home",
//   "Free market evaluation",
//   "Buying and selling consultation",
//   "Manage your property showings",
//   "Forward title for your property",
// ];
type Props = {
    className?: string,
    showTitle?: boolean,
    showGetStartedButton?: boolean,
}

const Packages = ({ className, showTitle = true, }: Props) => {

    const { userInfo: currentUser } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const { isFetchingPackages, packages } = useFetchPackages("entitlement")
    const navigate = useNavigate()

    if(isFetchingPackages) {
        return (
            <div className={`py-12 bg-white md:mx-0 flex flex-row justify-center items-center ${className}`}>
                <LoaderCircle />
            </div>
        )
    }

    const activateClickedHandler = (pkg: PackageModel) => {
        if(!currentUser) {
            navigate("/account/agent/membership")
            return
        }

        dispatch(toggleSubscriptionDialog({ option: pkg.slug }))
    }

    return (
      <div className={`py-12 bg-white md:mx-0 ${className}`} >

          { showTitle && <div id="packages-heading" className="mb-10">
          <h2 className="text-3xl font-bold text-center ">Packages</h2>
          {/*<p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa*/}
          {/*  dicta ex itaque neque officia repellat sunt. Inventore similique totam voluptates?</p>*/}
        </div> }


        {/* pricing card */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch md:h-full">
          {packages && packages.map((pkg) => {

              const activated = pkg.slug === currentUser?.activeEntitlement?.entitlement

              return (
                  <div
                      key={pkg.slug}
                      className={`${!activated && pkg.uiColor} ${activated && ("border border-teal-500")}  w-full md:w-auto group p-8 rounded-xl hover:bg-slate-800 hover:text-white cursor-pointer transition duration-150 flex flex-col `}
                  >
                      <div>
                          <h3 className="text-lg font-semibold mb-4">{pkg.uiTitle}</h3>
                          <p className="text-4xl font-semibold mb-6 font-[Inter]">CAD ${pkg.price}</p>
                          {/*{pkg.currency}*/}
                          <p className="text-md font-semibold text-gray-700 mb-6 group-hover:text-gray-400">
                              {pkg.description} benefits
                          </p>
                      </div>

                      {/* features */}
                      <ul className="mt-4 space-y-3">
                          {pkg?.uiFeatureList?.map((feature, i) => (
                              <li key={i} className="flex items-center space-x-3">

                                  <div
                                      className="w-6 h-6 flex items-center justify-center border-2 group-hover:border-white border-black rounded-full">
                                      <Check className="w-3 h-3 text-black group-hover:text-white"/>
                                  </div>
                                  <span className="text-sm">{feature}</span>
                              </li>
                          ))}
                      </ul>

                      <div className="flex-grow"></div>

                      <div>
                          {
                              (!activated) && (
                                  <Button className="mt-6 bg-black text-white text-[15px] py-2 px-3 rounded-md
                                     group-hover:border-white
                                     group-hover:border
                                     group-hover:scale-110
                                     transition duration-1000" onClick={() => activateClickedHandler(pkg)}>
                                    Activate
                                </Button> )
                          }
                          {
                              (activated) && (
                                  <Badge className="rounded-full bg-teal-500 my-4"> Activated 🔥🔥🔥</Badge>
                              )
                          }
                      </div>
                  </div>
              );
          })}
        </div>
      </div>
  )
}

export default Packages