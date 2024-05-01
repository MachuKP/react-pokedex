import { getPokemonUrl } from "../util/pokemonUtil";
import styles from "./card.module.scss";

interface propType {
  name: string;
  url: string;
}

const Card = ({ name, url }: propType) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          alt="pokemon_image"
          src={getPokemonUrl(url)}
        />
      </div>
      <div className={styles.nameContainer}>{name}</div>
    </div>
  );
};

export default Card;
