import React, {PropsWithChildren} from "react";

function AuthLayout({children}: PropsWithChildren<object>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-400 to-green-800">
      {children}
    </div>
  );
}

export default AuthLayout;
