import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { finhub } from "../api/finhub";
import contextProvider from "../context/Finhub";
import { useContext } from "react";
import StockTable from "../components/StockTable";
import { StockChart } from "../components/StockChart";

const StockWatchlist = () => {
  const { stockState, stockDispatch } = useContext(contextProvider);
  const { symbol } = useParams();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finhub.get("stock/profile2", {
          params: {
            symbol: symbol,
          },
        });

        if (isMounted) {
          stockDispatch({ type: "STOCK_FETCH_DATA", payload: response.data });
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
    return () => (isMounted = false);
  }, []);
  return (
    <>
      {stockState.isLoading == false ? (
        <h2
          className="bg-green-700 w-fit px-2 py-1 text-white
        "
        >
          {stockState.responseData.name} ({stockState.responseData.ticker})
        </h2>
      ) : null}
      <hr className="bg-green-700 h-[2px]" />
      <div className="w-[90%] mx-auto flex md:flex-row flex-col-reverse justify-between container">
        <StockTable />
        <StockChart stock={symbol} />
      </div>
    </>
  );
};

export default StockWatchlist;
