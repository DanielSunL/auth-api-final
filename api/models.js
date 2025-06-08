/**
 *   Versel에 등록 models.js
 */

export default async function handler(req, res) {
  const origin = req.query.origin || req.headers.origin || "*";

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ status: "error", message: "허용되지 않은 메서드입니다." });
  }

  const url = `https://script.google.com/macros/s/AKfycbyfXjI9QjwvOVJ_W-nrbmG_sZcjodAErwTlehLP1F3kznA_EAocaJm-G8R4FuYGapd2/exec?action=models&origin=${encodeURIComponent(origin)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Vary", "Origin");

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ status: "error", message: "모델 조회 실패", error: error.message });
  }
}
