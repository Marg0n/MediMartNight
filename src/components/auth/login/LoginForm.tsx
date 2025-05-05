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
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import {
  // useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  // react hook form
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  // toggle password
  const [showPassword, setShowPassword] = useState(false);

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  // const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // reCaptchaStatus check
    if (!reCaptchaStatus) {
      toast.error("Please complete the reCAPTCHA first.");
      return; // Block submission
    }

    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", res?.token);
        }
        console.log(res?.token);
        window.location.href = redirect || "/";

        // router.push(redirect || "/");
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
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back dear user!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

          <div className="flex mt-3 w-full">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
              onChange={handleReCaptcha}
              onExpired={() => setReCaptchaStatus(false)}
              className="mx-auto"
            />
          </div>

          {/* <CustomButton
            disabled={reCaptchaStatus ? false : true}
            type="submit"
            className="mt-5! w-full"
            textName={isSubmitting ? "Logging...." : "Login"}
          /> */}
          <Button 
            variant="outline" 
            className="mt-5! w-full bg-[#4F46E5] text-white hover:text-black" 
            type="submit"
            disabled={reCaptchaStatus ? false : true}
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account?
        <Link href="/register" className="text-[#4F46E5] ml-2">
          Register
        </Link>
      </p>
    </div>
  );
}
