export async function GET() {
  return Response.json({
    ok: true,
    payTo: "7riVDmqQMF9vtVGALdQxFL4tJbArEsfpspoJZuNPh1Rc",
    network: "solana:mainnet",
    asset: "USDC",
    price: "0.01",
    paid: "GET /api/v1/brief"
  });
}
