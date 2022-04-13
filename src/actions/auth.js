import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading()) 
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(finishLoading());
        
      });
  };
};

export const startRegisterWhitEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password).then(
      async ({ user }) => {
        await updateProfile(user, { displayName: name });
        console.log(user);
        dispatch(login(user.uid, user.displayName));
      }
    );
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, provider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogOut = () => {
  return async(dispatch) => {
   await signOut(auth);

   dispatch(logOut())
  };
}

export const logOut = () => ({
  type: types.logout
})