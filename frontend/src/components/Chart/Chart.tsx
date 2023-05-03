import { useState, useMemo, useEffect } from "react";
import { ParentSize } from "@visx/responsive";
import { curveMonotoneX } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import styles from "./Chart.module.scss";

export interface ChartProps {
	value: number;
	speed?: number;
}

export const Chart = ({ value, speed = 1 }: ChartProps) => {
	const [displayedCount, setDisplayedCount] = useState(0);
	const [data, setData] = useState<Array<{ x: number; y: number }>>([]);

	const chartData = useMemo(() => {
		return generateData(speed / 100);
	}, [speed]);

	const xScale = useMemo(
		() =>
			scaleLinear<number>({
				domain: [0, Math.max(...chartData.map((d) => d.x))],
			}),
		[chartData]
	);
	const yScale = useMemo(
		() =>
			scaleLinear<number>({
				domain: [0, Math.max(...chartData.map((d) => d.y))],
			}),
		[chartData]
	);

	useEffect(() => {
		const index = chartData.findIndex((d) => d.x >= value);
		let i = 0;

		const chartInterval = setInterval(() => {
			if (i < index) {
				setDisplayedCount(Math.round(chartData[i].x * 100) / 100);
				setData(chartData.slice(0, i));
			} else {
				setDisplayedCount(value);
			}
			i++;
		}, 1 / speed);

		return () => {
			clearInterval(chartInterval);
		};
	}, [chartData, speed, value]);

	return (
		<ParentSize className={styles.root}>
			{({ height, width }) => {
				xScale.range([0, width - 5]);
				yScale.range([height - 2, 5]);

				return (
					<>
						<div className={styles.text}>
							{displayedCount.toFixed(2)}x
						</div>
						<svg height={height} width={width}>
							<defs>
								<radialGradient id="Gradient1">
									<stop stopColor="#feb623" offset="0%" />
									<stop stopColor="#feb623" offset="50%" />
									<stop
										stopColor="transparent"
										offset="100%"
									/>
								</radialGradient>
								<marker
									id="marker-circle"
									markerWidth="5"
									markerHeight="5"
									markerUnits="strokeWidth"
									refX="2"
									refY="2.5"
									orient="auto-start-reverse"
									strokeWidth="1"
									fill="url(#Gradient1)"
								>
									<circle r="3" cx="2.5" cy="2.5"></circle>
								</marker>
							</defs>
							<LinePath
								curve={curveMonotoneX}
								data={data}
								x={(d) => xScale(d.x)}
								y={(d) => yScale(d.y)}
								markerEnd="url(#marker-circle)"
								stroke="#fd5f43"
								strokeWidth={5}
								shapeRendering="geometricPrecision"
							/>
						</svg>
					</>
				);
			}}
		</ParentSize>
	);
};

const generateData = (multiplier: number) => {
	const data = [];

	for (let i = 0; i < 2.5; i += 0.05 * multiplier) {
		data.push({ x: i, y: 0 });
	}
	for (let j = 2.5, i = 0; j <= 10; j += 0.05 * multiplier, i++) {
		data.push({ x: j, y: j * i });
	}

	return data;
};
