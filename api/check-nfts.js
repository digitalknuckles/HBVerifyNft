export default async function handler(req, res) {
  const { chain, address, slug } = req.query;

  if (!chain || !address || !slug) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  const openseaUrl = `https://api.opensea.io/api/v2/chain/${chain}/account/${address}/nfts?collection=${slug}`;

  try {
    const response = await fetch(openseaUrl, {
      headers: {
        "Accept": "application/json",
        "X-API-KEY": process.env.OPENSEA_API_KEY,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();

    // Normalize response for frontend
    res.status(200).json({
      nfts: data.nfts || data.assets || [],
    });
  } catch (error) {
    res.status(500).json({ error: "Fetch failed", details: error.message });
  }
}
