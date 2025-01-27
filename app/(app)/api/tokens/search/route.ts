import { searchTokens } from "@/db/services";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) return Response.json([]);
  return Response.json(await searchTokens(q));
};
