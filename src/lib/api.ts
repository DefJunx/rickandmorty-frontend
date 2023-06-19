import {
  ApiResponse,
  Character,
  Episode,
  Location,
  getCharacters as apiGetCharacters,
  getEpisode,
  getLocation
} from "rickmortyapi";

type LocationSummary = {
  name: Location["name"];
  dimension: Location["dimension"];
  residentsAmount: number;
};

export interface AugmentedCharacter {
  id: Character["id"];
  image: Character["image"];
  name: Character["name"];
  status: Character["status"];
  species: Character["species"];
  gender: Character["gender"];
  origin?: LocationSummary;
  location?: LocationSummary;
  appearsIn: string[];
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getCharacters(page = 1): Promise<{ characters: AugmentedCharacter[]; pages: number }> {
  await sleep(6000);
  const {
    status,
    data: { results: chars, info }
  } = await apiGetCharacters({ page });

  if (status !== 200) {
    throw new Error("No characters!");
  }

  try {
    const characters = await Promise.all(chars!.map(async character => expandCharacterInformations(character)));
    return {
      characters,
      pages: info!.pages
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function expandCharacterInformations(character: Character): Promise<AugmentedCharacter> {
  const episodes = await Promise.all(
    character.episode.map(async episodeUrl => {
      const episodeRegexpMatch = episodeUrl?.match(/\/(\d+)$/) || null;

      if (!episodeRegexpMatch) {
        throw new Error("unexpected episode regexp error");
      }

      const episodeId = episodeRegexpMatch[1];

      const episode = (await getEpisode(parseInt(episodeId, 10))) as unknown as ApiResponse<Episode>;

      return episode.data.name;
    })
  );

  let fetchedOrigin: Location | undefined;
  let fetchedLocation: Location | undefined;
  let originId: number | undefined;
  let locationId: number | undefined;

  if (character.origin.url !== "") {
    const originRegexpMatch = character.origin.url.match(/\/(\d+)$/) || null;

    if (!originRegexpMatch) {
      throw new Error("unexpected origin regexp error");
    }
    originId = parseInt(originRegexpMatch[1], 10);
    fetchedOrigin = (await getLocation(originId)).data;
  }

  if (character.location.url !== "") {
    const locationRegexpMatch = character.location.url.match(/\/(\d+)$/) || null;

    if (!locationRegexpMatch) {
      throw new Error("unexpected location regexp error");
    }

    locationId = parseInt(locationRegexpMatch[1], 10);

    fetchedLocation = !!originId && originId === locationId ? fetchedOrigin : (await getLocation(locationId)).data;
  }

  const origin: LocationSummary | undefined = !!fetchedOrigin
    ? {
        dimension: fetchedOrigin.dimension,
        name: fetchedOrigin.name,
        residentsAmount: fetchedOrigin.residents.length
      }
    : undefined;
  const location: LocationSummary | undefined = !!fetchedLocation
    ? {
        dimension: fetchedLocation.dimension,
        name: fetchedLocation.name,
        residentsAmount: fetchedLocation.residents.length
      }
    : undefined;

  console.log(character.status);

  return {
    id: character.id,
    image: character.image,
    name: character.name,
    species: character.species,
    gender: character.gender,
    status: character.status,

    origin,
    location,

    appearsIn: episodes
  };
}
