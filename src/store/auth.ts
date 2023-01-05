import { AlertColor } from "@mui/material";
import { Action, action, Thunk, thunk } from "easy-peasy";
import {
  auth,
  db,
  collection,
  query,
  where,
  getDocs,
  onAuthStateChanged,
  firebase,
  firebaseConfig,
} from "../firebaseConfig";

export interface Alert {
  message?: string;
  severity?: AlertColor;
}

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  rol: string;
}

export interface LoginInfo {
  email: string;
  password: string;
  checked: boolean;
}

export interface AuthModel {
  isAuthenticated: boolean;
  isLoading: boolean;
  alert: Alert;
  setAlert: Action<AuthModel, Alert>;
  resetAlert: Action<AuthModel, void>;
  setIsLoading: Action<AuthModel, boolean>;
  setIsAuthenticated: Action<AuthModel, boolean>;
  user: User;
  setUserInfo: Action<AuthModel, User>;
  getCurrentUser: Thunk<AuthModel, void>;
  getSession: Action<AuthModel, void>;
  login: Thunk<AuthModel, LoginInfo>;
  signOut: Action<AuthModel, void>;
}

const authModel: AuthModel = {
  isAuthenticated: false,
  isLoading: false,
  alert: {},
  setAlert: action((state, payload) => {
    state.alert = payload;
  }),
  resetAlert: action((state) => {
    state.alert = {};
  }),
  setIsLoading: action((state, loadingState) => {
    state.isLoading = loadingState;
  }),
  setIsAuthenticated: action((state, authenticated) => {
    state.isAuthenticated = authenticated;
  }),
  user: {} as User,
  setUserInfo: action((state, userInfo) => {
    state.user = userInfo;
  }),
  getCurrentUser: thunk(async (actions) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const q = query(collection(db, "app-user"), where("uid", "==", uid));

        const querySnapshot = await getDocs(q);
        let data: User = {} as User;
        await querySnapshot.forEach((doc) => {
          data = doc.data() as User;
        });
        actions.setUserInfo(data);
      }
    });
  }),
  getSession: action((state) => {
    const user = window.sessionStorage.getItem(`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`);
    if (user) state.isAuthenticated = true;
  }),
  login: thunk(async (actions, payload) => {
    const { email, password, checked } = payload;
    actions.setIsLoading(true);
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(async (result: firebase.auth.UserCredential) => {
          let data: User = {} as User;
          if (result.user) {
            const uid = result.user?.uid;
            const q = query(collection(db, "app-user"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            await querySnapshot.forEach((doc) => {
              data = doc.data() as User;
            });
            actions.setUserInfo(data);
            actions.setIsAuthenticated(true);
          }
        })
        .catch((err) => {
          actions.setAlert({
            message: "Error de login, usuario o contraseña incorrectos",
            severity: "error",
          });
        })
        .finally(() => {
          actions.setIsLoading(false);
        });
    });
  }),
  signOut: action((state) => {
    auth.signOut().then(async () => {
      sessionStorage.removeItem(`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`);
      localStorage.removeItem(`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`);
    });
    state.isAuthenticated = false;
  }),
};

export default authModel;
