import bug from "../assets/bug.gif";
import dark from "../assets/dark.gif";
import dragon from "../assets/dragon.gif";
import electric from "../assets/electric.gif";
import fairy from "../assets/fairy.gif";
import fighting from "../assets/fighting.gif";
import fire from "../assets/fire.gif";
import flying from "../assets/flying.gif";
import ghost from "../assets/ghost.gif";
import grass from "../assets/grass.gif";
import ground from "../assets/ground.gif";
import ice from "../assets/ice.gif";
import normal from "../assets/normal.gif";
import poison from "../assets/poison.gif";
import psychic from "../assets/psychic.gif";
import rock from "../assets/rock.gif";
import steel from "../assets/steel.gif";
import water from "../assets/water.gif";

interface PropType {
  type: string;
}

const PokemonTypeDict = ({ type }: PropType) => {
  switch (type) {
    case "bug":
      return <img alt="pokemon_type" src={bug} />;
    case "dark":
      return <img alt="pokemon_type" src={dark} />;
    case "dragon":
      return <img alt="pokemon_type" src={dragon} />;
    case "electric":
      return <img alt="pokemon_type" src={electric} />;
    case "fairy":
      return <img alt="pokemon_type" src={fairy} />;
    case "fighting":
      return <img alt="pokemon_type" src={fighting} />;
    case "fire":
      return <img alt="pokemon_type" src={fire} />;
    case "flying":
      return <img alt="pokemon_type" src={flying} />;
    case "ghost":
      return <img alt="pokemon_type" src={ghost} />;
    case "grass":
      return <img alt="pokemon_type" src={grass} />;
    case "ground":
      return <img alt="pokemon_type" src={ground} />;
    case "ice":
      return <img alt="pokemon_type" src={ice} />;
    case "normal":
      return <img alt="pokemon_type" src={normal} />;
    case "poison":
      return <img alt="pokemon_type" src={poison} />;
    case "psychic":
      return <img alt="pokemon_type" src={psychic} />;
    case "rock":
      return <img alt="pokemon_type" src={rock} />;
    case "steel":
      return <img alt="pokemon_type" src={steel} />;
    case "water":
      return <img alt="pokemon_type" src={water} />;
    default:
      return <img alt="pokemon_type" />;
  }
};

export default PokemonTypeDict;
