import {AlertTriangle} from "lucide-react";
import React from "react";

function FormError({message}: {message: string}) {
  if (!message) return;

  return (
    <div className="p-3 bg-rose-500/15 text-red-500 rounded-md flex items-center space-x-3">
      <AlertTriangle className="size-4" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default FormError;
