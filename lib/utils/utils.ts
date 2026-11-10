import { redirect } from "next/navigation";
import { StreamPayload } from "../types";

// export function redirectOutBound(
//   params: {
//     sort?: string;
//     search?: string;
//     page?: string;
//   },
//   totalPageNumber: number,
//   category?: string,
// ) {
//   const searchParam = new URLSearchParams(params);
//   const pageNumber = Number(params.page);
//   if (params.page && (pageNumber < 1 || isNaN(pageNumber))) {
//     searchParam.set("page", "1");
//     redirectToModels(searchParam.toString(), category);
//   } else if (pageNumber > totalPageNumber && totalPageNumber != 0) {
//     searchParam.set("page", totalPageNumber.toString());
//     redirectToModels(searchParam.toString(), category);
//   }
// }

export function urlBuilder(params?: URLSearchParams, category?: string) {
  const base = category ? `/3d-models/categories/${category}` : "/3d-models";
  const searchParams = params?.toString();
  return searchParams ? `${base}?${searchParams}` : base;
}

export function clampPage(page: string, totalPageNumber: number) {
  const pageNumber = Number(page);
  if (pageNumber < 1 || totalPageNumber === 0 || Number.isNaN(pageNumber)) {
    return 1;
  }
  return Math.min(pageNumber, totalPageNumber);
}

export function redirectToModels(
  params?: URLSearchParams,
  category?: string,
): never {
  const url = urlBuilder(params, category);
  redirect(url);
}

export function getSearchParams(searchParams: {
  search?: string;
  sort?: string;
  page?: string;
}) {
  const params = searchParams;
  const search = params.search?.toLowerCase() || "";
  const sortValue = params.sort?.toLowerCase() || "";
  const page = Number(params.page) || 1;

  const sort = ["alpha", "popular", "recent", ""].includes(sortValue)
    ? sortValue
    : null;

  return { search, sort, page, pageString: params.page || "" };
}

const MAX_FRAME_CHAR_SIZE = 1_000_000;
const CARD_TAG = /^<<Card:\s*\{?(\d+)\}?\s*>>$/;

export async function* readStream(
  responseBody: ReadableStream<Uint8Array<ArrayBuffer>>,
): AsyncGenerator<StreamPayload> {
  const reader = responseBody.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    const data = decoder.decode(value, { stream: true });
    buffer += data;
    console.log("current buffer: ", buffer);
    if (buffer.length > MAX_FRAME_CHAR_SIZE) {
      throw new Error("Event stream frame exceeded maximum allowed size.");
    }

    while (buffer) {
      const split = buffer.indexOf("<<");

      if (split === -1) {
        const leadingTag = buffer.endsWith("<") ? 1 : 0;
        const text = buffer.slice(0, buffer.length - leadingTag);
        yield { type: "text", content: text };
        buffer = leadingTag ? "<" : "";
        break;
      }

      if (split > 0) {
        console.log("split > 0");
        yield { type: "text", content: buffer.slice(0, split) };
        buffer = buffer.slice(split);
      }

      const end = buffer.indexOf(">>");
      if (end === -1 && !done) {
        console.log("end === -1");
        break;
      }

      const match = CARD_TAG.exec(buffer.slice(0, end + 2));

      if (match) {
        console.log("match");
        yield { type: "card", id: Number(match[1]) };
        buffer = buffer.slice(end + 2);
      }

      yield { type: "text", content: buffer };
      buffer = "";
    }
    if (done) break;
  }
  buffer += decoder.decode();
  yield { type: "text", content: buffer };
}
