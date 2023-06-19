"use client";

import { AugmentedCharacter, getCharacters } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import CharacterCard from "./CharacterCard";
import CharacterCardSkeleton from "./CharacterCardSkeleton";

type Props = {
  initialCharacters: AugmentedCharacter[];
  pages: number;
};
const CharacterList: FC<Props> = ({ initialCharacters, pages }) => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1", 10));
  const { isLoading, data } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => getCharacters(page)
  });

  return (
    <section className="flex gap-4">
      {page > 0 && (
        <button
          className="self-center"
          type="button"
          onClick={() => {
            setPage(page => page - 1);
          }}
        >
          Previous
        </button>
      )}
      <div className="grid grow grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {true
          ? Array(20)
              .fill("_")
              .map((_, i) => <CharacterCardSkeleton key={i} />)
          : (data?.characters ?? initialCharacters).map(char => <CharacterCard {...char} key={char.id} />)}
      </div>
      {page < pages && (
        <button
          className="self-center"
          type="button"
          onClick={() => {
            setPage(page => page + 1);
          }}
        >
          Next
        </button>
      )}
    </section>
  );
};

export default CharacterList;
