import React from "react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-center p-2.5 items-center border-b sticky top-0 z-50 bg-white dark:bg-[#0A0A0A]">
      <div className="flex items-center gap-3">
        <NavLink to="/">
          <h2>Ewan basta logo to</h2>
        </NavLink>
        <NavLink to="/">
          <Button className="flex  items-center py-0 m-0">Home</Button>
        </NavLink>
        <NavLink to="/">
          <Button variant="ghost">Your Library</Button>
        </NavLink>
        <NavLink to="/">
          <Button variant="ghost">Profile</Button>
        </NavLink>
      </div>
      <div className="flex w-1/3 mx-8 items-center ">
        <Input className="" />
        <Search className="absolute text-gray-400 m-2 h-5 w-5" />
      </div>
      <div className="flex gap-2">
        <Button>Create New</Button>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
