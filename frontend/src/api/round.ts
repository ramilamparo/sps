import axios from "axios";

export const createRound = (usernames: string[]) =>
	axios.post(`/${process.env.REACT_APP_API_URL}/rounds`, { usernames });
