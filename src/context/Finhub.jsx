import { createContext, useReducer, useEffect, useState } from "react";
const contextProvider = createContext(null);
import { reducer, stockReducer } from "../reducer/FinhubReducer";
import { finhub } from "../api/finhub";

export const Finhub = ({ children }) => {
  const [stockData, addStockData] = useState([
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "META",
    "TSLA",
  ]);

  const initialState = {
    isError: false,
    isLoading: false,
    responseData: [],
    errMsg: "",
  };

  const stockInitial = {
    isError: false,
    isLoading: true,
    errMsg: "",
    responseData: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [stockState, stockDispatch] = useReducer(stockReducer, stockInitial);

  const isAlreadyInStock = (stock) => {
    state.responseData.forEach((ele) => {
      console.log(stock, ele.symbol);
      if (ele.symbol == stock) {
        return true;
      }
    });

    return false;
  };

  const addIntoStock = (value) => {
    if (!isAlreadyInStock(value)) {
      addStockData(...stockData, value);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        dispatch({ type: "LOADING_DATA" });
        const response = await Promise.all(
          stockData.map((element) => {
            return finhub.get(`/quote`, {
              params: {
                symbol: element,
              },
            });
          })
        );

        const data = response.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });

        if (isMounted) {
          dispatch({ type: "FETCH_DATA", payload: { data: data } });
        }
      } catch (err) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, []);

  const fetchSingleStock = async (stock) => {
    try {
      if (!isAlreadyInStock(stock)) {
        stockDispatch({ type: "STOCK_LOADING" });
        const response = await finhub.get("/quote", {
          params: {
            symbol: stock,
          },
        });

        const data = {
          data: response.data,
          symbol: response.config.params.symbol,
        };
        dispatch({ type: "ADD_STOCK", payload: { data: data } });
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const contextValue = {
    state,
    dispatch,
    addIntoStock,
    fetchSingleStock,
    stockState,
    stockDispatch,
  };

  return (
    <contextProvider.Provider value={contextValue}>
      {children}
    </contextProvider.Provider>
  );
};

export default contextProvider;
