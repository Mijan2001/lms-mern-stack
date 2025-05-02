// // src/components/RichTextEditor.jsx
// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const RichTextEditor = ({ input, setInput }) => {
//     const [value, setValue] = useState('');

//     const handleChange = content => {
//         setInput({
//             ...input,
//             description: content
//         });
//     };

//     const handleSubmit = () => {
//         console.log('HTML Output:', content); // You can send this to backend
//     };

//     return (
//         <div className="max-w-3xl mx-auto mt-10 bg-white p-5 rounded-lg shadow-md">
//             <h1 className="text-2xl font-bold mb-4 text-gray-700">
//                 📝 Rich Text Editor
//             </h1>

//             <ReactQuill
//                 value={input.description}
//                 onChange={handleChange}
//                 theme="snow"
//                 className="min-h-[200px] mb-4"
//             />

//             <button
//                 onClick={handleSubmit}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//                 Submit Content
//             </button>
//         </div>
//     );
// };

// export default RichTextEditor;
