import { configureStore } from "@reduxjs/toolkit";
import { ticketReducer as ticketsSlice } from "@/entities/ticket";

export const makeStore = () =>
  configureStore({
    reducer: {
      tickets: ticketsSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
