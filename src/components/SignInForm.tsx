"use client";

import { signIn } from "@/app/authenticate/auth.action";
import { UserDataSignInSchema } from "@/types/UserData";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data: UserDataSignInSchema = { email, password };
    const res = await signIn(data);

    if (res.success) {
      router.push("/successful");
    } else {
      console.log("error on frontned");
    }
    console.log(res);
  };
  return (
    <div>
      <h1 className="text-4xl">sign in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            className="border mx-2"
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>

        <label htmlFor="password">
          password:
          <input
            className="border mx-2"
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
export default SignInForm;
