"use client";
import { Activity, useState } from "react";
import ChatBox from "./ChatBox";

function ChatboxToggle() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {/* <Activity mode={isOpen ? "visible" : "hidden"}> */}
      <ChatBox isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* </Activity> */}
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer fixed flex bottom-5 right-5 rounded-full w-12 select-none aspect-square justify-center items-center z-0 bg-gray-50 border  border-gray-600"
      >
        🤖
      </button>
    </>
  );
}

export default ChatboxToggle;
