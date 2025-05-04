// src/components/RichTextEditor.jsx
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const RichTextEditor = ({ input, setInput }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: input.description || '',
        onUpdate: ({ editor }) => {
            setInput({
                ...input,
                description: editor.getHTML()
            });
        }
    });

    const handleSubmit = () => {
        if (!editor) return;
        console.log('HTML Output:', editor.getHTML());
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-5 bg-gray-900">
            <h1 className="text-2xl font-bold mb-4 text-white">
                Write Your Content Here
            </h1>

            <div className="w-full h-[200px]  mb-4 p-2 rounded overflow-auto ">
                <EditorContent
                    className="w-full h-full text-white border border-gray-700 rounded"
                    placeholder="Write something..."
                    editor={editor}
                />
            </div>

            {/* <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Submit Content
            </button> */}
        </div>
    );
};

export default RichTextEditor;
