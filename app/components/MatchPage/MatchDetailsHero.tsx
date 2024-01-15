export default function MatchDetailsHero({
	fixtureStatus,
	home,
	away,
	score,
}: {
	fixtureStatus: string;
	home: Team;
	away: Team;
	score: Score;
}) {
	let fulltimeScore = undefined;
	let halftimeScore = undefined;

	switch (fixtureStatus) {
		case "FT":
			fulltimeScore = `${score.fulltime.home} - ${score.fulltime.away}`;
			halftimeScore = `${score.halftime.home} - ${score.halftime.away}`;
			break;
		case "HT":
			fulltimeScore = `${score.halftime.home} - ${score.halftime.away}`;
			halftimeScore = `${score.halftime.home} - ${score.halftime.away}`;
			break;
		case "ET":
			fulltimeScore = `${score.extratime.home} - ${score.extratime.away}`;
			halftimeScore = `${score.halftime.home} - ${score.halftime.away}`;
			break;
		default:
			fulltimeScore = `${score.fulltime.home} - ${score.fulltime.away}}`;
			halftimeScore = `${score.halftime.home} - ${score.halftime.away}`;
			break;
	}

	return (
		<>
			<div className="flex flex-col items-center text-brightwhite font-semibold grow">
				<img
					src={home.logo}
					alt={`${home.name}'s Logo`}
					className="w-[60px] sm:w-[80px] md:w-[100px]"
				/>

				<p>{home.name}</p>
			</div>
			<div className="bg-darkpurple rounded-lg text-white w-[150px] sm:w-[160px] flex flex-col items-center justify-center">
				{fixtureStatus === "NS" ? (
					<p className="text-3xl sm:text-4xl font-semibold text-center">
						Not Started
					</p>
				) : (
					<>
						<p className="text-3xl sm:text-4xl font-bold">{fulltimeScore}</p>
						<p className="text-sm sm:text-lg">Halftime: {halftimeScore}</p>
					</>
				)}
			</div>
			<div className="flex flex-col items-center text-brightwhite font-semibold grow">
				<img
					src={away.logo}
					alt={`${away.name}'s Logo`}
					className="w-[60px] sm:w-[80px] md:w-[100px]"
				/>
				<p>{away.name}</p>
			</div>
		</>
	);
}
