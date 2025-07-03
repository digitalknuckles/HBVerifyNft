// /api/check-nfts.js

export default async function handler(req, res) {
  const { address, slug, chain = "matic" } = req.query;

  if (!address || !slug) {
    return res.status(400).json({ error: "Missing address or slug" });
  }

  try {
    const apiUrl = `https://api.opensea.io/api/v2/chain/${chain}/account/${address}/nfts?collection=${slug}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Allow all origins (CORS header)
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(data);
  } catch (err) {
    console.error("OpenSea fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch from OpenSea" });
  }
}
