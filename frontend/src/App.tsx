import { useState } from "react";
import { Button } from "./components/Button/Button";
import { Container } from "./components/Container/Container";
import { Paper } from "./components/Paper/Paper";
import styles from "./App.module.scss";
import { RangeInput } from "./components/RangeInput/RangeInput";

function App() {
	const [value, setValue] = useState(1);

	return (
		<>
			<Container className={styles.root}>
				<Paper variant="solid">
					<Button style={{ minWidth: "500px" }}>Start</Button>
				</Paper>
				<Paper>
					<Button style={{ minWidth: "500px" }}>Start</Button>
				</Paper>
				<Paper variant="gradient">
					<Button style={{ minWidth: "500px" }}>Start</Button>
					<RangeInput
						step={1}
						min={1}
						max={5}
						value={value}
						onChange={(value) => setValue(value)}
					/>
				</Paper>
			</Container>
		</>
	);
}

export default App;
