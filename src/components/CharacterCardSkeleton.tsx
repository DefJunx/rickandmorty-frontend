import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CharacterCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white shadow-md transition hover:scale-110 hover:drop-shadow-xl">
      <div className="aspect-square w-full">
        <Skeleton containerClassName="w-full block h-full" className="h-full w-full" />
      </div>
      <div className="flex flex-col gap-1 p-4 text-sm">
        <div className="flex gap-1">
          <Skeleton className="w-12" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="w-12" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="w-12" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="w-12" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="py-2 text-center text-lg font-bold">
            <Skeleton className="w-12" />
          </p>
          <div>
            <Skeleton className="w-12" />
          </div>
          <div>
            <Skeleton className="w-12" />
          </div>
          <div>
            <Skeleton className="w-12" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="py-2 text-center text-lg font-bold">
            <Skeleton className="w-12" />
          </p>
          <div>
            <Skeleton className="w-12" />
          </div>
          <div>
            <Skeleton className="w-12" />
          </div>
          <div>
            <Skeleton className="w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCardSkeleton;
