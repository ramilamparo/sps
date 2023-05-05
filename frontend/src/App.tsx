import { useCallback, useMemo } from "react";
import { Button } from "./components/Button/Button";
import { Paper } from "./components/Paper/Paper";
import styles from "./App.module.scss";
import { RangeInput } from "./components/RangeInput/RangeInput";
import { NumberInput } from "./components/NumberInput/NumberInput";
import { RankingTable } from "./components/Table/RankingTable";
import { ChatBox } from "./components/ChatBox/ChatBox";
import { Chart } from "./components/Chart/Chart";
import {
	MdAccessTime,
	MdEmojiEvents,
	MdMilitaryTech,
	MdPerson,
	MdSpeed,
} from "react-icons/md";
import clsx from "clsx";
import { betRound, createRound } from "./api/round";
import { BOTS } from "./config/env";
import { useAppDispatch, useAppSelector } from "./redux";
import {
	setAnswer,
	setBet,
	setGuess,
	setRound,
	setRoundBets,
	setSpeed,
	setUsername,
} from "./redux/round";
import { BotHelper } from "./utils/BotHelper";
import { RoundPlayersTable } from "./components/Table/RoundPlayersTable";

function App() {
	const dispatch = useAppDispatch();
	const { answer, bet, currentRound, guess, speed, username } =
		useAppSelector((state) => state.round);

	const player = useMemo(() => {
		return currentRound?.players.find(
			(player) => player.username === username
		);
	}, [currentRound?.players, username]);

	const handleInitializeRound = useCallback(async () => {
		if (username) {
			const { data } = await createRound([username, ...BOTS]);
			dispatch(setRound(data));
		}
	}, [dispatch, username]);

	const handleStartRound = useCallback(async () => {
		if (currentRound) {
			const bets = currentRound.players.map((player) => {
				if (player.username === username) {
					return {
						bet: bet,
						guess,
						player: player.username,
					};
				}
				return {
					bet: BotHelper.generateBet(player.RoundPlayer.points),
					guess: BotHelper.generateGuess(),
					player: player.username,
				};
			});
			const { data } = await betRound(currentRound.id, bets);
			dispatch(setRoundBets(bets));
			dispatch(setRound(data.round));
			dispatch(setAnswer(data.number));
		}
	}, [bet, dispatch, guess, currentRound, username]);

	return (
		<>
			<div className="mt-5 container" data-bs-theme="dark">
				<div className="row g-3 mb-3">
					<div className="col-xs-12 col-md-4">
						<div className="d-flex gap-3">
							<Paper
								variant="gradient"
								className={clsx(
									"flex-grow-1",
									styles.numberInputs
								)}
							>
								<label>Points</label>
								<NumberInput
									disabled={!currentRound}
									value={bet}
									onChange={(e) => dispatch(setBet(e))}
								/>
							</Paper>
							<Paper
								variant="gradient"
								className={clsx(
									"flex-grow-1",
									styles.numberInputs
								)}
							>
								<label>Multiplier</label>
								<NumberInput
									disabled={!currentRound}
									value={guess}
									onChange={(e) => dispatch(setGuess(e))}
								/>
							</Paper>
						</div>
					</div>
					<div className="col-xs-12 col-md-8">
						<div className="d-flex gap-3 h-100">
							<Paper
								variant="gradient"
								className={styles.infoCard}
							>
								<span className={styles.icon}>
									<MdMilitaryTech />
								</span>
								<span className={styles.text}>
									{player ? player.RoundPlayer.points : null}
								</span>
							</Paper>
							<Paper
								variant="gradient"
								className={styles.infoCard}
							>
								<span className={styles.icon}>
									<MdPerson />
								</span>
								<span className={styles.text}>
									{player?.username}
								</span>
							</Paper>
							<Paper
								variant="gradient"
								className={styles.infoCard}
							>
								<span className={styles.icon}>
									<MdAccessTime />
								</span>
								<span className={styles.text}>21:30</span>
							</Paper>
						</div>
					</div>
				</div>
				<div className="row g-3 mb-3">
					<div className="col-xs-12 col-md-4">
						{!currentRound ? (
							<Paper
								variant="solid"
								className="d-flex flex-column justify-content-between align-items-center p-4"
								style={{ height: "500px" }}
							>
								<h3>Welcome!</h3>
								<div className="flex-grow-1 d-flex flex-column justify-content-center align-self-stretch">
									<p
										className="text-muted text-center"
										style={{ fontSize: "0.8rem" }}
									>
										Please insert your name.
									</p>
									<input
										className="form-control mb-3"
										onChange={(e) =>
											dispatch(
												setUsername(e.target.value)
											)
										}
									></input>
									<Button
										className="mb-3 w-100"
										onClick={handleInitializeRound}
									>
										Accept
									</Button>
								</div>
							</Paper>
						) : (
							<div className="d-flex flex-column gap-3">
								<Button
									className="w-100"
									onClick={handleStartRound}
								>
									Start
								</Button>
								<div>
									<div className="fs-5">
										<span className="fs-3 me-2">
											<MdEmojiEvents />
										</span>
										Current Round
									</div>
									<RoundPlayersTable />
								</div>
								<div>
									<div className="fs-5">
										<span className="fs-3 me-2">
											<MdSpeed />
										</span>
										Speed
									</div>
									<Paper variant="solid">
										<RangeInput
											step={1}
											min={1}
											max={5}
											value={speed}
											onChange={(value) =>
												dispatch(setSpeed(value))
											}
										/>
									</Paper>
								</div>
							</div>
						)}
					</div>
					<div className="col-xs-12 col-md-8">
						<Paper variant="solid" style={{ height: "500px" }}>
							<Chart
								key={answer}
								value={answer}
								speed={speed * 100}
							/>
						</Paper>
					</div>
				</div>
				<div className="row g-3">
					<div className="col-xs-12 col-md-6">
						<RankingTable />
					</div>
					<div className="col-xs-12 col-md-6">
						<ChatBox className="h-100" />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
