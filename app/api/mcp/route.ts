import { getCategories } from "@/lib/categories";
import { getModels } from "@/lib/models";
import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";

function createModelsServer() {
  const server = new McpServer({
    name: "Print Forge Models Fetcher",
    version: "1.0.0",
  });

  server.registerTool(
    "getModels",
    {
      title: "Get Models",
      description:
        "Get the list of models currently available from a category. Fetches for all models if a category is not specified.",
      inputSchema: z.object({
        category: z
          .string()
          .describe(
            "Category to search for. Please use the slug field returned from getCategories.",
          )
          .optional(),
      }),
    },
    ({ category }) => {
      const models = getModels({
        category: category?.toLowerCase(),
        page: 1,
        modelsPerPage: 100,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(models),
          },
        ],
      };
    },
  );

  server.registerTool(
    "getCategories",
    {
      title: "Get Categories",
      description: "Get the list of available Categories.",
    },
    () => {
      const categories = getCategories();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(categories),
          },
        ],
      };
    },
  );

  server.registerPrompt(
    "modelsAssistant",
    {
      title: "Models Assistant",
      description: "Assists the user in finding the printable models.",
    },
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "You are an AI assistants for PrintForge, a website that curates models for 3d printers. You have tools to retrieve the latest information from the site. You can ask questions related to the user's interest to improve your recommendation. ",
          },
        },
      ],
    }),
  );

  return server;
}

export async function POST(request: Request) {
  const handler = createMcpHandler(() => createModelsServer());
  return handler.fetch(request);
}
