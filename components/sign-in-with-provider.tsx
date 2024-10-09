import {signIn} from "next-auth/react";
import {Button} from "./ui/button";
import {GitHubLogoIcon} from "@radix-ui/react-icons";

export default function SignInWithProvider() {
  const onClick = () => {
    signIn("github");
  };
  return (
    <Button className="w-full" onClick={onClick}>
      <GitHubLogoIcon className="mr-2 size-4" />
      Sign in With Github
    </Button>
  );
}
