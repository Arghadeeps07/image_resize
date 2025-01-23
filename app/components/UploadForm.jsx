import { useState } from "react";

const UploadForm = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [quality, setQuality] = useState(80);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image.");
    onUpload(image, quality);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <label>
        Quality (%):
        <input
          type="number"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          min="10"
          max="100"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Upload & Resize
      </button>
    </form>
  );
};

export default UploadForm;
