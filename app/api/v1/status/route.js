import { PAY_TO } from "../../../../lib/x402";

export async function GET() {
  return Response.json({
    ok: true,
    payTo: PAY_TO,
    network: "solana:mainnet",
    asset: "USDC",
    price: "0.01",
    paid: "GET|POST /api/v1/brief"
  });
}
