import Navbar from "@/components/website/Navbar";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import {useNavigate} from "react-router";
import Footer from "@/components/website/Footer.tsx";

type AdminLoginInputs = {
    username: string;
    password: string;
};

function AdminSignInPage() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AdminLoginInputs>();

    const { mutate, isPending } = useMutation({
        mutationKey: ["admin-sign-in"],
        mutationFn: async (data: AdminLoginInputs) => {
            // Replace this with your actual API call
            const response = await fetch("/api/admin/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Invalid credentials");
            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "Signed in",
                description: "Welcome, admin!",
            });
            navigate("/admin/dashboard"); // Update to your actual admin route
        },
        onError: (error) => {
            const err = error as AxiosError<{ message: string }>;
            toast({
                variant: "destructive",
                title: "Login failed",
                description: err?.response?.data?.message || "Invalid credentials",
            });
        },
    });

    const onSubmit = (data: AdminLoginInputs) => mutate(data);

    return (
        <div className="md:bg-gray-100 bg-white overflow-y-auto">
            <Navbar className="fixed bg-black w-full z-20" animate={false} />
            <div className="h-4 md:h-16" />

            <div className="h-screen">
                <div className="flex justify-center mt-12">
                    <div className="bg-white p-8 w-full md:w-[500px]">
                        <h2 className="text-center text-lg font-semibold mb-8">Admin Sign In</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                            <div>
                                <label className="block text-sm mb-1">Username</label>
                                <Input
                                    {...register("username", {required: "Username is required"})}
                                    placeholder="Enter admin username"
                                    className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                                />
                                {errors.username && (
                                    <p className="text-[11px] mt-2 text-red-700">{errors.username.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Password</label>
                                <Input
                                    {...register("password", {required: "Password is required"})}
                                    type="password"
                                    placeholder="Enter password"
                                    className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                                />
                                {errors.password && (
                                    <p className="text-[11px] mt-2 text-red-700">{errors.password.message}</p>
                                )}
                            </div>

                            <Button
                                className="w-full bg-red-600 text-white rounded-lg mt-4 py-6"
                                type="submit"
                            >
                                {isPending && <LoaderCircle className="animate-spin"/>}
                                {!isPending && <span>Sign In</span>}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="h-4 md:h-16"/>

            <Footer />
        </div>
    );
}

export default AdminSignInPage;
