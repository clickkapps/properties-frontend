import { googleLogo } from "@/assets";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
import {useNavigate} from "react-router";

const SignInPage = () => {

  const navigate = useNavigate();

  return (
      <div className="md:bg-gray-100 bg-white overflow-y-auto">
          <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
          <div className="h-4 md:h-16"></div>
          <div className="flex items-center justify-center mt-12">
              <div className="bg-white p-8 w-[500px]">
                  <h2 className="text-center text-lg font-semibold">Sign In</h2>
                  <hr className="my-4 border-gray-300"/>

                  <p className="text-lg font-semibold py-2">Welcome</p>

                  {/* Country Code & Phone Number*/}
                  <div className="border border-gray-300 rounded-lg overflow-hidden mt-4">
                      {/* Country Code Selector */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
                          <div className="flex flex-col">
                              <span className="text-xs">Country code</span>
                              <span className="text-xs">Ghana (+233)</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-500"/>
                      </div>
                      {/* Phone Number Input */}
                      <input
                          type="tel"
                          placeholder="Enter phone number here"
                          className="w-full p-3 mt-2 text-sm outline-none"
                      />
                  </div>

                  <p className="text-[11px] mt-2">
                      We'll call or text you to confirm your number. Standard message and
                      data may apply.
                  </p>

                  {/* Confirm Button */}
                  <button className="w-full bg-red-600 text-white py-3 rounded-lg mt-4 hover:bg-red-700"
                    onClick={() => navigate('/agent')}
                  >
                      Confirm
                  </button>

                  {/* Dividing bar */}
                  <div className="flex items-center my-4">
                      <hr className="flex-grow border-gray-300"/>
                      <span className="mx-2 text-sm text-gray-500">or</span>
                      <hr className="flex-grow border-gray-300"/>
                  </div>

                  {/* Sign-In OPtions */}
                  <button
                      className="flex items-center w-full border border-gray-300 rounded-lg py-3 px-4 mb-4 hover:bg-gray-100 relative">
                      <img
                          src={googleLogo}
                          alt="Google Logo"
                          className="w-6 h-6 absolute left-4"
                      />
                      <span className="text-sm font-medium mx-auto" onClick={() => navigate('/agent')}>
                        Continue with Google
                      </span>
                  </button>

          {/*        <button*/}
          {/*            className="flex items-center w-full border border-gray-300 rounded-lg py-3 px-4 mb-4 hover:bg-gray-100 relative">*/}
          {/*            <img*/}
          {/*                src={appleLogo}*/}
          {/*                alt="Apple Logo"*/}
          {/*                className="w-6 h-6 absolute left-4"*/}
          {/*            />*/}
          {/*            <span className="text-sm font-medium mx-auto">*/}
          {/*  Continue with Apple*/}
          {/*</span>*/}
          {/*        </button>*/}

          {/*        <button*/}
          {/*            className="flex items-center w-full border border-gray-300 rounded-lg py-3 px-4 mb-4 hover:bg-gray-100 relative">*/}
          {/*            <img*/}
          {/*                src={facebookLogo}*/}
          {/*                alt="Facebook Logo"*/}
          {/*                className="w-6 h-6 absolute left-4"*/}
          {/*            />*/}
          {/*            <span className="text-sm font-medium mx-auto">*/}
          {/*  Continue with Facebook*/}
          {/*</span>*/}
          {/*        </button>*/}

          {/*        <button*/}
          {/*            className="flex items-center w-full border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-100 relative">*/}
          {/*            <img*/}
          {/*                src={emailLogo}*/}
          {/*                alt="Email Logo"*/}
          {/*                className="w-6 h-6 absolute left-4"*/}
          {/*            />*/}
          {/*            <span className="text-sm font-medium mx-auto">*/}
          {/*  Continue with Email*/}
          {/*</span>*/}
          {/*        </button>*/}
              </div>
          </div>
          <div className="h-4 md:h-16"></div>
          <Footer/>
      </div>
  );
};

export default SignInPage;
