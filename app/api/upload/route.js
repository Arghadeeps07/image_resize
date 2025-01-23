import { storeMetadataOnEthereum } from "../../utils/ethereum"; // Adjust path if needed

export const uploadToIPFS = async (buffer, quality) => {
  try {
    // Add the buffer to IPFS (Helia integration code)
    const cid = await fsInstance.addBytes(buffer);
    const ipfsUrl = `https://ipfs.io/ipfs/${cid.toString()}`;

    // Store metadata on Ethereum blockchain
    await storeMetadataOnEthereum(ipfsUrl, quality);

    return ipfsUrl;
  } catch (error) {
    console.error("Error uploading to IPFS and storing metadata:", error);
    throw error;
  }
};
