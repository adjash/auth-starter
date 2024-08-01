import SignOutButton from "@/components/SignOutButton";
import { getUser } from "@/lib/lucia";
import Image from "next/image";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/authenticate");
  }
  return (
    <div>
      logged in as: {user.name}
      {user.picture && (
        <Image alt="" width={40} height={40} src={user.picture} />
      )}
      <SignOutButton>Sign Out</SignOutButton>
    </div>
  );
};
export default DashboardPage;
