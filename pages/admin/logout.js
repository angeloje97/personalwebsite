import { useRouter } from "next/router";
import { authActions } from "../../src/store/auth";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(authActions.logout());
      router.push("/");
    };
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default Logout;
