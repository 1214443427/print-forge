import { agent } from "@/lib/agent";
import { ChatMessage, StreamPayload } from "@/lib/types";
import {
  AgentInputItem,
  assistant,
  MCPServerStreamableHttp,
  run,
  user,
} from "@openai/agents";

export async function POST(req: Request) {
  const { messages }: { messages: ChatMessage[] } = await req.json();

  const encoder = new TextEncoder();

  const mcpServer = new MCPServerStreamableHttp({
    name: "PrintForge MCP",
    url: new URL("/api/mcp", req.url).toString(),
  });

  await mcpServer.connect();
  const input: AgentInputItem[] = messages.map((message) => {
    let textMessage: string = "";
    message.message.forEach((chunk) =>
      chunk.type === "text"
        ? (textMessage += chunk.content)
        : (textMessage += `<<Card: ${chunk.id}>>`),
    );
    return message.role === "assistant"
      ? assistant(textMessage)
      : user(textMessage);
  });

  //  ** ---- toTextStream() Method  ---- **
  // const result = await run(agent.clone({ mcpServers: [mcpServer] }), input, {
  //   maxTurns: 5,
  //   stream: true,
  //   signal: req.signal,
  // });

  // result.completed
  //   .catch((err) => {
  //     if (!req.signal.aborted) console.error(err);
  //   })
  //   .finally(() => mcpServer.close()); // Promise.finally() runs when a promise is fulfilled or rejected.

  // return new Response(
  //   result.toTextStream().pipeThrough(new TextEncoderStream()),
  //   {
  //     headers: {
  //       "Content-Type": "text/plain; charset=utf-8",
  //       "Cache-Control": "no-cache, no-transform",
  //       "X-Content-Type-Options": "nosniff",
  //     },
  //   },
  // );

  //  ** ---- Manual Stream  ---- **
  const readableStream = new ReadableStream({
    async start(controller) {
      const send = (text: string) => {
        if (req.signal.aborted) return;
        try {
          controller.enqueue(encoder.encode(text));
        } catch {
          console.error("Stream is aborted.");
        }
      };

      try {
        const agentStream = await run(
          agent.clone({ mcpServers: [mcpServer] }),
          input,
          {
            maxTurns: 5,
            stream: true,
            signal: req.signal,
          },
        );

        for await (const event of agentStream) {
          if (
            event.type === "raw_model_stream_event" &&
            event.data.type === "output_text_delta"
          ) {
            send(event.data.delta);
          }
        }
        await agentStream.completed;
        controller.close();
      } catch (error) {
        if (!req.signal.aborted) {
          console.error(error);
          controller.error(error); // Trigger an controller error to be caught down stream. Returning error here will not work since a stream already established a 200 connection.
        }
      } finally {
        await mcpServer.close();
      }
    },
  });

  return new Response(readableStream, {
    // The response must be returned in POST, not in start.
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
      Connection: "keep-alive",
    },
  });
}
