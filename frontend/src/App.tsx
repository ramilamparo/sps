import { useRef, useState } from "react";
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

function App() {
	const [rangeValue, setRangeValue] = useState(1);
	const [numberValue, setNumberValue] = useState(1);
	const [points] = useState(1000);
	const [username, setUsername] = useState("");
	const usernameRef = useRef<HTMLInputElement>(null);

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
									value={numberValue}
									onChange={setNumberValue}
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
									value={numberValue}
									onChange={setNumberValue}
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
									{username ? points : null}
								</span>
							</Paper>
							<Paper
								variant="gradient"
								className={styles.infoCard}
							>
								<span className={styles.icon}>
									<MdPerson />
								</span>
								<span className={styles.text}>{username}</span>
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
						{!username ? (
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
										ref={usernameRef}
									></input>
									<Button
										className="mb-3 w-100"
										onClick={() =>
											setUsername(
												usernameRef.current?.value || ""
											)
										}
									>
										Accept
									</Button>
								</div>
							</Paper>
						) : (
							<div className="d-flex flex-column gap-3">
								<Button className="w-100">Start</Button>
								<div>
									<div className="fs-5">
										<span className="fs-3 me-2">
											<MdEmojiEvents />
										</span>
										Current Round
									</div>
									<RankingTable />
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
											value={rangeValue}
											onChange={(value) =>
												setRangeValue(value)
											}
										/>
									</Paper>
								</div>
							</div>
						)}
					</div>
					<div className="col-xs-12 col-md-8">
						<Paper variant="solid" style={{ height: "500px" }}>
							<Chart value={6} speed={100} />
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
