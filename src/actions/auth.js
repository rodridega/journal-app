import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebase-config";
import { types } from "../types/types";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user.uid);
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        console.log(err);
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
