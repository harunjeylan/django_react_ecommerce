import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useGetUseDataQuery } from "../features/auth/authApiSlice";
import { setUserData } from "../features/auth/authSlice";
import { useMemo } from "react";

const useGetUser = (selectCurrentRefresh) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectCurrentUser);

  const { data: newUserData } = useGetUseDataQuery();

  useEffect(() => {
    if (newUserData) dispatch(setUserData(newUserData));
    console.log(newUserData);
  }, [selectCurrentRefresh, newUserData]);
};

export default useGetUser;
