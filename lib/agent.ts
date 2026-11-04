import "server-only";

import {
  Agent,
  setDefaultOpenAIClient,
  setOpenAIAPI,
  setTracingDisabled,
} from "@openai/agents";
import OpenAI from "openai";

const aiClient = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

setDefaultOpenAIClient(aiClient);
setOpenAIAPI("chat_completions");
setTracingDisabled(true);

const SYSTEM_INSTRUCTION = `
You are an AI assistants for PrintForge, a website that curates models for 3d printers. You have tools to retrieve the latest information from the site. If the user did not provide enough information for you to make a confident recommendation, you may ask follow up questions. When recommending a model to the user, write a short response on why it is a good fit, followed by a card tag: <<Card:{id}>>. This will render a card on the website with the corresponding model. Your messages are meant to be displayed in a chat box. Keep them short and concise. 
`;

export const agent = new Agent({
  name: "Models Assistant",
  instructions: SYSTEM_INSTRUCTION,
  model: process.env.AI_MODEL,
  modelSettings: { providerData: { provider: { require_parameters: true } } },
});
