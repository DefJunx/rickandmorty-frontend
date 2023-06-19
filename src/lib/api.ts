import {
  ApiResponse,
  Character,
  Episode,
  Location,
  getCharacters as apiGetCharacters,
  getEpisode,
  getLocation
} from "rickmortyapi";

export interface CharacterWithEpisodesTitles extends Character {
  origin: Location;
  location: Location;
  appearsIn: string[];
}

export async function getCharacters(): Promise<CharacterWithEpisodesTitles[]> {
  const {
    data: { results: characters }
  } = await apiGetCharacters();

  if (!characters || characters.length === 0) {
    return [];
  }

  try {
    const charactersWithEpisodes = await Promise.all(
      characters.map(async character => {
        const episodes = await Promise.all(
          character.episode.map(async episodeUrl => {
            const episodeRegexpMatch = episodeUrl?.match(/\/(\d+)$/) || null;

            if (!episodeRegexpMatch) {
              throw new Error("unexpected regexp error");
            }

            const episodeId = episodeRegexpMatch[1];

            const episode = (await getEpisode(parseInt(episodeId, 10))) as unknown as ApiResponse<Episode>;

            return episode.data.name;
          })
        );

        const originRegexpMatch = character.origin.url.match(/\/(\d+)$/) || null;

        if (!originRegexpMatch) {
          throw new Error("unexpected regexp error");
        }

        const locationRegexpMatch = character.location.url.match(/\/(\d+)$/) || null;

        if (!locationRegexpMatch) {
          throw new Error("unexpected regexp error");
        }

        const originId = parseInt(originRegexpMatch[1], 10);
        const locationId = parseInt(locationRegexpMatch[1], 10);
        const origin = (await getLocation(originId)).data;
        const location = originId === locationId ? origin : (await getLocation(locationId)).data;

        return {
          ...character,
          origin,
          location,
          appearsIn: episodes
        };
      })
    );

    return charactersWithEpisodes;
  } catch (e) {
    console.error(e);
    return [];
  }
}
