import { Check } from "lucide-react";
import { Button } from "../ui/button";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {toggleSubscriptionDialog} from "@/store/ui-slice.ts";
import {format} from "date-fns";
import {entitlementsUIBuilder} from "@/constants/shared.constants.ts";

const MembershipCard = () => {

    const { userInfo: currentUser } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const subscribeToPackageHandler = () => {
        dispatch(toggleSubscriptionDialog(null))
    }

  return (
      <div
          className="flex flex-col md:flex-row md:divide-x md:divide-slate-300 md:border md:rounded-md border-gray-300 gap-4 md:gap-0">
          { currentUser?.activeEntitlement && (
              <div className="w-full flex-1  border md:border-none rounded-md md:rounded-none p-6 ">
                  <h3 className="font-medium text-lg">Current Plan ({ currentUser.activeEntitlement.entitlement })</h3>
                  <ul className="mt-4 space-y-2">
                      {
                          entitlementsUIBuilder.find(e => e.slug == currentUser.activeEntitlement.entitlement)?.uiFeatureList.map((item) => {
                              return (
                                  <li className="flex items-center space-x-2" key={item}>
                                      <Check
                                          className="p-1.5 rounded-full border-2 border-black w-6 h-6 bg-transparent text-black"/>
                                      <span>{ item }</span>
                                  </li>
                              )
                          })
                      }
                  </ul>
              </div>
          )}
          { !(currentUser?.activeEntitlement) && (
              <div className="w-full flex-1  border md:border-none rounded-md md:rounded-none p-6 ">
                  <h3 className="font-medium text-lg">Available features</h3>
                  <ul className="mt-4 space-y-2">
                      {/* Basic */}
                      {
                          entitlementsUIBuilder.find(e => e.slug == "basic")?.uiFeatureList.map((item) => {
                              return (
                                  <li className="flex items-center space-x-2" key={item}>
                                      <Check
                                          className="p-1.5 rounded-full border-2 border-black w-6 h-6 bg-transparent text-black"/>
                                      <span>{ item }</span>
                                  </li>
                              )
                          })
                      }
                      {/* Standard */}
                      {
                          entitlementsUIBuilder.find(e => e.slug == "standard")?.uiFeatureList.map((item) => {
                              return (
                                  <li className="flex items-center space-x-2" key={item}>
                                      <Check
                                          className="p-1.5 rounded-full border-2 border-black w-6 h-6 bg-transparent text-black"/>
                                      <span>{ item }</span>
                                  </li>
                              )
                          })
                      }

                  </ul>
              </div>
          )}
          <div className="w-full flex-1  rounded-md md:rounded-none">
              <div
                  className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 md:py-0 border md:border-none h-full">
                  {/*<p className="text-6xl font-medium font-[inter]">$50</p>*/}
                  <div className="flex flex-col items-center space-y-4">
                      <h3 className="text-lg text-black font-medium">{!(currentUser?.activeEntitlement) ? "No Active subscription found" : "You have subscribe"}</h3>
                      {
                          !(currentUser?.activeEntitlement) ? (
                              <p className="text-sm">Your active subscription will appear here
                              </p>
                          ) : (
                              <p className="text-sm">Your subscription was created on <span
                                  className="font-[inter] font-medium">{String(format((currentUser?.activeEntitlement?.updatedAt || ''), "LLL dd, y"))}</span>
                              </p>
                              )
                      }

                      <div className="mt-4">
                          {!(currentUser?.activeEntitlement) && (
                              <Button type="button" variant="destructive" onClick={subscribeToPackageHandler}>Subscribe to a package</Button>) }
                      </div>
                  </div>
              </div>
          </div>
      </div>

  );
};

export default MembershipCard;
