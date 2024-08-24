import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
	message: string;
	fullScreen?: boolean;
}

export default function Loader({ message, fullScreen = false }: LoaderProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-2",
				fullScreen && "h-screen",
			)}
		>
			<p className="text-lg font-semibold">{message}</p>
			<Loader2 className="animate-spin w-10 h-10" />
		</div>
	);
}
