import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { finhub } from "../api/finhub";
import contextProvider from "../context/Finhub";
import { useContext } from "react";
import StockTable from "../components/StockTable";
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
    <div className="w-[90%] mx-auto">
      {stockState.isLoading == false ? (
        <h2 className="bg-green-700 w-fit px-2 py-1 text-white
        ">{stockState.responseData.name} ({stockState.responseData.ticker})</h2>
      ) : null}
        <hr className="bg-green-700 h-[2px]"/>
      <StockTable />
    </div>
  );
};

export default StockWatchlist;
