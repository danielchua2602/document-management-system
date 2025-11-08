import { DocumentApi } from "@/api/DocumentsApi";
import { getQueryClient } from "@/lib/queryClient";
import { UploadFileFormData, UploadFileRequest } from "@/types/Documents";
import { SupportedFileType } from "@/types/SupportedFiles";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useUploadFile = ({ onClose }: { onClose: () => void }) => {
  const queryClient = getQueryClient();

  const [formData, setFormData] = useState<UploadFileFormData>({
    title: "",
    type: "",
    size: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const uploadFileMutation = useMutation({
    mutationFn: (file: UploadFileRequest) => {
      const { uploadFiles } = DocumentApi();
      return uploadFiles(file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  // Simple Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Document title is required";
    }

    if (!formData.type) {
      newErrors.type = "File type is required";
    }

    if (!formData.size.toString().trim()) {
      newErrors.size = "File size is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const mapFormDataToRequest = (data: UploadFileFormData): UploadFileRequest => ({
      title: data.title,
      type: data.type as SupportedFileType,
      size: Number(data.size),
      // Generate some random base64 content for simulation
      content: btoa(`Simulated content for file: ${data.title}`),
    });

    await uploadFileMutation
      .mutateAsync(mapFormDataToRequest(formData))
      .then(() => handleClose())
      .catch(() => console.error("Error uploading file"));
  };

  const handleClose = () => {
    setFormData({ title: "", type: "", size: "" });
    setErrors({});
    onClose();
  };

  return {
    formData,
    setFormData,
    errors,
    handleSubmit,
    handleClose,
    mutationStates: {
      isPending: uploadFileMutation.isPending,
      isError: uploadFileMutation.isError,
    },
  };
};
