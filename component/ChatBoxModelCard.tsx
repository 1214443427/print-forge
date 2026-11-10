"use client";
import { Model } from "@/lib/types";
import { Suspense, use } from "react";
import Loading from "./Loading";
import Image from "next/image";
import LikesWidget from "./LikesWidget";
import Link from "next/link";

const cache = new Map<number, Promise<Model | null>>();

function fetchModel(id: number) {
  let promise = cache.get(id);
  if (!promise) {
    promise = fetch(`/api/models/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null);
    cache.set(id, promise);
  }

  return promise;
}
function Card({ id }: { id: number }) {
  const data = use(fetchModel(id));
  return (
    <div className="p-2 pr-3 flex w-fit w-max-3/4 border bg-white rounded-2xl my-1">
      {data ? (
        <Link href={`/3d-models/${id}`} className="flex gap-2">
          <Image
            src={data.image}
            width={45}
            height={45}
            alt={data.description}
            className="rounded-2xl"
          />
          <div className="flex flex-col">
            <h4>{data.name}</h4>
            <LikesWidget likes={data.likes} style="small" />
          </div>
        </Link>
      ) : (
        <p>
          We couldn't find the item. Please try searching for it directly in the
          search bar.
        </p>
      )}
    </div>
  );
}

function ChatBoxModelCard({ id }: { id: number }) {
  return (
    <Suspense fallback={<Loading />}>
      <Card id={id} />
    </Suspense>
  );
}

export default ChatBoxModelCard;
