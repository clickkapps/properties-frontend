import { googleLogo } from "@/assets";
import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
import {useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {LoaderCircle} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {apiLoginWithPhone} from "@/api/auth.api.ts";

import {useRef, useState} from "react";
import PhoneVerificationPage from "@/presentation/auth/PhoneVerificationPage.tsx";
import {customLog} from "@/lib/utils.ts";

const SignInPage = () => {

  const navigate = useNavigate();
  const [ showOTP, setShowOTP ] = useState(false);
  const verificationPayloadRef  = useRef<{ phone: string, serverId: string, isNew: boolean } | undefined >(undefined);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<{phone: string}>()

  const { mutate, isPending } = useMutation({
      mutationKey: ['auth'],
      mutationFn: apiLoginWithPhone,
      onSuccess: async (rep) => {

          customLog("verification request success", rep);
          const data = rep.data;
          reset()
          verificationPayloadRef.current = {
              serverId: data.serverId,
              phone: data.phone,
              isNew: data.isNew
          }
          setShowOTP(true)
      },
      onError: async (error) => {
          customLog("on error", error.message);
          setError("phone", {
              type: "manual",
              message: error.message,
          })
      },
  })

  // const [phone] = watch(["phone"])
  //   console.log("phone", phone)

  function submitHandler(data: { phone: string }) {
      console.log('Form submitted!', data.phone);
      mutate(data)
  }

  function onGoogleClickHandler() {
      console.log("onGoogleClickHandler called");
      navigate('/account/agent')
  }


  return (
      <div className="md:bg-gray-100 bg-white overflow-y-auto">
          <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
          <div className="h-4 md:h-16"></div>

          <>
              <div className="flex items-center justify-center mt-12">
                  <div className="bg-white p-8 w-full md:w-[500px]">
                      <h2 className="text-center text-lg font-semibold">Hello! Welcome</h2>
                      <hr className="my-4 border-gray-300"/>

                      { !showOTP && (<form onSubmit={handleSubmit(submitHandler)}>

                          <p className="text-md font-normal py-2">Enter phone number</p>

                          {/* Country Code & Phone Number*/}
                          <div className="border border-gray-300 rounded-lg overflow-hidden mt-2">
                              {/* Country Code Selector */}

                              {/* Phone Number Input */}
                              <input
                                  {...register('phone', {
                                      // validations
                                      required: {
                                          value: true,
                                          message: "The phone number field is required"
                                      },
                                      pattern: {
                                          value: /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/,
                                          message: 'Invalid phone number format',
                                      },
                                      // if you need custom validation
                                      validate: value => {
                                          return value.length > 9 || "Must be longer than 10 chars"
                                      }
                                  })}
                                  type="number"
                                  placeholder="Phone number here"
                                  className="w-full p-3 mt-2 text-sm outline-none"
                              />
                              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-300">
                                  <div className="flex flex-col">
                                      <span className="text-xs">Country code</span>
                                      <span className="text-xs">Ghana (+233)</span>
                                  </div>
                                  {/*<ChevronDown className="w-4 h-4 text-gray-500"/>*/}
                              </div>
                          </div>
                          {Object.keys(errors).length > 0 && (
                              <p className="text-[11px] mt-2 text-red-700">
                                  {/*We'll send you a verification code to confirm your phone number.*/}
                                  {errors.phone?.message}
                              </p>
                          )}

                          {Object.keys(errors).length == 0 && (
                              <p className="text-[11px] mt-2">
                                  We'll send you a verification code to confirm your phone number.
                              </p>
                          )}

                          {/* Confirm Button */}

                          <Button
                              className="w-full bg-red-600 text-white rounded-lg mt-4  py-6"
                              type="submit"
                              // type="button"

                              // onClick={() => navigate('/account/agent')}
                          >
                              {isPending && <LoaderCircle className="animate-spin"/>}
                              {!isPending && <span>Continue With Phone</span>}
                          </Button>

                      </form>)}

                      {/* show the OTP component */}
                      { showOTP && (<PhoneVerificationPage
                          phone={verificationPayloadRef.current?.phone ?? ''}
                          verificationRequirements={ verificationPayloadRef.current! }
                          onCancelVerification={() => setShowOTP(false)}
                      />) }


                      {/* Dividing bar */}
                      {!showOTP && (<>
                          <div className="flex items-center my-4">
                              <hr className="flex-grow border-gray-300"/>
                              <span className="mx-2 text-sm text-gray-500">or</span>
                              <hr className="flex-grow border-gray-300"/>
                          </div>

                          {/* Sign-In OPtions */}
                          <Button
                              type="button"
                              onClick={onGoogleClickHandler}
                              className="flex items-center w-full border border-gray-300 rounded-lg px-4 mb-4  relative py-6">
                              <img src={googleLogo} alt="Google Logo" className="w-6 h-6 absolute left-4"/>
                              <span className="text-sm font-medium mx-auto" > Continue with Google</span>
                          </Button>
                      </>)}

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
          </>

          <div className="h-4 md:h-16"></div>
          <Footer/>
      </div>
  );
};

export default SignInPage;
