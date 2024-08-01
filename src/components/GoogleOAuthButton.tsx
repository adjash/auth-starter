"use client";
import { getGoogleOauthConsentUrl } from "@/app/authenticate/auth.action";
import { RiGoogleFill } from "@remixicon/react";
const GoogleOAuthButton = () => {
  return (
    <button
      onClick={async () => {
        const res = await getGoogleOauthConsentUrl();
        if (res.url) {
          window.location.href = res.url;
        } else {
          console.log("error");
        }
        console.log(res);
        console.log("logging in with google");
      }}
    >
      <RiGoogleFill className="w-10 h-4" />
    </button>
  );
};
export default GoogleOAuthButton;
