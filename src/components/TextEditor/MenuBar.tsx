import type { Editor } from "@tiptap/react";
import {
	Heading2,
	Heading3,
	Bold,
	Italic,
	Strikethrough,
	List,
	ListOrdered,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Separator } from "../ui/separator";

export default function MenuBar({ editor }: { editor: Editor }) {
	return (
		<div className="flex items-center flex-wrap gap-1 bg-input py-1 px-2 rounded-t-md">
			<Toggle
				size="sm"
				pressed={editor.isActive("heading", { level: 2 })}
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			>
				<Heading2 className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("heading", { level: 3 })}
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
			>
				<Heading3 className="h-4 w-4" />
			</Toggle>
			<Separator orientation="vertical" className="h-5 bg-accent" />
			<Toggle
				size="sm"
				pressed={editor.isActive("bold")}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("italic")}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("strike")}
				onClick={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough className="h-4 w-4" />
			</Toggle>
			<Separator orientation="vertical" className="h-5 bg-accent" />
			<Toggle
				size="sm"
				pressed={editor.isActive("bulletList")}
				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
			>
				<List className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("orderedList")}
				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<ListOrdered className="h-4 w-4" />
			</Toggle>
			<Separator orientation="vertical" className="h-5 bg-accent" />
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "left" })}
				onClick={() => editor.chain().focus().setTextAlign("left").run()}
			>
				<AlignLeft className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "center" })}
				onClick={() => editor.chain().focus().setTextAlign("center").run()}
			>
				<AlignCenter className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "right" })}
				onClick={() => editor.chain().focus().setTextAlign("right").run()}
			>
				<AlignRight className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "justify" })}
				onClick={() => editor.chain().focus().setTextAlign("justify").run()}
			>
				<AlignJustify className="h-4 w-4" />
			</Toggle>
		</div>
	);
}
