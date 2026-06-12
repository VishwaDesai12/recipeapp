import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import recipeReducer from "./recipeSlice";
import cookbookReducer from "./cookbookSlice";

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    cookbook: cookbookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
