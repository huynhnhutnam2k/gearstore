import {
  CLOSED_COLOR,
  FAVOURITE_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "constant/colors";
import React from "react";
//material-ui
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";
import PriorityHighOutlinedIcon from "@material-ui/icons/PriorityHighOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";

//toast
import { toast } from "react-toast";

const ToastMessage = (type) => {
  //   toast;
  const toastType = toastTypes[type];
  return toast(ToastBody({ toastType }), {
    closeButton: CloseButton(),
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: false,
  });
};

//toast body

const ToastBody = ({ toastType }) => {
  <div className="toast-msg" style={{ backgroundColor: `${toastType.color}` }}>
    <div className="toast-msg__icon">{toastType.setIcon()}</div>
    <div className="toast-msg__content">
      <h4 className="toast-msg__title">{toastType.title}!</h4>
      <div className="toast-msg__description">{toastType.desc}</div>
    </div>
  </div>;
};

const CloseButton = () => (
  <div className="toast-msg__close">
    <ExitToAppIcon />
  </div>
);
const toastTypes = {
  success: {
    title: "Success",
    desc: "The product has been added to cart",
    color: SUCCESS_COLOR,
    setIcon: () => <DoneOutlinedIcon style={{ fill: SUCCESS_COLOR }} />,
  },
  wishlist: {
    title: "Success",
    desc: "The product has been added to your favorites",
    color: FAVOURITE_COLOR,
    setIcon: () => <LoyaltyOutlinedIcon style={{ fill: FAVOURITE_COLOR }} />,
  },
  warning: {
    title: "Warning",
    desc: "Your cart is empty!",
    color: WARNING_COLOR,
    setIcon: () => <PriorityHighOutlinedIcon style={{ fill: WARNING_COLOR }} />,
  },
  closed: {
    title: "Closed",
    desc: "This feature is currently closed. Try login with Google or Facebook",
    color: CLOSED_COLOR,
    setIcon: () => <SettingsIcon style={{ fill: CLOSED_COLOR }} />,
  },
};

export default ToastMessage;
