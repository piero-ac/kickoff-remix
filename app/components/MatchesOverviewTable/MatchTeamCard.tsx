const MatchTeamCard = ({
	team: { name, logo },
	isHomeTeam,
}: {
	team: { name: string; logo: string };
	isHomeTeam: boolean;
}) => {
	const classes =
		"text-sm w-[116px] md:min-w-[180px] truncate " +
		(!isHomeTeam && "text-start");

	return (
		<p className={classes}>
			{isHomeTeam ? (
				<>
					{name}{" "}
					<img
						src={logo}
						alt={`Logo of ${name}`}
						height="25px"
						width="25px"
						className="inline"
					/>
				</>
			) : (
				<>
					{" "}
					<img
						src={logo}
						alt={`Logo of ${name}`}
						height="25px"
						width="25px"
						className="inline"
					/>
					{name}
				</>
			)}
		</p>
	);
};

export default MatchTeamCard;
