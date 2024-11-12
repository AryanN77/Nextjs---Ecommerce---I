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

function CreateAccount() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("jwt");
    if (user) {
      router.push("/");
    }
  });

  const onCreateAccount = () => {
    GlobalApi.registerUser(username, email, password).then(
      (resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        localStorage.setItem("jwt", resp.data.jwt);
        router.push("/");
        toast("Acoount created Successfully.");
      },
      (e) => {
        toast(e?.response?.data?.error?.message);
      }
    );
  };
  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src={Logo.src} alt="logo" width={100} height={100} />
        <h2 className="font-bold text-2xl">Create an Account</h2>
        <h2 className="text-gray-600">
          Enter Your Email & Password to Create an Account
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <Button
            onClick={() => onCreateAccount()}
            disabled={!(username || email || password)}
          >
            {loader ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Create an Account"
            )}
          </Button>
          <p>
            Already have an Account?
            <Link href="/sign-in" className="text-green-800">
              {" "}
              Click here to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
