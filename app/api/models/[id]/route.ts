import { getModelBySlug } from "@/lib/models";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = getModelBySlug(id);

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 500 });
  }
  if (!result.model) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(result.model);
}
