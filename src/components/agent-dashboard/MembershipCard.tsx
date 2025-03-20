import { Check } from "lucide-react";
import { Button } from "../ui/button";

const SubscriptionPlan = () => {
  return (
      <>
          <div
              className="flex flex-col md:flex-row md:divide-x md:divide-slate-300 md:border md:rounded-md border-gray-300 gap-4 md:gap-0">
              <div className="w-full flex-1  border md:border-none rounded-md md:rounded-none p-6 ">
                  <h3 className="font-medium text-lg">Current Plan (Standard Plan)</h3>
                  <ul className="mt-4 space-y-2">
                      <li className="flex items-center space-x-2">
                          <Check
                              className="p-1.5 rounded-full border-2 border-black w-6 h-6 bg-transparent text-black"/>
                          <span>List your home</span>
                      </li>
                      <li className="flex items-center space-x-2">
                          <Check
                              className="p-1.5 rounded-full border-2 border-black w-6 h-6 bg-transparent text-black"/>
                          <span>List your home</span>
                      </li>
                      <li className="flex items-center space-x-2">
                          <Check
                              className="p-1.5 rounded-full border-2 border-black w-6 h-6 bg-transparent text-black"/>
                          <span>List your home</span>
                      </li>
                  </ul>
              </div>
              <div className="w-full flex-1  rounded-md md:rounded-none">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 md:py-0 border md:border-none h-full">
                      <p className="text-6xl font-medium font-[inter]">$50</p>
                      <div className="flex flex-col items-center space-y-4">
                          <h3 className="text-lg text-black font-medium">Monthly Plan</h3>
                          <p className="text-sm">Your subscription renews on <span className="font-[inter] font-medium">12th Jan 2025</span>
                          </p>

                          <div className="mt-4">
                              <Button variant="destructive">Cancel Current Plan</Button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>

  );
};

export default SubscriptionPlan;
