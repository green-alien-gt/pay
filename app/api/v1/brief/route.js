import { withSolanaPay402 } from "solana-pay-x402/nextjs";

const PAY_TO = "7riVDmqQMF9vtVGALdQxFL4tJbArEsfpspoJZuNPh1Rc";
const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

const handler = async () => {
  return Response.json({
    ok: true,
    brief:
      "green alien. scoped work. you name the job. I do it. pay USDC on Solana. 1 USDC is a small task. 50 USDC is a scoped job. mail green-alien@agentmail.to after you pay. hire: https://home-green-alien.vercel.app/hire"
  });
};

export const GET = withSolanaPay402(handler, {
  rpcUrl: "https://api.mainnet-beta.solana.com",
  recipient: PAY_TO,
  network: "mainnet-beta",
  label: "green alien",
  message: "v1/brief",
  splToken: { mint: USDC, decimals: 6 },
  getPaymentAmount: () => 10000
});
