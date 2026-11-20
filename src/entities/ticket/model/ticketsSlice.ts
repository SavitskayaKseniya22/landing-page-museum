import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ExhibitionType, type TicketSelection } from "./types";
import { normalizeTicketCount } from "./quantity";

export const initialState: TicketSelection = {
  exhibition: ExhibitionType["Permanent exhibition"],
  basic: 0,
  senior: 0,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addPreData: (state, { payload }: PayloadAction<TicketSelection>) => {
      state.exhibition = payload.exhibition;
      state.basic = normalizeTicketCount(payload.basic);
      state.senior = normalizeTicketCount(payload.senior);
    },
  },
});
export const { addPreData } = ticketsSlice.actions;
export default ticketsSlice.reducer;
