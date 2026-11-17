"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const Editor = ({ value, onChange }: EditorProps) => {
  const [editorHtml, setEditorHtml] = useState(value);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const imageUrl = await uploadImage(file); // Upload logic
        insertToEditor(imageUrl);
      }
    };
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("imageType", "postImage");
    const response = await axios.post("/api/s3upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data[0]; // Return the S3 URL of the uploaded file
  };

  const insertToEditor = (url: string) => {
    const quillInstance = document.querySelector(".ql-editor"); // Access editor container
    if (quillInstance) {
      const imgTag = `<img src="${url}" alt="uploaded-image" />`;
      const range = window.getSelection()?.getRangeAt(0); // Get cursor position

      if (range) {
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = imgTag;
        const node = tempContainer.firstChild;
        if (node) {
          range.insertNode(node); // Insert image at cursor
          range.collapse(false); // Move cursor after the image
        }
      }

      const updatedHtml = quillInstance.innerHTML;
      setEditorHtml(updatedHtml);
      onChange(updatedHtml); // Pass updated content to parent
    }
  };

  const convertYoutubeLinksToEmbed = (html: string) => {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+)/g;

    return html.replace(youtubeRegex, (match, videoId) => {
      return `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    });
  };

  const handleEditorChange = (content: string) => {
    const updatedContent = convertYoutubeLinksToEmbed(content);
    setEditorHtml(updatedContent);
    onChange(updatedContent);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          ["link", "image"],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
    }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleEditorChange}
        modules={modules}
      />
    </div>
  );
};
