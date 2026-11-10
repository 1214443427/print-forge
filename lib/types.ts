import { ReactNode } from "react";

export type Category = {
  name: string;
  slug: string;
};

export type Model = {
  id: number;
  name: string;
  description: string;
  likes: number;
  image: string;
  category: string;
  dateAdded: string;
};

type RenderedContent =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "card";
      id: number;
    };

export type ChatMessage = {
  role: "user" | "assistant";
  message: RenderedContent[];
  error?: string;
  loading?: boolean;
};

export type StreamPayload =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "card";
      id: number;
    };
