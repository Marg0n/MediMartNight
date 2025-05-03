"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  orderId: string;
  prescriptionUrl?: string;
  onUploaded: () => void; // optional callback to refresh UI
}

export default function PrescriptionUploader({
  // orderId,
  prescriptionUrl,
  // onUploaded,
}:Props) {
  // const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // File validation
      if (!selectedFile.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
        toast.error("Only JPG, JPEG, PNG, and PDF files are allowed.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds the 5MB limit.");
        return;
      }

      // Set file state and preview state
      setFile(selectedFile);

      // Create file preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string); // This will store the preview URL for images
      };
      reader.readAsDataURL(selectedFile); // For image preview
    }
  };

  // const handleUpload = async () => {
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("prescription", file);
  //   formData.append("orderId", orderId);

  //   setUploading(true);
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_API}/orders/upload-prescription`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       },
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to upload prescription");
  //     }

  //     toast.success("Prescription uploaded successfully!");
  //     onUploaded();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Upload failed!");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm mb-4">
      {prescriptionUrl ? (
        <div className="space-y-1">
          <p className="text-green-600 font-medium">Prescription uploaded!!</p>
          <a
            href={prescriptionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            📎 View Prescription
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="block font-medium text-gray-700">
            Upload Prescription:
          </label>
          <input
            type="file"
            accept="image/*, .pdf"
            onChange={handleFileChange}
            // disabled={uploading}
            className="block w-full border border-gray-300 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />
          {/* Display file preview */}
          {filePreview && (
            <div className="mt-3">
              {file?.type.startsWith("image/") ? (
                <Image
                  src={filePreview}
                  alt="Prescription Preview"
                  className="w-full h-auto max-w-md rounded-md"
                  width={300}
                  height={300}
                />
              ) : file?.type === "application/pdf" ? (
                <a
                  href={filePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  📄 Preview PDF
                </a>
              ) : (
                <p className="text-gray-500">File selected: {file?.name}</p>
              )}
            </div>
          )}
          {/* {uploading && <p className="text-sm text-gray-500">Uploading...</p>} */}
          {/* <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="bg-[#4F46E5] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Prescription"}
          </button> */}
        </div>
      )}
    </div>
  );
}
