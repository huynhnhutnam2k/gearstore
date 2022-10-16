import axios from "axios";
import create from "zustand";
import {
  JBLE55BTKEYBLACK1,
  JBLE55BTKEYBLACK2,
  JBLHorizon1,
  JBLHorizon2,
  JBLJR0310BT1,
  JBLJR0310BT2,
  JBLQuantum4001,
  JBLQuantum4002,
  JBLTune220TWS1,
  JBLTune220TWS2,
  JBLTUNE750BTNC1,
  JBLTUNE750BTNC2,
  TS131,
  TS132,
  UAProjectRock1,
  UAProjectRock2,
} from "../assets/image";
const initial = [
  {
    name: "JBL E55BT KEY BLACK",
    image1: JBLE55BTKEYBLACK1,
    image2: JBLE55BTKEYBLACK2,
    old_price: "400",
    curr_price: "300",
  },
  {
    name: "Tai nghe Bluetooth True Wireless Mozard TS13 ",
    image1: TS131,
    image2: TS132,
    old_price: "400",
    curr_price: "300",
  },
  {
    name: "JBL Quatium 400",
    image1: JBLQuantum4001,
    image2: JBLQuantum4002,
    old_price: "400",
    curr_price: "300",
  },
  {
    name: "JBL JR 310BT",
    image1: JBLJR0310BT1,
    image2: JBLJR0310BT2,
    old_price: "400",
    curr_price: "300",
  },
  {
    name: "JBL TUNE 750BTNC",
    image1: JBLTUNE750BTNC1,
    image2: JBLTUNE750BTNC2,
    old_price: "400",
    curr_price: "300",
  },
  {
    name: "JBL Horizon",
    image1: JBLHorizon1,
    image2: JBLHorizon2,
    old_price: "400",
    curr_price: "300",
  },
  {
    name: "JBL Tune 220TWS",
    image1: JBLTune220TWS1,
    image2: JBLTune220TWS2,
    old_price: "400",
    curr_price: "300",
  },
  {
    name: "UA Project Rock",
    image1: UAProjectRock1,
    image2: UAProjectRock2,
    old_price: "400",
    curr_price: "300",
  },
];

const initialCate = [
  {
    name: "Wireless",
  },
  {
    name: "JBL",
  },
];
export const useProductStore = create((set) => ({
  products: initial,
  product: {},
  isLoading: false,
  isError: false,
  category: initialCate,
  fetch: async () => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.get("http://localhost:3001/product");
      set(() => ({ isLoading: false, products: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
      console.log(error);
    }
  },
  addProduct: async (product) => {
    set(() => ({ isLoading: true }));
    try {
      const res = await axios.post("http://localhost:3001/product", product);
      set(() => ({ isLoading: false, product: res.data }));
    } catch (error) {
      set(() => ({ isLoading: false, isError: true }));
      console.log(error);
    }
  },
}));
