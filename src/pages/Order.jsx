/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NewLayout from "components/layout/NewLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder, resetState } from "app/orderSlice";
import OrderLayout from "components/order/OrderLayout";
import { toast } from "react-toastify";
import { useRef } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { pending, processing, cancelled, completed, shipping } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab
            label="Đang chờ"
            {...a11yProps(0)}
            sx={{ color: "#023047", fontWeight: 700 }}
          />
          <Tab
            label="Đang xử lý"
            {...a11yProps(1)}
            sx={{ color: "#fb8b24", fontWeight: 700 }}
          />
          <Tab
            label="Đang vận chuyển"
            {...a11yProps(2)}
            sx={{ color: "#ffd60a", fontWeight: 700 }}
          />
          <Tab
            label="Hoàn tất"
            {...a11yProps(3)}
            sx={{ color: "#8ac926", fontWeight: 700 }}
          />
          <Tab
            label="Đã hủy"
            {...a11yProps(4)}
            sx={{ color: "#d00000", fontWeight: 700 }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {pending?.length > 0 ? (
          pending.map((item) => <OrderLayout item={item}></OrderLayout>)
        ) : (
          <div className="">Bạn không có giao dịch nào </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {processing?.length > 0 ? (
          processing.map((item) => <OrderLayout item={item}></OrderLayout>)
        ) : (
          <div className="">Bạn không có giao dịch nào </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {shipping?.length > 0 ? (
          shipping.map((item) => <OrderLayout item={item}></OrderLayout>)
        ) : (
          <div className="">Bạn không có giao dịch nào </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {completed?.length > 0 ? (
          completed.map((item) => (
            <>
              <OrderLayout item={item}></OrderLayout>
            </>
          ))
        ) : (
          <div className="">Bạn không có giao dịch nào </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {cancelled?.length > 0 ? (
          cancelled.map((item) => <OrderLayout item={item}></OrderLayout>)
        ) : (
          <div className="">Bạn không có giao dịch nào </div>
        )}
      </TabPanel>
    </Box>
  );
}
const Order = () => {
  const { orders, isSuccess, isError, isLoading } = useSelector(
    (state) => state.order
  );
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.stateDevide);
  useEffect(() => {
    if (userInfo?._id) {
      dispatch(fetchOrder(userInfo?.email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);
  const toastId = useRef();
  useEffect(() => {
    document.title = "Đơn hàng";
    if (isError) {
      toast.dismiss(toastId.current);
      toast.error("Hủy đơn hàng thất bại", { containerId: "A" });
      dispatch(resetState());
    } else if (isSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Hủy đơn hàng thành công", { containerId: "A" });
      dispatch(resetState());
    } else if (isLoading) {
      toastId.current = toast.info("Đang xử lý...", {
        containerId: "A",
        autoClose: false,
      });
    }
  }, [isError, isSuccess, isLoading]);
  return (
    <NewLayout>
      <div
        className={`container ${
          isMobile ? "py-2 min-h-[500px]" : "p-5"
        } min-h-[350px]`}
      >
        <BasicTabs
          pending={orders?.pending}
          completed={orders?.completed}
          cancelled={orders?.cancelled}
          processing={orders?.processing}
          shipping={orders?.shipping}
        ></BasicTabs>
      </div>
    </NewLayout>
  );
};

export default Order;
