import {auth} from "@/auth";
import SignOutButton from "@/components/sign-out-button";
import React from "react";

async function Settingspage() {
  const session = await auth();
  console.log({session});
  return (
    <div>
      <SignOutButton />
    </div>
  );
}

export default Settingspage;
