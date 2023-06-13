import { useContext } from "react";
import contextProvider from "../context/Finhub";
const StockTable = () => {
  const { stockState } = useContext(contextProvider);

  return (
    <div className="">
      <div className="relative flex flex-col min-w-0 break-words bg-white mb-6 rounded ">
        <div className="block overflow-x-auto">
          <table className="items-center bg-transparent">
            <tbody>
              {/* first row */}
              <tr>
                <th className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-blueGray-700 ">
                  Sector
                </th>
                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 px-6">
                  {stockState.responseData.finnhubIndustry}
                </td>
              </tr>

              {/* second row */}
              <tr>
                <th className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-blueGray-700">
                  Country
                </th>
                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 px-6">
                  {stockState.responseData.country}
                </td>
              </tr>

              {/* Third row */}

              <tr>
                <th className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-blueGray-700 ">
                  Name
                </th>
                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 px-6">
                  {stockState.responseData.name}
                </td>
              </tr>

              {/* fourth row */}

              <tr>
                <th className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-blueGray-700 ">
                  Symbol
                </th>
                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 px-6">
                  {stockState.responseData.ticker}
                </td>
              </tr>

              {/* Fifth row */}

              <tr>
                <th className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-blueGray-700 ">
                  IPO
                </th>
                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 px-6">
                  {stockState.responseData.ipo}
                </td>
              </tr>

              {/* Fifth row */}

              <tr>
                <th className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-blueGray-700 ">
                  Share Outstanding
                </th>
                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 px-6">
                  {stockState.responseData.shareOutstanding}
                </td>
              </tr>

              {/* Fifth row */}

              <tr>
                <th className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left text-blueGray-700 ">
                  Market Capilization
                </th>
                <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 px-6">
                  {stockState.responseData.marketCapitalization}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockTable;
