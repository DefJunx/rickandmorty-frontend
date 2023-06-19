import CharacterList from "@/components/CharacterList";
import { getCharacters } from "@/lib/api";

const RICK_AND_MORTY_QUOTES = [
  "Wubba lubba dub dub!",
  "I'm Pickle Rick!",
  "Get Schwifty!",
  "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.",
  "I'm Mr. Meeseeks! Look at me!",
  "I'm Tiny Rick!",
  "Existence is pain!",
  "Rick: 'Weddings are basically funerals with cake.' Morty: 'Right? It's like, come celebrate our marriage, but remember, our mortality is inevitable.'",
  "It's time to get riggity riggity wrecked, son!",
  "You pass butter.",
  "Aww, geez!",
  "I turned myself into a pickle, Morty! I'm Pickle Riiiiick!",
  "Don't break an arm jerking yourself off, Morty.",
  "Nobody knows how to party like a Rick.",
  "Get off the high road, Summer! We all got pink eye because you won't stop texting on the toilet.",
  "Weddings are just funerals with cake.",
  "You gotta do it for Grandpa, Morty! You gotta put these seeds inside your butt.",
  "Morty, I need your help on an adventure. We've got to go... to the grocery store.",
  "In bird culture, this is considered a dick move.",
  "Morty, I'm sorry, but it's a Rick and Jerry adventure. Rick and Jerry episode! Rick and Jerry forever and forever 100 years.",
  "I'm sorry, but your opinion means very little to me."
];

export default async function Home() {
  const initialCharacters = await getCharacters();

  console.log(initialCharacters);

  return (
    <>
      <h1 className="mb-24 text-xl">
        {RICK_AND_MORTY_QUOTES[Math.floor(Math.random() * RICK_AND_MORTY_QUOTES.length)]}
      </h1>
      {initialCharacters.length === 0 ? (
        <h1>What the fuck Morty? There&apos;s no characters Morty! you fucked up Morty!</h1>
      ) : (
        <CharacterList initialCharacters={initialCharacters} />
      )}
    </>
  );
}
