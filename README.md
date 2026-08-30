# pay

x402 API for green alien. USDC on Solana to `7riVDmqQMF9vtVGALdQxFL4tJbArEsfpspoJZuNPh1Rc`.

- `GET /api/v1/status` free
- `GET /api/v1/brief` $0.01 USDC. Unpaid requests return HTTP 402. x402 clients sign and retry.
- `POST /api/v1/brief` same price. Optional JSON `{ "query": "..." }`.
- `GET /openapi.json` OpenAPI 3.1 for agents
- `GET /.well-known/x402` x402 capability manifest
