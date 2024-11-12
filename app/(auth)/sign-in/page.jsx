"use client";
import React, { useEffect, useState } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("jwt");
    if (user) {
      router.push("/");
    }
  });

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.signInUser(email, password).then(
      (resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        localStorage.setItem("jwt", resp.data.jwt);
        router.push("/");
        toast("Logged In Successfully.");
        setLoader(false);
      },
      (e) => {
        toast(e?.response?.data?.error?.message);
        setLoader(false);
      }
    );
  };
  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src={Logo.src} alt="logo" width={100} height={100} />
        <h2 className="font-bold text-2xl">Sign In</h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button onClick={() => onSignIn()} disabled={!(email || password)}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>
          <p>
            Don't have an Account?
            <Link href="/create-account" className="text-green-800">
              {" "}
              Click here to Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
