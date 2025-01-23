const MetadataViewer = ({ metadata }) => {
    if (!metadata.length) return <p>No metadata found.</p>;
  
    return (
      <div className="mt-4">
        <h3>Image Metadata:</h3>
        <ul>
          {metadata.map((data, index) => (
            <li key={index} className="border p-2 mb-2">
              <p>IPFS URL: <a href={data.ipfsUrl} target="_blank">{data.ipfsUrl}</a></p>
              <p>Quality: {data.quality}%</p>
              <p>Timestamp: {new Date(data.timestamp * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MetadataViewer;
  