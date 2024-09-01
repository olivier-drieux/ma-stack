"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
	Briefcase,
	ChevronLeft,
	ChevronRight,
	Home,
	LogIn,
	LogOut,
	MenuIcon,
	Newspaper,
} from "lucide-react";
import { useState } from "react";
import { NavItem, type NavItemProps } from "./NavItem";
import { useSession } from "next-auth/react";

const navItemsProps: Record<string, NavItemProps> = {
	home: {
		icon: Home,
		label: "Home",
		pathname: "/",
	},
	posts: {
		icon: Newspaper,
		label: "Posts",
		pathname: "/posts",
	},
	login: {
		icon: LogIn,
		label: "Sign in",
		pathname: "/api/auth/signin",
	},
	logout: {
		icon: LogOut,
		label: "Sign out",
		pathname: "/api/auth/signout",
	},
};

export default function Header() {
	const [isExpanded, setIsExpanded] = useState(true);
	const [isSheetOpen, setIsSHeetOpen] = useState(false);
	const session = useSession();

	return (
		<>
			<nav>
				<div
					className={cn(
						"h-full hidden sm:flex flex-col border-r border-border transition-all duration-300 relative",
						isExpanded ? "w-64" : "w-16",
					)}
				>
					<div className="flex items-center justify-center h-16 border-b border-border">
						<Briefcase />
					</div>
					<div className="flex-1 overflow-y-auto">
						<NavItem
							{...navItemsProps.home}
							isExpanded={isExpanded}
							className="self-start"
						/>
						<NavItem
							{...navItemsProps.posts}
							isExpanded={isExpanded}
							className="self-start"
						/>
					</div>
					{session.status === "authenticated" ? (
						<NavItem
							{...navItemsProps.logout}
							isExpanded
							className="border-t border-border mt-auto self-start"
						/>
					) : (
						<NavItem
							{...navItemsProps.login}
							isExpanded
							className="border-t border-border mt-auto self-start"
						/>
					)}
					<Button
						variant="ghost"
						size="icon"
						className="absolute top-6 -right-3 h-6 w-6 rounded-full bg-background border border-border"
						onClick={() => setIsExpanded(!isExpanded)}
					>
						{isExpanded ? (
							<ChevronLeft className="h-4 w-4" />
						) : (
							<ChevronRight className="h-4 w-4" />
						)}
					</Button>
				</div>
				<div className="flex sm:hidden items-center justify-between p-2 border-b border-border transition-all duration-300 relative">
					<Briefcase className="ml-4" />
					<Sheet open={isSheetOpen} onOpenChange={setIsSHeetOpen}>
						<SheetTrigger asChild>
							<Button size="sm" variant="ghost">
								<MenuIcon />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-screen lg:max-w-xs">
							<nav className="flex flex-col items-center gap-1 h-full">
								<Briefcase />
								<NavItem {...navItemsProps.home} isExpanded className="mt-4" />
								<NavItem {...navItemsProps.posts} isExpanded />
								{session.status === "authenticated" ? (
									<NavItem
										{...navItemsProps.logout}
										isExpanded
										className="mt-auto text-center"
									/>
								) : (
									<NavItem
										{...navItemsProps.login}
										isExpanded
										className="mt-auto text-center"
									/>
								)}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</>
	);
}
