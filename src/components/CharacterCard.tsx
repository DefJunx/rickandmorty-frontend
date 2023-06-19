import Image from "next/image";
import { FC } from "react";
import { Character } from "rickmortyapi";

type Props = Character;

const CharacterCard: FC<Props> = ({ image, name, species, gender }) => {
  return (
    <div className="flex flex-col bg-white shadow-md transition hover:scale-110 hover:drop-shadow-xl">
      <div className="relative aspect-square w-full">
        <Image src={image} alt="" fill />
      </div>
      <div className="flex flex-col gap-1 p-4 text-sm">
        <div>
          <strong className="capitalize">name:</strong> {name}
        </div>
        <div>
          <strong className="capitalize">species:</strong> {species}
        </div>
        <div>
          <strong className="capitalize">gender:</strong> {gender}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
