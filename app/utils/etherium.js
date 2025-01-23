import sharp from 'sharp'; // Import the sharp library
import { createHelia } from "@helia/core";
import { unixfs } from "@helia/unixfs";
import { MemoryBlockstore } from "blockstore-core";
import { ethers } from "ethers";

// Initialize Helia instance
let heliaInstance = null;
let fsInstance = null;

// Ethereum setup
const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"); // Replace with your provider
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider); // Replace with your private key
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const abi = [
  "function storeMetadata(string memory imageUrl, uint256 quality) public",
]; // Contract ABI

const contract = new ethers.Contract(contractAddress, abi, signer);

// Function to initialize Helia and UnixFS
const initializeHelia = async () => {
  if (!heliaInstance || !fsInstance) {
    heliaInstance = await createHelia({
      blockstore: new MemoryBlockstore(),
    });
    fsInstance = unixfs(heliaInstance);
  }
};

// Function to upload image to IPFS after resizing
export const uploadToIPFS = async (buffer, quality) => {
  try {
    // Resize the image based on the quality (Sharp will handle the resizing)
    const resizedBuffer = await sharp(buffer)
      .resize({ quality: quality }) // Resize based on the quality parameter
      .toBuffer();

    // Ensure Helia is initialized
    await initializeHelia();

    // Add the resized image to IPFS
    const cid = await fsInstance.addBytes(resizedBuffer);

    // Create IPFS URL
    const ipfsUrl = `https://ipfs.io/ipfs/${cid.toString()}`;

    // Store metadata on Ethereum blockchain
    await storeMetadataOnEthereum(ipfsUrl, quality);

    // Return IPFS URL
    return ipfsUrl;
  } catch (error) {
    console.error("Error uploading to IPFS and storing metadata:", error);
    throw error;
  }
};

// Function to store metadata on Ethereum blockchain
const storeMetadataOnEthereum = async (imageUrl, quality) => {
  try {
    const transaction = await contract.storeMetadata(imageUrl, quality);
    console.log("Metadata stored on Ethereum:", transaction.hash);

    // Wait for the transaction to be mined
    await transaction.wait();
    console.log("Transaction confirmed!");
  } catch (error) {
    console.error("Error storing metadata on Ethereum:", error);
    throw error;
  }
};

// Optional cleanup function (call if you want to stop Helia instance explicitly)
export const stopHelia = async () => {
  if (heliaInstance) {
    await heliaInstance.stop();
    heliaInstance = null;
    fsInstance = null;
  }
};
