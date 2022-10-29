import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./auth";
import { onStartProjects } from "./projActions";
import { onStartAboutMe } from "./aboutMeActions";

const StoreManager = () => {
  const dispatch = useDispatch();

  //Every starting function for different slices.
  useEffect(() => {
    dispatch(authActions.onStart());
    dispatch(onStartAboutMe());
    dispatch(onStartProjects());
  }, []);
  return null;
};

export default StoreManager;
