import { useCallback, useMemo } from "react";
import { BasePaper } from "../Paper/BasePaper";
import { Table, TableColumns } from "./Table";
import { useAppSelector } from "../../redux";
import { RoundBet } from "../../redux/round";
import { BOTS } from "../../config/env";
import styles from "./RoundPlayersTable.module.scss";

export const RoundPlayersTable = () => {
	const { username, bets, currentRound, answer } = useAppSelector(
		(state) => state.round
	);

	const data = useMemo(() => {
		if (bets.length) {
			const rows: ColumnData[] = [];
			bets.forEach((bet) => {
				const roundPlayer = currentRound?.players.find(
					(player) => player.username === bet.player
				);
				const data: ColumnData = {
					bet: bet.bet,
					guess: bet.guess,
					player: bet.player,
					points: roundPlayer?.RoundPlayer.points ?? 0,
				};
				if (bet.player === username) {
					rows.unshift(data);
				} else {
					rows.push(data);
				}
			});
			return rows;
		}
		return [username, ...BOTS].map<ColumnData>((username) => {
			const roundPlayer = currentRound?.players.find(
				(player) => player.username === username
			);
			return {
				bet: 0,
				guess: 0,
				player: username,
				points: roundPlayer?.RoundPlayer.points ?? 0,
			};
		});
	}, [bets, currentRound?.players, username]);

	const winner = useMemo(() => {
		if (!answer) {
			return null;
		}
		const winner = bets.reduce<RoundBet | null>((winner, bet) => {
			if (!winner && bet.bet > 0 && bet.guess <= answer) {
				return bet;
			}
			if (winner && bet.bet > 0 && bet.guess <= answer) {
				console.log(bet);
				const distanceA = answer - bet.guess;
				const distanceB = answer - winner.guess;
				if (distanceA < distanceB) {
					return bet;
				}
			}
			return winner;
		}, null);
		return winner;
	}, [answer, bets]);

	const getRowClass = useCallback(
		(data: ColumnData) => {
			if (data.player === winner?.player) {
				return styles.winnerRow;
			}
			return "";
		},
		[winner]
	);

	return (
		<BasePaper>
			<Table
				data={data}
				columns={COLUMNS}
				keyExtract={keyExtract}
				classes={{ row: getRowClass }}
			/>
		</BasePaper>
	);
};

const keyExtract = (data: ColumnData, index: number) => data.player + index;

const COLUMNS: TableColumns<ColumnData>[] = [
	{ field: "name", label: "Name", render: (data) => <>{data.player}</> },
	{
		field: "points",
		label: "Remaining Pts.",
		render: (data) => <>{data.points || "-"}</>,
	},
	{
		field: "bet",
		label: "Pts.",
		render: (data) => <>{data.bet || "-"}</>,
	},
	{
		field: "multiplier",
		label: "Mul.",
		render: (data) => <>{data.guess || "-"}</>,
	},
];

interface ColumnData extends RoundBet {
	points: number;
}
