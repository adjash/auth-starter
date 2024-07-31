"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
type Props = {
  SignUpTab: React.ReactNode;
  SignInTab: React.ReactNode;
};
export const TabSwitcher = (props: Props) => {
  return (
    <Tabs className="max-w-[500px]" defaultValue="sign-up">
      <TabsList>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-up">{props.SignUpTab}</TabsContent>
      <TabsContent value="sign-in">{props.SignInTab}</TabsContent>
    </Tabs>
  );
};
