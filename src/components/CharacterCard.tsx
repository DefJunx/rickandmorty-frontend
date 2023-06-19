import { AugmentedCharacter } from "@/lib/api";
import Image from "next/image";
import { FC } from "react";

type Props = AugmentedCharacter;

const CharacterCard: FC<Props> = ({ image, name, species, gender, origin, location, status, appearsIn }) => {
  return (
    <div className="flex flex-col bg-white shadow-md transition hover:scale-110 hover:drop-shadow-xl">
      <div className="relative aspect-square w-full">
        <Image src={image} alt="" fill />
      </div>
      <div className="flex flex-col gap-1 p-4 text-sm">
        <div className="flex gap-1">
          <strong className="capitalize">name:</strong>
          <span className="capitalize">{name}</span>
        </div>
        <div className="flex gap-1">
          <strong className="capitalize">species:</strong>
          <span className="capitalize">{species}</span>
        </div>
        <div className="flex gap-1">
          <strong className="capitalize">gender:</strong>
          <span className="capitalize">{gender}</span>
        </div>
        <div className="flex gap-1">
          <strong className="capitalize">status:</strong>
          <span className="capitalize">{status}</span>
        </div>
        {!!origin ? (
          <div className="flex flex-col gap-1">
            <p className="py-2 text-center text-lg font-bold">Origin</p>
            <div>
              <strong className="capitalize">name:</strong> {origin.name}
            </div>
            <div>
              <strong className="capitalize">dimension:</strong> {origin.dimension}
            </div>
            <div>
              <strong className="capitalize">N° of residents:</strong> {origin.residentsAmount}
            </div>
          </div>
        ) : (
          <p className="py-2 text-lg font-bold">Origin unknown</p>
        )}
        {!!location ? (
          <div className="flex flex-col gap-1">
            <p className="py-2 text-center text-lg font-bold">Current Location</p>
            <div>
              <strong className="capitalize">name:</strong> {location.name}
            </div>
            <div>
              <strong className="capitalize">dimension:</strong> {location.dimension}
            </div>
            <div>
              <strong className="capitalize">N° of residents:</strong> {location.residentsAmount}
            </div>
          </div>
        ) : (
          <p className="py-2 text-lg font-bold">Current Location unknown</p>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
