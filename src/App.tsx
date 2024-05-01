import { useEffect, useState } from "react";
// components
import RadioButton from "./components/radioButton";
import Card from "./components/card";
import CustomButton from "./components/customButton";
import AlertModal from "./components/alertModal";
import Loader from "./components/loader";

import { getPokemons } from "./service";
import { CONFIG_API } from "./config/config";
import { configModalType, dataStateType, pokemonData } from "./type";
// store
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/store";
import { setShowLoader } from "./store/slices/loaderSlice";
import { setErrorAction, setPokemonListAction } from "./store/slices/dataSlice";
// style
import styles from "./App.module.scss";
import "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();
  const { pokemonList, getNext, getPrevious } = useAppSelector(
    (state) => state.dataReducer
  );

  const [configModal, setConfigModal] = useState<configModalType>({
    title: "",
    description: "",
    buttonConfirm: "",
  });

  useEffect(() => {
    if (!pokemonList.length) {
      getAllPokemon();
    }
  }, []);

  const [showList, setShowList] = useState<pokemonData[]>([]);
  const [sort, setSort] = useState<string>("ID");

  const setStateData = (data: dataStateType) => {
    const payload = {
      results: data.results,
      getNext: data.next,
      getPrevious: data.previous,
    };
    dispatch(setPokemonListAction(payload));
    setShowList(data.results);
  };

  const getAllPokemon = async () => {
    dispatch(setShowLoader(true));
    const data = await getPokemons();
    if (data.results) {
      setStateData(data);
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

  const clickPrevious = async () => {
    dispatch(setShowLoader(true));
    const data = await getPokemons(getPrevious);
    setStateData(data);
    setSort("ID");
    dispatch(setShowLoader(false));
  };

  const clickNext = async () => {
    dispatch(setShowLoader(true));
    const data = await getPokemons(getNext);
    setStateData(data);
    setSort("ID");
    dispatch(setShowLoader(false));
  };

  function compare(a: pokemonData, b: pokemonData) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  const onClickRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value);
    if (e.target.value === "ID") {
      setShowList(pokemonList);
    } else {
      let temp = [...showList];
      temp.sort(compare);
      setShowList(temp);
    }
  };

  const handleClose = () => {
    dispatch(setErrorAction(false));
  };

  return (
    <div className={styles.container}>
      <Loader />
      <AlertModal handleClose={handleClose} configModal={configModal} />
      <div className={styles.header}>
        <h2 className={styles.title}>All the Pokemon!</h2>
        <RadioButton checked={sort} handleClick={onClickRadio} />
      </div>
      <div className={styles.contentContainer}>
        {showList.length ? (
          showList.map((item, index) => (
            <Card key={index} name={item.name} url={item.url} />
          ))
        ) : (
          <div>Pokemon Not Found</div>
        )}
      </div>
      <div className={styles.footer}>
        <CustomButton
          label={`Previous ${CONFIG_API.defaultLimit}`}
          handleOnclick={clickPrevious}
        />
        <CustomButton
          label={`Next  ${CONFIG_API.defaultLimit}`}
          handleOnclick={clickNext}
        />
      </div>
    </div>
  );
};

export default App;
