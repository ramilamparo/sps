import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RoundModel } from "../models/RoundModel";

export interface RoundBet {
	bet: number;
	guess: number;
	player: string;
}

// Define a type for the slice state
interface RoundState {
	currentRound: RoundModel | null;
	answer: number;
	guess: number;
	bet: number;
	speed: number;
	username: string;
	bets: RoundBet[];
}

// Define the initial state using that type
const initialState: RoundState = {
	currentRound: null,
	answer: 0,
	guess: 0,
	bet: 0,
	speed: 1,
	username: "",
	bets: [],
};

export const roundSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		setRound: (state, action: PayloadAction<RoundModel>) => {
			state.currentRound = action.payload;
		},
		setAnswer: (state, action: PayloadAction<number>) => {
			state.answer = action.payload;
		},
		setGuess: (state, action: PayloadAction<number>) => {
			state.guess = action.payload;
		},
		setBet: (state, action: PayloadAction<number>) => {
			state.bet = action.payload;
		},
		setSpeed: (state, action: PayloadAction<number>) => {
			state.speed = action.payload;
		},
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setRoundBets: (state, action: PayloadAction<RoundBet[]>) => {
			state.bets = action.payload;
		},
	},
});

export const {
	setRound,
	setAnswer,
	setBet,
	setGuess,
	setSpeed,
	setUsername,
	setRoundBets,
} = roundSlice.actions;

export default roundSlice.reducer;
