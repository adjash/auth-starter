"use client";

import { signUp } from "@/app/authenticate/auth.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "./ui/use-toast";

const SignUpForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = { name, email, password, confirmPassword };

    if (password != confirmPassword) {
      console.log("caught");
      return false;
    }
    const res = await signUp(data);
    if (res.success) {
      router.push("/dashboard");
    } else {
      console.log("error");
    }
  };
  return (
    <div>
      <h1 className="text-4xl">sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">
          Name:
          <input
            className="border mx-2"
            type="text"
            name="name"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </label>
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
            required
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
            required
          />
        </label>

        <label htmlFor="password">
          Confirm password:
          <input
            className="border mx-2"
            type="password"
            name="confirm password"
            id="confirmpassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
        </label>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
export default SignUpForm;
