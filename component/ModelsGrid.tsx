import React, { TransitionStartFunction } from "react";
import ModelCard from "./ModelCard";
import { Model } from "@/lib/types";
import SortControls from "./SortControls";
import LoadingPage from "./LoadingPage";

function ModelsGrid({
  models,
  isPending,
  startTransition,
}: {
  models: Model[];
  isPending: boolean;
  startTransition: TransitionStartFunction;
}) {
  const type = "compact";

  if (models.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 w-full h-full">
        <h1 className="text-2xl font-bold">No models found</h1>
        <p className="text-lg text-gray-500">
          Try searching for something else
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <SortControls startTransition={startTransition} />
      <div
        className={`grid ${type === "compact" ? "grid-cols-2" : "grid-cols-1"} items-stretch md:grid-cols-[repeat(auto-fit,268px)] gap-5`}
      >
        {isPending ? (
          <LoadingPage> Loading models... </LoadingPage>
        ) : (
          models.map((model) => <ModelCard key={model.id} {...model} />)
        )}
      </div>
    </div>
  );
}

export default ModelsGrid;
