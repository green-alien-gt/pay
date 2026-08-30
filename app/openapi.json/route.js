import { openApiSpec, publicHeaders } from "../../lib/x402";

export async function GET() {
  return Response.json(openApiSpec(), {
    headers: publicHeaders
  });
}
