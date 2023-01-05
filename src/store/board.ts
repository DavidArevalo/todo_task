import { AlertColor } from "@mui/material";
import { Action, action, Thunk, thunk } from "easy-peasy";
import { db, collection, query, getDocs } from "../firebaseConfig";

export interface Alert {
  message?: string;
  severity?: AlertColor;
}

interface Board {
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  status: boolean;
}

export interface BoardModel {
  isLoading: boolean;
  setIsLoading: Action<BoardModel, boolean>;
  boards: Board[];
  setBoards: Action<BoardModel, Board[]>;
  getBoards: Thunk<BoardModel, void>;
  // createAppUser: Thunk<BoardModel, CreateUser>;
  // createAppUserSuccess: ThunkOn<AppUserModel, void, StoreModel>;
}

const boardModel: BoardModel = {
  isLoading: false,
  setIsLoading: action((state, loading) => {
    state.isLoading = loading;
  }),
  boards: [],
  setBoards: action((state, boards) => {
    state.boards = boards;
  }),
  getBoards: thunk(async (actions) => {
    const allBoards: Board[] = [];
    actions.setIsLoading(true);
    try {
      const q = query(collection(db, "board"));
      const querySnapshot = await getDocs(q);
      await querySnapshot.forEach((doc) => {
        allBoards.push({ ...doc.data() } as Board);
      });
      actions.setBoards(allBoards);
    } catch (error) {
      console.error({ error }, "Fail to fetch");
      /*   actions.setAlert({
        message: "Error al obtener los datos del personal",
        severity: "error",
      }); */
    } finally {
      actions.setIsLoading(false);
    }
  }),
};

export default boardModel;
