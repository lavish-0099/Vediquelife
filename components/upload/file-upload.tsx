"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios, { AxiosError, AxiosProgressEvent } from "axios";

import { Progress } from "@/components/ui/progress";
import UploadDropZone from "@/components/upload/upload-dropzone";
import UploadButton from "@/components/upload/upload-button";

interface FileUploadProps {
  previousImageUrl?: string | null;
  productId?: string | null;
  categoryId?: string | null;
  ingredientId?: string | null;
  successStoryId?: string | null;
  fileType?: string | null;
  successStorycategoryId?: string | null;
  postCategoryId?: string | null;
  postId?: string | null;
  nutritionCoachId?: string | null;
  acceptedFileTypes: string[];
  multiple?: boolean;
  onChange: (fileUrl: string) => void;
  isGallery?: boolean;
}

const FileUpload = ({
  previousImageUrl,
  productId,
  categoryId,
  ingredientId,
  successStoryId,
  fileType,
  successStorycategoryId,
  postId,
  nutritionCoachId,
  postCategoryId,
  acceptedFileTypes,
  multiple,
  onChange,
  isGallery,
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[] | null>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const updateProgressBar = (percent: number): void => {
    setProgress(+percent.toFixed(2));
  };
  const updatePrewiewUrls = (previewUrls: string[]) => {
    setPreviewUrls(previewUrls);
  };
  const updateFile = (files: File[]) => {
    setFiles(files);
  };
  const uploadFileWithProgressBar = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsUploading(true);

    if (!files || files.length === 0) return;

    const isSuccessStoryVideo = fileType === "video" && Boolean(successStoryId);
    try {
      if (isSuccessStoryVideo) {
        // Use presigned S3 upload flow for video
        for (const file of files) {
          const res = await axios.post("/api/s3upload/upload-url", {
            fileName: file.name,
            fileType: file.type,
            folder: `success-stories/${successStoryId}/video`,
          });

          const { url, key, publicUrl } = res.data;

          await axios.put(url, file, {
            headers: {
              "Content-Type": file.type,
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              const { loaded, total } = progressEvent;
              if (total) {
                const percent = Math.floor((loaded * 100) / total);
                updateProgressBar(percent);
              }
            },
          });

          onChange(publicUrl); // or key if you want to save S3 key
        }
      } else {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append(`file${i + 1}`, files[i]);
        }
        formData.append("previousImageUrl", previousImageUrl || "");
        formData.append("productId", productId || "");
        formData.append("categoryId", categoryId || "");
        formData.append("ingredientId", ingredientId || "");
        formData.append("postId", postId || "");
        formData.append("nutritionCoachId", nutritionCoachId || "");
        formData.append("successStorycategoryId", successStorycategoryId || "");
        formData.append("postCategoryId", postCategoryId || "");
        if (isGallery) {
          formData.append("isGallery", "true");
        }
        const response = await axios.post("/api/s3upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const { loaded, total } = progressEvent;
            if (total !== null && total !== undefined) {
              const percent = Math.floor((loaded * 100) / total);
              updateProgressBar(percent);
            } else {
              setProgress(0);
            }
          },
        });
        if (response.status !== 200) {
          toast.error("Something went wrong while uploading file");
          return;
        } else if (response.status === 200) {
          onChange(response.data);
          setIsUploading(false);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while uploading image";

        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <div>
      <form className="w-full p-3 border border-gray-500 border-dashed rounded-md">
        <UploadDropZone
          updatePrewiewUrls={updatePrewiewUrls}
          multiple={multiple}
          acceptedFileTypes={acceptedFileTypes}
          updateFile={updateFile}
        />
        <div className="flex items-center justify-center mt-2">
          {progress > 0 && (
            <Progress value={progress} className="w-full bg-emerald-500" />
          )}
        </div>
        <div className="flex items-center mt-4  justify-center">
          <UploadButton
            previewUrls={previewUrls}
            onClick={uploadFileWithProgressBar}
            isUploading={isUploading}
          />
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
