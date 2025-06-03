import React from "react";
import { CheckCircle2Icon } from "lucide-react";

const ToastSuccessForm = ({ message }: { message: string }) => {
  return (
    <>
      <span className="flex gap-2 dark:bg-gray-200 dark:text-black bg-black text-gray-200 py-2 px-4 rounded-xl items-center text-center">
        <CheckCircle2Icon className="w-4 h-4 " />
        {message}
      </span>
    </>
  );
};

export default ToastSuccessForm;
