import { useState, useEffect, useContext } from "react";
import contextProvider from "../context/Finhub";
import { finhub } from "../api/finhub";
import Stock from "../assets/Stock.jpg";

export const AutoComplete = () => {
  const [searchQuery, setQuery] = useState("");
  const [result, changeResult] = useState([]);
  const { fetchSingleStock } = useContext(contextProvider);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finhub.get("/search", {
          params: {
            q: searchQuery,
          },
        });
        if (isMounted) {
          changeResult(response.data.result);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    if (searchQuery.length > 0) {
      fetchData();
    } else {
      changeResult([]);
    }
  }, [searchQuery]);

  return (
    <div className="pt-2 relative mx-auto text-gray-600 w-[70%] max-w-[500px]">
      <img src={Stock} className="block my-4 w-56 mx-auto" />
      <h2 className="font-bold text-lg text-center my-7">Trding Love</h2>
      <input
        className="border-2 border-gray-300 bg-white 
        h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full mb-11"
        type="search"
        name="search"
        placeholder="Search"
        autoComplete="off"
        value={searchQuery}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div
        className={`dropDown absolute top-22 mx-auto bg-white border px-4 h-80 overflow-y-auto w-full 
        ${searchQuery.length < 1 ? "hidden" : null}
      `}
      >
        <ul className="space-y-1">
          {result.map((ele, ind) => {
            return (
              <li
                key={ind}
                className="flex cursor-pointer hover:bg-slate-200 py-1 px-4"
                onClick={() => {
                  console.log(ele.symbol);
                  fetchSingleStock(ele.symbol);
                  setQuery("");
                }}
              >
                {ele.description} ({ele.symbol})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AutoComplete;
