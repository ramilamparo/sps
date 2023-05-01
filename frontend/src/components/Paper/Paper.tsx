import clsx from "clsx";
import styles from "./Paper.module.scss";
import { BasePaper } from "./BasePaper";

type BaseProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export type PaperVariant = "solid" | "gradient";

export interface PaperProps extends BaseProps {
	variant?: PaperVariant;
}

export const Paper = ({ className, variant, ...props }: PaperProps) => {
	return (
		<BasePaper
			{...props}
			className={clsx(styles.root, getStyle(variant), className)}
		/>
	);
};

const getStyle = (variant?: PaperVariant) => {
	switch (variant) {
		case "gradient":
			return styles.gradient;
		case "solid":
			return styles.solid;
		default:
			return null;
	}
};
