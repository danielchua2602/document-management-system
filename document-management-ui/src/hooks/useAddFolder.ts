import { DocumentApi } from "@/api/DocumentsApi";
import { getQueryClient } from "@/lib/queryClient";
import { AddFolderRequest } from "@/types/Documents";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useAddFolder = ({ onClose }: { onClose: () => void }) => {
  const queryClient = getQueryClient();
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const addFolderMutation = useMutation({
    mutationFn: (folder: AddFolderRequest) => {
      const { addFolder } = DocumentApi();
      return addFolder(folder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      handleClose();
    },
    onError: (error) => {
      console.error("Failed to add folder:", error);
    },
  });

  const validateForm = () => {
    if (!name.trim()) {
      setError("Folder name is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const folderRequest: AddFolderRequest = {
      title: name.trim(),
    };

    addFolderMutation.mutate(folderRequest);
  };

  const handleClose = () => {
    setName("");
    setError("");
    addFolderMutation.reset();
    onClose();
  };

  return {
    setName,
    name,
    formError: error,
    handleClose,
    handleSubmit,
    mutationStates: {
      isPending: addFolderMutation.isPending,
      isError: addFolderMutation.isError,
    },
  };
};
