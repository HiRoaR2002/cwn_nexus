import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch("https://api.coincap.io/v2/assets");
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow frontend access
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch crypto prices" });
  }
}
