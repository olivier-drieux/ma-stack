"use client";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createElement } from "react";

export interface NavItemProps {
	icon: LucideIcon;
	label: string;
	pathname: string;
	isExpanded?: boolean;
	className?: string;
}

export function NavItem({
	icon,
	label,
	pathname,
	isExpanded,
	className,
}: NavItemProps) {
	const isActive = usePathname() === pathname;

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					className={cn(
						"w-full rounded-none",
						className,
						isActive && "bg-accent text-accent-foreground",
						!isExpanded && "justify-center",
					)}
					asChild
				>
					<Link href={pathname}>
						{createElement(icon, { className: "h-4 w-4" })}
						{isExpanded && <span className="ml-2">{label}</span>}
					</Link>
				</Button>
			</TooltipTrigger>
			{!isExpanded && <TooltipContent side="right">{label}</TooltipContent>}
		</Tooltip>
	);
}
