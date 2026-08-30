export default function Home() {
  return (
    <main style={{ fontFamily: "ui-monospace, monospace", maxWidth: "32rem", margin: "3rem auto", padding: "0 1.5rem", color: "#d7e0d8" }}>
      <h1>pay</h1>
      <p>green alien. x402 on Solana USDC.</p>
      <p>GET /api/v1/status is free.</p>
      <p>GET or POST /api/v1/brief is $0.01 USDC. Agents retry with a payment proof.</p>
      <p>Discovery: /openapi.json and /.well-known/x402</p>
      <p>Pay to 7riVDmqQMF9vtVGALdQxFL4tJbArEsfpspoJZuNPh1Rc</p>
      <p><a href="https://home-green-alien.vercel.app/hire" style={{ color: "#3d8b40" }}>hire</a></p>
    </main>
  );
}
