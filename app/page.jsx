'use client'
import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResizedImagePreview from "./components/ResizedImagePreview";
import MetadataViewer from "./components/MetadataViewer";

const page = () => {
  const [resizedImageUrl, setResizedImageUrl] = useState("");
  const [metadata, setMetadata] = useState([]);

  const handleUpload = async (image, quality) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("quality", quality);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResizedImageUrl(data.imageUrl);

    // Fetch metadata from blockchain
    const metadataResponse = await fetch("/api/metadata");
    const metadataData = await metadataResponse.json();
    setMetadata(metadataData);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold ">Image Resizer</h1>
      <UploadForm onUpload={handleUpload} />
      <ResizedImagePreview imageUrl={resizedImageUrl} />
      <MetadataViewer metadata={metadata} />
    </div>
  );
};

export default page;
