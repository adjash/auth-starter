import SignOutButton from "@/components/SignOutButton";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/authenticate");
  }
  return (
    <div>
      logged in as: {user.name}
      <SignOutButton>Sign Out</SignOutButton>
    </div>
  );
};
export default DashboardPage;
