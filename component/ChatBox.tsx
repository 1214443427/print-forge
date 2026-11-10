"use client";
import { ChatMessage, StreamPayload } from "@/lib/types";
import React, {
  useActionState,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import Loading from "./Loading";
import { readStream } from "@/lib/utils/utils";
import ModelCard from "./ModelCard";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    message: [
      {
        type: "text",
        content:
          "👋Hi, I am the PrintForge assistant. I can help you find the models you need. What are you looking for?",
      },
    ],
  },
];

function addToMessage(
  message: ChatMessage,
  payload: StreamPayload,
): ChatMessage {
  const lastChunk = message.message.at(-1);
  if (lastChunk && payload.type === "text" && lastChunk.type === "text") {
    const updatedMessages = [...message.message];
    updatedMessages[updatedMessages.length - 1] = {
      ...lastChunk,
      content: lastChunk.content + payload.content,
    };
    return { role: "assistant", message: updatedMessages };
  }

  return {
    role: "assistant",
    message: [
      ...message.message,
      payload.type === "card"
        ? { type: "card", id: payload.id }
        : { type: "text", content: payload.content },
    ],
  };
}

function ChatBox({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}) {
  const [error, setError] = useState(false);

  const [messages, sendMessage, isPending] = useActionState(
    async (prev: ChatMessage[], data: FormData) => {
      const userMessage = {
        role: "user" as const,
        message: [
          {
            type: "text" as const,
            content: (data.get("input") as string) || "",
          },
        ],
      };
      const next: ChatMessage[] = [...prev, userMessage];
      formRef.current?.reset();
      setOptimisticMessages([
        ...next,
        {
          role: "assistant",
          message: [],
          loading: true,
        },
      ]);
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: next }),
      });

      if (!response.ok || !response.body) {
        return [...prev, { ...userMessage, error: "Server error." }];
      }

      const textStream = readStream(response.body);
      let incomingMessage: ChatMessage = {
        role: "assistant",
        message: [],
      };

      for await (const event of textStream) {
        console.log(
          "Updating incoming message:",
          incomingMessage.message,
          event,
        );
        incomingMessage = addToMessage(incomingMessage, event);
        setOptimisticMessages([...next, incomingMessage]);
        console.log("Updated incoming message:", incomingMessage.message);
      }
      console.log("returning incoming message:", incomingMessage.message);
      return [...next, incomingMessage];
    },
    INITIAL_MESSAGES,
  );

  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticMessages, setOptimisticMessages] =
    useOptimistic<ChatMessage[]>(messages);

  useEffect(() => {
    const container = scrollBoxRef.current;
    container?.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [
    // messages,   // <= Not needed because optimisticMessages updates whenever messages updates.
    optimisticMessages,
    isOpen,
  ]);

  return (
    <div
      className={`fixed flex bg-gray-50 border  border-gray-600 shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3  transition-normal duration-200 z-1 w-full h-full md:w-100 md:h-150 md:rounded-2xl md:bottom-5  ${isOpen ? "md:right-5" : "md:right-0 translate-x-full"}`}
      inert={!isOpen}
    >
      <div className="flex flex-col w-full ">
        <div className="flex justify-between border-b pb-1.5 px-2.5">
          <p>Assistant</p>
          <button
            className="rounded-full border-black border aspect-square cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            -
          </button>
        </div>
        <div
          className="overflow-scroll flex grow flex-col mb-0.5 pl-2.5 pr-0.5"
          ref={scrollBoxRef}
        >
          <div className="flex flex-col w-full h-full py-2 overflow-visible gap-2 pr-2">
            {optimisticMessages.map((message, index) => (
              <div
                className={`rounded-2xl border border-gray-600 py-1 px-2 w-fit max-w-5/6 ${message.role === "assistant" ? "bg-green-200" : "ml-auto bg-blue-200"}`}
                key={index}
              >
                {Object.hasOwn(message, "loading") && message.loading ? (
                  <Loading />
                ) : (
                  message.message.map((chunk) => {
                    return chunk.type === "text" ? (
                      <p>{chunk.content}</p>
                    ) : (
                      <ModelCard
                        type="compact"
                        id={chunk.id}
                        name="test"
                        category="props"
                        likes={123}
                        description="abc"
                      />
                    );
                  })
                )}
              </div>
            ))}
          </div>
        </div>
        <form
          action={sendMessage}
          ref={formRef}
          className="flex justify-between gap-2 border-t pt-1 px-2.5"
        >
          <input
            className="border border-gray-600 bottom-0 rounded-xl py-0.5 px-1.5"
            name="input"
          ></input>
          <button
            className="border border-gray-600 bg-green-100  rounded-2xl grow px-1 cursor-pointer"
            type="submit"
            disabled={isPending}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
