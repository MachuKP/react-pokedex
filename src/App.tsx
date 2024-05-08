import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import RadioButton from "./components/radioButton";
import Card from "./components/card";
import CustomButton from "./components/customButton";
import AlertModal from "./components/alertModal";
import Loader from "./components/loader";

import { getAllPokemonsList, getPokemons } from "./service";
import { getPokemonId } from "./util/pokemonUtil";
import { CONFIG_API } from "./config/config";
import { configModalType, dataStateType, BasicType } from "./type";
// store
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/store";
import { setShowLoader } from "./store/slices/loaderSlice";
import {
  setErrorAction,
  setPokemonListAction,
  setPokemonListByNameAction,
  setOrder,
  setTotal,
  setSortStore,
} from "./store/slices/dataSlice";
// style
import styles from "./App.module.scss";
import "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();
  const {
    pokemonListById,
    pokemonListByName,
    start,
    current,
    total,
    sortStore,
  } = useAppSelector((state) => state.dataReducer);
  const navigate = useNavigate();

  const [configModal, setConfigModal] = useState<configModalType>({
    title: "",
    description: "",
    buttonConfirm: "",
  });

  useEffect(() => {
    const initial = async () => {
      const count = await getCount();
      dispatch(setTotal(count));
      await getAllPokemon(count);
    };
    if (!pokemonListById.length) {
      initial();
    } else {
      if (start !== 0) setDisablePrevious(false);
      if (total <= current) setDisableNext(true);
      setSort(sortStore);
      setShowPokemonList(sortStore, start, current);
    }
  }, []);

  const [showList, setShowList] = useState<BasicType[]>([]);
  const [sort, setSort] = useState<string>("ID");
  const [disableNext, setDisableNext] = useState<boolean>(false);
  const [disablePrevious, setDisablePrevious] = useState<boolean>(true);

  const setStateData = (data: dataStateType) => {
    const payload = data.results;
    let temp = [...payload];
    temp.sort(compare);
    dispatch(setPokemonListAction(payload));
    dispatch(setPokemonListByNameAction(temp));
    let tempSplice = [...payload];
    const spliceList = tempSplice.splice(start, current);
    setShowList(spliceList);
  };

  const getCount = async () => {
    dispatch(setShowLoader(true));
    const data = await getPokemons();
    if (data.count) {
      return data.count;
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

  const getAllPokemon = async (count: number) => {
    dispatch(setShowLoader(true));
    const data = await getAllPokemonsList(count);
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
    if (start > 0) {
      const newStart = start - CONFIG_API.defaultLimit;
      let payload = {
        start: newStart,
        current: start,
      };
      if (newStart === 0) {
        setDisablePrevious(true);
      }
      setDisableNext(false);
      dispatch(setOrder(payload));
      setShowPokemonList(sort, newStart, start);
    }
    dispatch(setShowLoader(false));
  };

  const clickNext = async () => {
    dispatch(setShowLoader(true));
    if (total > current) {
      const newCurrent = current + CONFIG_API.defaultLimit;
      let payload = {
        start: current,
        current: newCurrent,
      };
      if (total <= newCurrent) {
        setDisableNext(true);
      }
      setDisablePrevious(false);
      dispatch(setOrder(payload));
      setShowPokemonList(sort, current, newCurrent);
    }
    dispatch(setShowLoader(false));
  };

  const setShowPokemonList = (
    key: string,
    startOrder: number,
    currentOrder: number
  ) => {
    let temp;
    let sortKey = key;
    if (sortKey === "ID") {
      temp = [...pokemonListById];
    } else {
      temp = [...pokemonListByName];
    }
    const spliceList = temp.slice(startOrder, currentOrder);
    setShowList(spliceList);
  };

  const compare = (a: BasicType, b: BasicType) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  const onClickRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value);
    dispatch(setSortStore(e.target.value));
    setShowPokemonList(e.target.value, start, current);
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
            <Card
              key={index}
              name={item.name}
              url={item.url}
              onClick={() =>
                navigate(`/pokemon-detail/${getPokemonId(item.url)}`)
              }
            />
          ))
        ) : (
          <div>Pokemon Not Found</div>
        )}
      </div>
      <div className={styles.footer}>
        <CustomButton
          label={`Previous ${CONFIG_API.defaultLimit}`}
          handleOnclick={clickPrevious}
          disable={disablePrevious}
        />
        <CustomButton
          label={`Next  ${CONFIG_API.defaultLimit}`}
          handleOnclick={clickNext}
          disable={disableNext}
        />
      </div>
    </div>
  );
};

export default App;
