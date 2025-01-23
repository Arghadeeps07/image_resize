import { getMetadataFromBlockchain } from '../../../utils/blockchain'; // Blockchain function

export async function GET(request) {
  try {
    const metadata = await getMetadataFromBlockchain();
    return new Response(JSON.stringify(metadata), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve metadata' }), { status: 500 });
  }
}
