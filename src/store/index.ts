import { createStore } from "easy-peasy";
import auth, { AuthModel } from "./auth";
import board, { BoardModel } from "./board";

export interface StoreModel {
  auth: AuthModel;
  board: BoardModel;
}

export const storeModel: StoreModel = { auth, board };

const store = createStore(storeModel, {});

export default store;
