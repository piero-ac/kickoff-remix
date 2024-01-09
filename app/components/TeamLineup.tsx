export default function TeamLineup({
	startXI,
	substitutes,
}: {
	startXI: PlayerLineupInfo[];
	substitutes: PlayerLineupInfo[];
}) {
	return (
		<div className="flex flex-row gap-1">
			<div className="w-[300px]">
				<div className="border-b border-b-darkpurple">
					<h3 className="text-darkpurple text-xl font-semibold">Goalkeeper</h3>
					{startXI
						.filter((player) => player.pos === "G")
						.map((player) => (
							<p key={player.id}>{`${player.number} ${player.name}`}</p>
						))}
				</div>
				<div>
					<h3>Defenders</h3>
					{startXI
						.filter((player) => player.pos === "D")
						.map((player) => (
							<p key={player.id}>{`${player.number} ${player.name}`}</p>
						))}
				</div>
				<div>
					<h3>Midfielders</h3>
					{startXI
						.filter((player) => player.pos === "M")
						.map((player) => (
							<p key={player.id}>{`${player.number} ${player.name}`}</p>
						))}
				</div>
				<div>
					<h3>Forwards</h3>
					{startXI
						.filter((player) => player.pos === "F")
						.map((player) => (
							<p key={player.id}>{`${player.number} ${player.name}`}</p>
						))}
				</div>
			</div>
			<div className="grow">player picture</div>
		</div>
	);
}
