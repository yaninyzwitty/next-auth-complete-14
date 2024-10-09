"use client";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {AlertTriangle} from "lucide-react";
import Link from "next/link";

function ErrorPage() {
  return (
    <Card className="w-[400px] p-2">
      <CardHeader className="text-lg font-semibold text-center uppercase">
        WITTY-CARD-PASS
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-col space-y-2">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <p className="text-sm text-red-500">Something went wrong</p>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Link
          href={"/register"}
          className="text-sm hover:underline underline-offset-1 font-medium  tracking-wide"
        >
          Dont have an account already?
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ErrorPage;
