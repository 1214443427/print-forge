"use client";
import { ChatMessage } from "@/lib/types";
import React, {
  useActionState,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    message:
      "👋Hi, I am the PrintForge assistant. I can help you find the models you need. What are you looking for?",
  },
];
function ChatBox() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [error, setError] = useState(false);

  const [messages, sendMessage, isPending] = useActionState(
    async (prev: ChatMessage[], data: FormData) => {
      const userMessage = {
        role: "user" as const,
        message: (data.get("input") as string) || "",
      };
      const next: ChatMessage[] = [...prev, userMessage];
      addOptimisticMessage(userMessage);
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: next }),
      });
      const result = await response.json();
      return [...next, { role: "assistant" as const, message: result.reply }];
    },
    INITIAL_MESSAGES,
  );

  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (prev, message: ChatMessage) => {
      return [...prev, message];
    },
  );

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
      className={`fixed flex bottom-5 right-5 bg-gray-50 border  border-gray-600 shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3  transition-normal duration-200 ${isOpen ? "w-full h-full md:w-100 md:h-150 md:rounded-2xl" : "rounded-full w-12 select-none aspect-square justify-center items-center"}`}
    >
      {isOpen ? (
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
                <p
                  className={`rounded-2xl border border-gray-600 py-1 px-2 w-fit max-w-5/6 ${message.role === "assistant" ? "bg-green-200" : "ml-auto bg-blue-200"}`}
                  key={index}
                >
                  {message.message}
                </p>
              ))}
            </div>
          </div>
          <form
            action={sendMessage}

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
              ✉️
            </button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="cursor-pointer">
          🤖
        </button>
      )}
    </div>
  );
}

export default ChatBox;
