"use client";

import { CharacterWithEpisodesTitles } from "@/lib/api";
import { FC, useState } from "react";
import CharacterCard from "./CharacterCard";

type Props = {
  initialCharacters: CharacterWithEpisodesTitles[];
};
const CharacterList: FC<Props> = ({ initialCharacters }) => {
  const [characters, setCharacters] = useState(initialCharacters);
  return (
    <section className="flex h-full flex-col">
      <div className="grid grow grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {characters.map(char => (
          <CharacterCard {...char} key={char.id} />
        ))}
      </div>
    </section>
  );
};

export default CharacterList;
