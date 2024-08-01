import GoogleOAuthButton from "@/components/GoogleOAuthButton";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { TabSwitcher } from "@/components/TabSwitcher";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

const AuthenticatePage = async () => {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="relative flex w-full h-screen bg-background">
      <div className="w-full">
        <GoogleOAuthButton />
        <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
      </div>
    </div>
  );
};
export default AuthenticatePage;
