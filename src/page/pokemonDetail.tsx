import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { getPokemon } from "../service";
import { abilityItemType, configModalType, typeItemType } from "../type";
import { useDispatch } from "react-redux";
import { setErrorAction } from "../store/slices/dataSlice";
import Loader from "../components/loader";
import AlertModal from "../components/alertModal";
import styles from "./pokemonDetail.module.scss";
import PokemonTypeDict from "../components/pokemonTypeDict";
import CustomButton from "../components/customButton";
import { useAppSelector } from "../store/store";
import { setShowLoader } from "../store/slices/loaderSlice";

const PokemonDetail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { total } = useAppSelector((state) => state.dataReducer);

  const [configModal, setConfigModal] = useState<configModalType>({
    title: "",
    description: "",
    buttonConfirm: "",
  });

  const [pokemonData, setPokemonData] = useState<any>();

  useEffect(() => {
    getPokemonDetail();
  }, [id]);

  const getPokemonDetail = async () => {
    if (!id) {
      return setConfigModal(() => {
        return {
          title: "No pokemon's ID",
          description: "Please select pokemon from Home page",
          buttonConfirm: "Close",
        };
      });
    }
    dispatch(setShowLoader(true));
    const data = await getPokemon(id);
    if (data) {
      setPokemonData(data);
    } else if (data.name === "AxiosError") {
      setConfigModal(() => {
        return {
          title: data.name,
          description: data.message,
          buttonConfirm: "Close",
        };
      });
      dispatch(setErrorAction(true));
    }
    dispatch(setShowLoader(false));
  };

  const handleClose = () => {
    dispatch(setErrorAction(false));
  };

  return (
    <div className={styles.container}>
      <Loader />
      <AlertModal handleClose={handleClose} configModal={configModal} />
      {pokemonData && (
        <div className={styles.mainContainer}>
          <h3 className={styles.name}>{pokemonData.name}</h3>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              alt="pokemon_image"
              src={pokemonData.sprites.front_default}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.detailContainer}>
              <label>type</label>
              <div className={styles.detail}>
                {pokemonData.types.map((item: typeItemType, index: number) => (
                  <PokemonTypeDict key={index} type={item.type.name} />
                ))}
              </div>
            </div>
            <div className={styles.detailContainer}>
              <label>Ability</label>
              <div className={styles.detail}>
                {pokemonData.abilities.map(
                  (item: abilityItemType, index: number) => (
                    <div className={styles.mapItem} key={index}>
                      {item.ability.name}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className={styles.detailContainer}>
              <label>Height</label>
              <div className={styles.detail}>{pokemonData.height / 10} m</div>
            </div>
            <div className={styles.detailContainer}>
              <label>Weight</label>
              <div className={styles.detail}>{pokemonData.weight / 10} kg</div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.footer}>
        <CustomButton
          label="Previous"
          handleOnclick={() => navigate(`/pokemon-detail/${Number(id) - 1}`)}
          disable={id === "1"}
        />
        <CustomButton
          label="Next"
          handleOnclick={() => navigate(`/pokemon-detail/${Number(id) + 1}`)}
          disable={id === String(total)}
        />
        <CustomButton label="Home" handleOnclick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default PokemonDetail;
