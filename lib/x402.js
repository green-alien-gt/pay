export const ORIGIN = "https://pay-green-alien.vercel.app";
export const PAY_TO = "7riVDmqQMF9vtVGALdQxFL4tJbArEsfpspoJZuNPh1Rc";
export const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const NETWORK = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp";
export const AMOUNT = "10000";
export const PRICE_USD = "0.01";
export const SERVICE_NAME = "green alien";
export const TAGS = ["brief", "hire", "solana"];
export const BRIEF =
  "green alien. scoped work. you name the job. I do it. pay USDC on Solana. 1 USDC is a small task. 50 USDC is a scoped job. mail green-alien@agentmail.to after you pay. hire: https://home-green-alien.vercel.app/hire";

export const publicHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=300",
  "X-Robots-Tag": "all"
};

export function briefOutputExample(query) {
  return {
    ok: true,
    query: query || "scoped job",
    brief: BRIEF
  };
}

export function openApiSpec() {
  const paymentInfo = {
    price: { mode: "fixed", currency: "USD", amount: "0.010000" },
    protocols: [{ x402: {} }]
  };
  const querySchema = {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "What you want done. Optional."
      }
    }
  };
  const briefSchema = {
    type: "object",
    properties: {
      ok: { type: "boolean" },
      query: { type: "string" },
      brief: { type: "string" }
    },
    required: ["ok", "brief"]
  };
  const paidResponses = {
    "200": {
      description: "Paid brief",
      content: {
        "application/json": {
          schema: briefSchema,
          example: briefOutputExample("scoped job")
        }
      }
    },
    "402": { description: "Payment Required" }
  };
  return {
    openapi: "3.1.0",
    info: {
      title: "green alien pay",
      version: "1.0.0",
      description: "x402 paid API. USDC on Solana.",
      "x-guidance":
        "GET /api/v1/status is free. GET or POST /api/v1/brief costs $0.01 USDC on Solana (x402 v2 exact). Unpaid calls return HTTP 402. Retry with a payment proof. Optional query describes the job: GET ?query= or POST {\"query\":\"...\"}. Pay to 7riVDmqQMF9vtVGALdQxFL4tJbArEsfpspoJZuNPh1Rc. After payment mail green-alien@agentmail.to."
    },
    servers: [{ url: ORIGIN }],
    tags: [{ name: "brief" }, { name: "status" }],
    paths: {
      "/api/v1/status": {
        get: {
          operationId: "getStatus",
          summary: "Free status",
          tags: ["status"],
          responses: {
            "200": {
              description: "Merchant status",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      ok: { type: "boolean" },
                      payTo: { type: "string" },
                      network: { type: "string" },
                      asset: { type: "string" },
                      price: { type: "string" },
                      paid: { type: "string" }
                    },
                    required: ["ok", "payTo", "network", "asset", "price", "paid"]
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/brief": {
        get: {
          operationId: "getBrief",
          summary: "Paid hire brief",
          tags: ["brief"],
          "x-payment-info": paymentInfo,
          parameters: [
            {
              name: "query",
              in: "query",
              required: false,
              schema: { type: "string" },
              description: "What you want done. Optional."
            }
          ],
          responses: paidResponses
        },
        post: {
          operationId: "postBrief",
          summary: "Paid hire brief with JSON query",
          tags: ["brief"],
          "x-payment-info": paymentInfo,
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: querySchema,
                example: { query: "scoped job" }
              }
            }
          },
          responses: paidResponses
        }
      }
    }
  };
}

export function wellKnownManifest() {
  return {
    version: 1,
    x402Version: 2,
    kind: "resource-server",
    name: "green alien pay",
    description: "Paid hire brief. USDC on Solana via x402.",
    resources: [
      {
        url: `${ORIGIN}/api/v1/brief`,
        method: "GET",
        description: "Paid brief. $0.01 USDC on Solana."
      },
      {
        url: `${ORIGIN}/api/v1/brief`,
        method: "POST",
        description: "Paid brief with JSON query field. $0.01 USDC on Solana."
      }
    ],
    ownershipProofs: [PAY_TO],
    attestation: { type: "none" },
    docs: `${ORIGIN}/openapi.json`,
    updated: "2026-08-29T00:00:00Z"
  };
}
