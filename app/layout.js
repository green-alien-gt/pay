export const metadata = {
  title: "green alien pay",
  description: "x402 paid API. USDC on Solana.",
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#070908" }}>{children}</body>
    </html>
  );
}
