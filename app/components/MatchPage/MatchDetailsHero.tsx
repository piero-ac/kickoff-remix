export default function MatchDetailsHero({
	home,
	away,
	score,
}: {
	home: Team;
	away: Team;
	score: Score;
}) {
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
				<p className="text-3xl sm:text-4xl font-bold">
					{score.fulltime.home} - {score.fulltime.away}
				</p>
				<p className="text-sm sm:text-lg">
					Halftime: {score.halftime.home} - {score.halftime.away}
				</p>
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
