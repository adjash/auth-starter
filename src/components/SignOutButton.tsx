"use client";

import { logOut } from "@/app/authenticate/auth.action";

type Props = {
  children: React.ReactNode;
};
const SignOutButton = ({ children }: Props) => {
  return (
    <div>
      <button
        onClick={() => {
          logOut();
        }}
      >
        {children}
      </button>
    </div>
  );
};
export default SignOutButton;
