import { searchMulti } from "@/lib/tmdb";
import type { CatalogItem } from "@/types/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  if (!query.trim()) {
    return Response.json({ results: [] } satisfies { results: CatalogItem[] });
  }

  try {
    const results = await searchMulti(query);
    return Response.json({ results } satisfies { results: CatalogItem[] });
  } catch {
    return Response.json(
      { error: "Search failed" },
      { status: 500 },
    );
  }
}
