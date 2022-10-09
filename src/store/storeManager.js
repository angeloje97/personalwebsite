import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./auth";

const StoreManager = () => {
  const dispatch = useDispatch();

  //Every starting function for different slices.
  useEffect(() => {
    dispatch(authActions.onStart());
  }, []);
  return null;
};

export default StoreManager;
