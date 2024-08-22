"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { type DetailedHTMLProps, type HTMLAttributes, forwardRef } from "react";
import MenuBar from "./MenuBar";

interface TextEditorProps
	extends Omit<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		"onChange"
	> {
	value?: string | null;
	onChange?: (html: string) => void;
}

const extensions = [
	StarterKit.configure({
		orderedList: {
			HTMLAttributes: {
				class: "list-decimal pl-4",
			},
		},
		bulletList: {
			HTMLAttributes: {
				class: "list-disc pl-4",
			},
		},
		heading: {
			HTMLAttributes: {
				class: "tiptap-heading",
			},
			levels: [2, 3],
		},
	}),
	TextAlign.configure({
		types: ["heading", "paragraph"],
	}),
];

const TextEditor = forwardRef<HTMLDivElement, TextEditorProps>(
	({ value, onChange, ...props }, ref) => {
		const editor = useEditor({
			extensions,
			content: value,
			onUpdate: onChange
				? ({ editor }) =>
						"<p></p>" === editor.getHTML()
							? onChange("")
							: onChange(editor.getHTML())
				: undefined,
			immediatelyRender: false,
			editorProps: {
				attributes: {
					class: "overflow-auto h-full",
				},
			},
		});

		return (
			<div
				{...props}
				ref={ref}
				className={cn(
					"flex flex-col",
					props.className,
					"rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
				)}
			>
				{editor ? (
					<>
						<MenuBar editor={editor} />
						<EditorContent
							editor={editor}
							className="flex-1 min-h-48 overflow-auto relative px-3 py-2"
						/>
					</>
				) : (
					<>
						<Skeleton className="h-9 w-full mb-2" />
						<Skeleton className="flex-1 min-h-48 w-full" />
					</>
				)}
			</div>
		);
	},
);

TextEditor.displayName = "TextEditor";

export default TextEditor;
