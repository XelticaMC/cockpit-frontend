import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { setTitle } from "../store/slices/screen";

export function useTitle(title: string) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTitle(title));
  }, [dispatch, title]);
}