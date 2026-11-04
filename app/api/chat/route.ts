import { agent } from "@/lib/agent";
import { ChatMessage } from "@/lib/types";
import {
  AgentInputItem,
  assistant,
  MCPServerStreamableHttp,
  run,
  user,
} from "@openai/agents";

export async function POST(req: Request) {
  const { messages }: { messages: ChatMessage[] } = await req.json();

  const mcpServer = new MCPServerStreamableHttp({
    name: "PrintForge MCP",
    url: new URL("/api/mcp", req.url).toString(),
  });

  await mcpServer.connect();
  const input: AgentInputItem[] = messages.map((message) =>
    message.role === "assistant"
      ? assistant(message.message)
      : user(message.message),
  );

  try {
    const result = await run(agent.clone({ mcpServers: [mcpServer] }), input, {
      maxTurns: 5,
    });
    mcpServer.close();
    return Response.json({ reply: result.finalOutput });
  } catch (error) {
    console.error(error);
    mcpServer.close();
    return Response.json({ message: "Internal Server Issue" }, { status: 500 });
  }
}
