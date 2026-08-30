import { withSolanaPay402 } from "solana-pay-x402/nextjs";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import {
  PAY_TO,
  USDC,
  SERVICE_NAME,
  TAGS,
  BRIEF,
  briefOutputExample
} from "../../../../lib/x402";

const inputSchema = {
  properties: {
    query: {
      type: "string",
      description: "What you want done. Optional."
    }
  }
};

const output = {
  example: briefOutputExample("scoped job"),
  schema: {
    type: "object",
    properties: {
      ok: { type: "boolean" },
      query: { type: "string" },
      brief: { type: "string" }
    },
    required: ["ok", "brief"]
  }
};

const getDiscovery = declareDiscoveryExtension({
  input: { query: "scoped job" },
  inputSchema,
  output
});

const postDiscovery = declareDiscoveryExtension({
  input: { query: "scoped job" },
  inputSchema,
  bodyType: "json",
  output
});

function bazaarFor(method) {
  const declared = method === "POST" ? postDiscovery : getDiscovery;
  const bazaar = structuredClone(declared.bazaar);
  if (bazaar.info && bazaar.info.input) {
    bazaar.info.input.method = method;
  }
  const inputProps = bazaar.schema && bazaar.schema.properties && bazaar.schema.properties.input;
  if (inputProps && inputProps.properties) {
    inputProps.properties.method = { type: "string", enum: [method] };
    const required = inputProps.required || [];
    if (!required.includes("method")) required.push("method");
    inputProps.required = required;
  }
  return bazaar;
}

function withBazaar(handler) {
  return async (req) => {
    const res = await handler(req);
    if (res.status !== 402) return res;
    let body;
    try {
      body = await res.json();
    } catch {
      return res;
    }
    if (body.resource && typeof body.resource === "object") {
      body.resource.serviceName = SERVICE_NAME;
      body.resource.tags = TAGS;
    }
    body.extensions = { ...(body.extensions || {}), bazaar: bazaarFor(req.method) };
    const headers = new Headers(res.headers);
    const { solanaPay, ...paymentRequired } = body;
    headers.set(
      "PAYMENT-REQUIRED",
      Buffer.from(JSON.stringify(paymentRequired)).toString("base64")
    );
    headers.set("Content-Type", "application/json");
    headers.set("X-Robots-Tag", "all");
    return new Response(JSON.stringify({ ...paymentRequired, solanaPay }), {
      status: 402,
      headers
    });
  };
}

const handler = async (req) => {
  let query = "";
  try {
    query = new URL(req.url).searchParams.get("query") || "";
  } catch {}
  if (!query && req.method === "POST") {
    try {
      const body = await req.json();
      if (body && typeof body.query === "string") query = body.query;
    } catch {}
  }
  return Response.json({
    ok: true,
    ...(query ? { query } : {}),
    brief: BRIEF
  });
};

const paid = withBazaar(
  withSolanaPay402(handler, {
    rpcUrl: "https://api.mainnet-beta.solana.com",
    recipient: PAY_TO,
    network: "mainnet-beta",
    label: "green alien",
    message: "v1/brief",
    splToken: { mint: USDC, decimals: 6 },
    getPaymentAmount: () => 10000
  })
);

export const GET = paid;
export const POST = paid;
