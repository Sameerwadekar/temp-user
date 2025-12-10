"use client";

import { CircleUserRound } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Context/LoginContext";

export function DropdownMenuDialog() {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const { token, user, logOutUser} = useLogin();
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            size="icon-sm"
            className="cursor-pointer"
          >
            <CircleUserRound />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 my-4" align="end">
          {token ? (
            <>
              {/* <p>{user?.name}</p> */}
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">My profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">My Orders</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>{logOutUser()}} className="cursor-pointer">Log Out</DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          ) : (
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem  className="cursor-pointer"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign Up
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
