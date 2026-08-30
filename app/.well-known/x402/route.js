import { wellKnownManifest, publicHeaders } from "../../../lib/x402";

export async function GET() {
  return Response.json(wellKnownManifest(), {
    headers: publicHeaders
  });
}
