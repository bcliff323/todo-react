import "../css/styles.css";

type Props = {
  children?: React.ReactNode;
};

export default function Layout(props: Props) {
	const {children} = props;
	return (
		<div className="
			mx-5
			my-5
			w-full
			sm:w-2/3
		">
			{children}
		</div>
	)
}