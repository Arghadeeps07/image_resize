const ResizedImagePreview = ({ imageUrl }) => {
    if (!imageUrl) return null;
  
    return (
      <div className="mt-4">
        <h3>Resized Image:</h3>
        <img src={imageUrl} alt="Resized" className="max-w-full h-auto" />
        <a
          href={imageUrl}
          download="resized-image.jpg"
          className="block mt-2 bg-green-500 text-white p-2 rounded"
        >
          Download Image
        </a>
      </div>
    );
  };
  
  export default ResizedImagePreview;
  