import clsx from "clsx";
import styles from "./BasePaper.module.scss";

export type BasePaperProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export const BasePaper = ({ className, ...props }: BasePaperProps) => {
	return <div {...props} className={clsx(styles.root, className)} />;
};
