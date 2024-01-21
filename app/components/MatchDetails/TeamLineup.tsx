const TeamLineup = ({
	startXI,
	substitutes,
}: {
	startXI: PlayerLineupInfo[];
	substitutes: PlayerLineupInfo[];
}) => {
	const goalkeeper = startXI.filter((player) => player.pos === "G");
	const defenders = startXI.filter((player) => player.pos === "D");
	const midfielders = startXI.filter((player) => player.pos === "M");
	const forwards = startXI.filter((player) => player.pos === "F");
	return (
		<div className="flex flex-row gap-3 sm:gap-1 justify-center">
			<div className="w-1/2">
				<div>
					<h3 className="text-darkpurple text-xl font-semibold">Goalkeeper</h3>
					{goalkeeper.map((player) => (
						<div key={player.id} className="flex flex-row gap-4">
							<p className="w-[30px]">{player.number}</p>
							<p>{player.name}</p>
						</div>
					))}
				</div>
				<div>
					<h3 className="text-darkpurple text-xl font-semibold">Defenders</h3>
					{defenders.map((player) => (
						<div key={player.id} className="flex flex-row gap-4">
							<p className="w-[30px]">{player.number}</p>
							<p>{player.name}</p>
						</div>
					))}
				</div>
				<div>
					<h3 className="text-darkpurple text-xl font-semibold">Midfielders</h3>
					{midfielders.map((player) => (
						<div key={player.id} className="flex flex-row gap-4">
							<p className="w-[30px]">{player.number}</p>
							<p>{player.name}</p>
						</div>
					))}
				</div>
				<div>
					<h3 className="text-darkpurple text-xl font-semibold">Forwards</h3>
					{forwards.map((player) => (
						<div key={player.id} className="flex flex-row gap-4">
							<p className="w-[30px]">{player.number}</p>
							<p>{player.name}</p>
						</div>
					))}
				</div>
			</div>
			<div className="grow">
				<h3 className="text-darkpurple text-xl font-semibold">Substitutes</h3>
				{substitutes.map((player) => (
					<div key={player.id} className="flex flex-row gap-4">
						<p className="w-[30px]">{player.number}</p>
						<p>{player.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default TeamLineup;
