"use client";
import React from "react";
import {Button} from "./ui/button";
import {signOut} from "next-auth/react";

function SignOutButton() {
  return (
    <Button onClick={() => signOut({redirectTo: "/login"})}>
      SignOutButton
    </Button>
  );
}

export default SignOutButton;
