import { useEffect, useState } from "react";
import "./App.module.scss";
import { getPokemons } from "./service";
import styles from "./App.module.scss";
import RadioButton from "./components/radioButton";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/store";
import Card from "./components/card";
import CustomButton from "./components/customButton";
import { CONFIG_API } from "./config/config";
import { dataStateType, pokemonData } from "./type";
import { setErrorAction, setPokemonListAction } from "./store/slices/dataSlice";

const App = () => {
  const dispatch = useDispatch();
  const { pokemonList, getNext, getPrevious } = useAppSelector(
    (state) => state.dataReducer
  );

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
    const data = await getPokemons();
    if (data.results) {
      setStateData(data)
    } else if (data.name === "AxiosError") {
      const payload = {
        isError: true,
        errorMessage: data.message,
      }
      dispatch(setErrorAction(payload));
      alert(data.message)
    }
  };

  const clickPrevious = async () => {
    const data = await getPokemons(getPrevious);
    setStateData(data);
    setSort("ID");
  };

  const clickNext = async () => {
    const data = await getPokemons(getNext);
    setStateData(data);
    setSort("ID");
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
    setSort(e.target.value)
    if (e.target.value === "ID") {
      setShowList(pokemonList);
    } else {
      let temp = [...showList];
      temp.sort(compare);
      setShowList(temp);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>All the Pokemon!</h2>
        <RadioButton checked={sort} handleClick={onClickRadio} />
      </div>
      <div className={styles.contentContainer}>
        {showList.length ?
          showList.map((item, index) => (
            <Card key={index} name={item.name} url={item.url} />
          )) : (
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
