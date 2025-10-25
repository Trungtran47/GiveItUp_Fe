"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getDataUser } from "../redux/user/reducer";

export default function AppInitializer() {
  const dispatch = useDispatch();
  const userCookie = Cookies.get("user");

  useEffect(() => {
    if (userCookie) {
      const { Token } = JSON.parse(userCookie);
      if (Token) {
        dispatch(getDataUser());
      }
    }
  }, [userCookie]);

  return null;
}
