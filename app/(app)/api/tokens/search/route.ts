import { searchTokens } from "@/services/birdeye";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) return Response.json([]);
  return Response.json(await searchTokens({ keyword: q }));
};
