/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Box from "../components/box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
} from "../components/dashboard-wrapper/DashboardWrapper";
import SummaryBox from "../components/summary-box/SummaryBox";
import { colors } from "../constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { useOrderStore } from "../store/order-store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Dashboard = () => {
  const [data, setData] = useState(null);
  const { orders, fetchAll } = useOrderStore();
  useEffect(() => {
    fetchAll();
  }, []);
  useEffect(() => {
    const getRevenueToday = (orderList) => {
      const dateToday = new Date().getDate();
      const monthToday = new Date().getMonth();

      const list = orderList.filter(
        (item) =>
          new Date(item.createdAt).getDate() === dateToday &&
          new Date(item.createdAt).getMonth() === monthToday &&
          item.status !== "cancelled"
      );
      //   console.log(orderList, list);
      const data = {
        summary: [
          {
            title: "Doanh thu",
            subtitle: "Tổng doanh thu hôm nay",
            value: list?.reduce((a, b) => {
              return a + b.totalPrice;
            }, 0),
          },
          {
            title: "Đơn hàng",
            subtitle: "Số đơn hàng hôm nay",
            value: list?.length,
          },
        ],
      };
      setData(data);
    };
    getRevenueToday(orders);
  }, [orders.length]);
  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <div className="col-8 col-md-12">
            <div className="row">
              {data?.summary.map((item, index) => (
                <div
                  key={`summary-${index}`}
                  className="col-6 col-md-6 col-sm-12 mb"
                >
                  <SummaryBox item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Box>
              <RevenueByMonthsChart />
            </Box>
          </div>
        </div>
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

export default Dashboard;

const RevenueByMonthsChart = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: colors.orange,
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    },
  };
  const [data, setData] = useState([]);
  const { orders, fetchAll } = useOrderStore();
  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    const revenueByMonths = () => {
      for (let i = 1; i <= 12; i++) {
        const revenue =
          orders
            .filter(
              (item) =>
                new Date(item.createdAt).getMonth() === i &&
                item.status !== "cancelled"
            )
            .reduce((a, b) => {
              return a + b.totalPrice;
            }, 0) || 0;
        console.log(revenue);
        setData((prev) => [...prev, revenue]);
      }
    };
    revenueByMonths();
  }, [orders.length]);
  const labels = [
    "Hai",
    "Ba",
    "Bốn",
    "Năm",
    "Sáu",
    "Bảy",
    "Tám",
    "Chín",
    "Mười",
    "M.Một",
    "M.Hai",
    "Một",
  ];
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu",
        data: data,
      },
    ],
  };
  return (
    <>
      <div className="title mb">Doanh thu theo tháng</div>
      <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
      </div>
    </>
  );
};
