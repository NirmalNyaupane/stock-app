import { useEffect, useState } from "react";
import { finhub } from "../api/finhub";
import Chart from "react-apexCharts";
import CircularProgress from "@mui/material/CircularProgress";

export const StockChart = (stock) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const formatData = (data) => {
    setChartData(() => {
      return data.t.map((ele, indx) => {
        return {
          x: `${new Date(ele * 1000).getFullYear()}/${
            new Date(ele * 1000).getMonth() + 1
          }`,
          y: Math.floor(data.c[indx]),
        };
      });
    });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const date = new Date();
        const currentTime = Math.floor(date.getTime() / 1000);
        const oneYear = currentTime - 365 * 24 * 60 * 60;

        const response = await finhub.get("/stock/candle", {
          params: {
            symbol: stock.stock,
            from: oneYear,
            to: currentTime,
            resolution: "M",
          },
        });

        if (isMounted) {
          setLoading(false);
          formatData(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    console.log(chartData);
    fetchData();

    return () => isMounted == false;
  }, []);

  const options = {
    title: {
      text: stock.stock,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "Stock data",
      animation: {
        speed: 1300,
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
        },
      },
      tooltip: {
        x: {
          format: "MMM dd HH:MM",
        },
      },
    },
  };

  const series = [
    {
      name: stock.stock,
      data: chartData,
    },
  ];
  console.log(chartData);
  return (
    <>
      {isLoading && <div className="h-[80vh] flex justify-end items-center"><CircularProgress /></div>}
      {chartData.length > 0 ? (
        <Chart
          options={options}
          series={series}
          type="area"
          width="300%"
          height="150%"
        />
      ) : null}
    </>
  );
};
