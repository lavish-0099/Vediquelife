"use client";

import { useEffect, useState } from "react";
import {
  Boxes,
  CircleDollarSign,
  CircleUserRound,
  CookingPot,
  Home,
  Settings,
  ShoppingBag,
  UserRound,
  WheatOff,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LoginButton } from "@/components/auth/login-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { getSession, useSession } from "next-auth/react";

export const UserButton = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const user = useCurrentUser();
  const pathname = usePathname();

  // Fetch session once on component mount
  useEffect(() => {
    const getSessionData = async () => {
      const session = await getSession();
      if (session?.user?.image) {
        const timestamp = new Date().getTime();
        setImageUrl(`${session.user.image}?t=${timestamp}`);
      }
    };

    getSessionData();
  }, []);

  // Update imageUrl when user.image changes
  useEffect(() => {
    if (user?.image) {
      const timestamp = new Date().getTime();
      setImageUrl(`${user.image}?t=${timestamp}`);
    }
  }, [user?.image]);

  const getFallbackInitial = (name: string | null | undefined): string => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      {!user ? (
        <LoginButton>
          <div className="p-2 border border-slate-300 hover:border-webprimary rounded-full cursor-pointer">
            <CircleUserRound className="size-6 text-gray-700 hover:text-webprimary" />
          </div>
        </LoginButton>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer size-10">
              <AvatarImage src={imageUrl} className="size-10" />
              <AvatarFallback className="text-emred-500 bg-webprimary text-white text-xl font-semibold">
                {getFallbackInitial(user.name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48" align="end">
            <Link href="/user/dashboard">
              <DropdownMenuItem className="cursor-pointer">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </DropdownMenuItem>
            </Link>
            <Link href="/user/profile">
              <DropdownMenuItem className="cursor-pointer">
                <UserRound className="h-4 w-4 mr-2" />
                My Profile
              </DropdownMenuItem>
            </Link>

            <Link href="/user/orders">
              <DropdownMenuItem className="cursor-pointer">
                <ShoppingBag className="h-4 w-4 mr-2" />
                My Orders
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem className="cursor-pointer">
              <ExitIcon className="h-4 w-4 mr-2" />
              <LogoutButton callbackUrl={pathname}>Logout</LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
