import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const InputAbs = ({ className }: { className?: string }) => {
  return (
    <div className={`flex  items-center ${className}`}>
      <Input className="px-8.5" />
      <Search className="absolute text-gray-400 m-2 h-5 w-5" />
    </div>
  );
};

export default InputAbs;
