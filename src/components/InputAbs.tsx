import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Props = {
  className: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputAbs = ({ className, value, onChange }: Props) => {
  return (
    <div className={`flex  items-center ${className}`}>
      <Input value={value} onChange={onChange} className="px-8.5" />
      <Search className="absolute text-gray-400 m-2 h-5 w-5" />
    </div>
  );
};

export default InputAbs;
