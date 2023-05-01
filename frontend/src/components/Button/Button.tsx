import clsx from "clsx";
import styles from "./Button.module.scss";

export type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export const Button = ({ className, ...props }: ButtonProps) => {
	return <button {...props} className={clsx(styles.root, className)} />;
};
