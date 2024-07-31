import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { TabSwitcher } from "@/components/TabSwitcher";

const AuthenticatePage = () => {
  return (
    <div className="relative flex w-full h-screen bg-background">
      <div className="w-full">
        <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
      </div>
    </div>
  );
};
export default AuthenticatePage;
