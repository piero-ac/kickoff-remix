const MatchSelectButton = ({
	text,
	selected,
	onClick,
}: {
	text: string;
	selected?: boolean;
	onClick?: () => void;
}) => {
	return (
		<button
			className={`text-brightwhite p-1 w-[100px] hover:bg-hotpink hover:font-semibold ${
				!selected ? "bg-darkpurple" : "bg-hotpink font-semibold"
			} `}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default MatchSelectButton;
