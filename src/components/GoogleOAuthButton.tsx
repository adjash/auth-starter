"use client";
import { RiGoogleFill } from "@remixicon/react";
const GoogleOAuthButton = () => {
  return (
    <button
      onClick={() => {
        console.log("logging in with google");
      }}
    >
      <RiGoogleFill className="w-10 h-4" />
    </button>
  );
};
export default GoogleOAuthButton;
