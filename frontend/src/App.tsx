import { useState } from "react";
import { Button } from "./components/Button/Button";
import { Container } from "./components/Container/Container";
import { Paper } from "./components/Paper/Paper";
import styles from "./App.module.scss";
import { RangeInput } from "./components/RangeInput/RangeInput";
import { NumberInput } from "./components/NumberInput/NumberInput";
import { RankingTable } from "./components/Table/RankingTable";

function App() {
	const [rangeValue, setRangeValue] = useState(1);
	const [numberValue, setNumberValue] = useState(1);

	return (
		<>
			<Container className={styles.root}>
				<Paper variant="solid">
					<Button style={{ minWidth: "500px" }}>Start</Button>
				</Paper>
				<Paper>
					<NumberInput
						value={numberValue}
						onChange={setNumberValue}
					/>
				</Paper>
				<Paper variant="gradient">
					<RangeInput
						step={1}
						min={1}
						max={5}
						value={rangeValue}
						onChange={(value) => setRangeValue(value)}
					/>
				</Paper>
				<RankingTable />
			</Container>
		</>
	);
}

export default App;
