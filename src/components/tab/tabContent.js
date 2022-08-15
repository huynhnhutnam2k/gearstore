import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
const TabContent = ({ description }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", fontFamily: "Josefin Sans" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Thông tin kỹ thuật"
            {...a11yProps(0)}
            style={{ fontFamily: "Josefin Sans" }}
          />
          <Tab
            label="Thông tin bảo hành"
            {...a11yProps(1)}
            style={{ fontFamily: "Josefin Sans" }}
          />
          <Tab
            label="Item Three"
            {...a11yProps(2)}
            style={{ fontFamily: "Josefin Sans" }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="">{description}</div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="text-red-500 text-center">
          Xin quý khách vệ sinh sản phẩm và mang theo những phụ kiện có liên
          quan khi đến bảo hành. Thời gian nhận bảo hành: 09h đến 18h từ thứ 2
          đến 7 (Chủ nhật và các ngày lễ nghỉ).
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
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

export default TabContent;
