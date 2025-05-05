/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Logo from "@/assets/images/logo/Logo";
import CustomButton from "@/components/shared/CustomButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registrationSchema } from "./registerValidation";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  // react hook form
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  // router
  const router = useRouter();

  // toggle password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  //   console.log(password, passwordConfirm);

  // handle submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res?.success) {
        toast.success(res?.message);
        form.reset(); // reset form
        router.push("/login"); // redirect to login
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5 space-y-6">
      <div className="flex items-center space-x-4 ">
        <Link href='/'>
          <Logo />
        </Link>
        <div>
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      value={field.value || ""}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <Eye /> : <EyeClosed />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* confirm password */}
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      value={field.value || ""}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <Eye /> : <EyeClosed />}
                    </button>
                  </div>
                </FormControl>

                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          {/* submit button */}
          {/* <CustomButton
            disabled={Boolean(passwordConfirm && password !== passwordConfirm)}
            type="submit"
            className="mt-5! w-full"
            textName={isSubmitting ? "Registering...." : "Register"}
          /> */}
          <Button 
            variant="outline" 
            className="mt-5! w-full bg-[#4F46E5] text-white hover:text-black" 
            type="submit"
            disabled={Boolean(passwordConfirm && password !== passwordConfirm)}
          >
            {isSubmitting ? "Registering...." : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Already have an account?
        <Link href="/login" className="text-[#4F46E5] ml-2">
          Login
        </Link>
      </p>
    </div>
  );
}
