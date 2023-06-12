import { useContext } from "react";
import contextProvider from "../context/Finhub";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const StockList = () => {
  const { state } = useContext(contextProvider);
  const navigate = useNavigate();
  const showStockDetail = (symbol) => {
    navigate(`stockdetail/${symbol}`);
  };

  const changeColor = (change) => {
    if (change > 0) {
      return "text-green-600";
    } else {
      return "text-red-600";
    }
  };

  const renderIcon = (change) => {
    if (change > 0) {
      return <AiFillCaretUp />;
    } else {
      return <AiFillCaretDown />;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-200 border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Last
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Change (%)
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    High
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Low
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Open
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Pclose
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.responseData.map((response) => {
                  return (
                    <tr
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                      key={response.symbol}
                      onClick={()=>showStockDetail(response.symbol)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {response.symbol}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium`}
                      >
                        {response.data.c}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2
                    ${changeColor(response.data.dp)}
                    `}
                      >
                        {renderIcon(response.data.dp)}
                        {response.data.dp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {response.data.h}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {response.data.l}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {response.data.o}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {response.data.pc}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockList;
