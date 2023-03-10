import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "@/firebase.config";

import { createUser } from "./db";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState();
  const router = useRouter();

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);
      Cookies.set("get-feedback-auth", true, { expires: 1 });

      return user;
    } else {
      setUser(false);
      Cookies.remove("get-feedback-auth");

      return false;
    }
  };

  // ! Providers
  const signinWithRedirectGithub = () => {
    setAuthError(false);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((res) => handleUser(res.user))
      .then(() => router.push("/dashboard/sites"))
      .catch((error) => {
        setAuthError(error);
      });
  };
  const signinWithGithub = () => {
    setAuthError(false);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((res) => handleUser(res.user))
      .catch((error) => {
        setAuthError(error);
      });
  };

  const signinWithRedirectGoogle = () => {
    setAuthError(false);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => handleUser(res.user))
      .then(() => router.push("/dashboard/sites"))
      .catch((error) => {
        setAuthError(error);
      });
  };
  const signinWithGoogle = () => {
    setAuthError(false);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => handleUser(res.user))
      .catch((error) => {
        setAuthError(error);
      });
  };

  const signout = () => {
    setAuthError(false);
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
      .then(() => router.push("/"));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    authError,
    signinWithRedirectGithub,
    signinWithRedirectGoogle,
    signinWithGithub,
    signinWithGoogle,
    signout,
  };
};

const formatUser = (user) => {
  return {
    uid: user.uid,
    token: user._delegate.accessToken,
    name: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    provider: user.providerData[0].providerId,
  };
};
