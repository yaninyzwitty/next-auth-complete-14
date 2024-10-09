import {CheckCircle} from "lucide-react";

function FormSuccess({message}: {message: string}) {
  if (!message) return;

  return (
    <div className="p-3 bg-emerald-500/15 text-emerald-500 flex items-center space-x-3">
      <CheckCircle className="size-4 text-emerald-500" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default FormSuccess;
