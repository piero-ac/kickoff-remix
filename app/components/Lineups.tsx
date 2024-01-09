export default function Lineups({ lineups }: { lineups: Lineup[] }) {
	const [home, away] = lineups;

	return (
		<>
			<h2>Lineups</h2>
			<div className="flex flex-row gap-4">
				<section className="w-1/2 flex flex-col rounded border border-slate-800 p-1">
					<div className="w-[200px]">
						<h3 className="text-center text-darkpurple text-xl font-semibold">
							Goalkeeper
						</h3>
						{home.startXI
							.filter((player) => player.pos === "G")
							.map((player) => (
								<p
									className="border-b border-b-slate-500"
									key={player.id}
								>{`${player.number} ${player.name}`}</p>
							))}
					</div>
					<div>
						<h3>Defenders</h3>
						{home.startXI
							.filter((player) => player.pos === "D")
							.map((player) => (
								<p key={player.id}>{`${player.number} ${player.name}`}</p>
							))}
					</div>
					<div>
						<h3>Midfielders</h3>
						{home.startXI
							.filter((player) => player.pos === "M")
							.map((player) => (
								<p key={player.id}>{`${player.number} ${player.name}`}</p>
							))}
					</div>
					<div>
						<h3>Forwards</h3>
						{home.startXI
							.filter((player) => player.pos === "F")
							.map((player) => (
								<p key={player.id}>{`${player.number} ${player.name}`}</p>
							))}
					</div>
				</section>
				<section className="w-1/2">
					<h3>Goalkeeper</h3>
					{away.startXI
						.filter((player) => player.pos === "G")
						.map((player) => (
							<p key={player.id}>{`${player.number} ${player.name}`}</p>
						))}
					<h3>Defenders</h3>
					{away.startXI
						.filter((player) => player.pos === "D")
						.map((player) => (
							<p key={player.id}>{`${player.number} ${player.name}`}</p>
						))}
					<h3>Midfielders</h3>
					{away.startXI
						.filter((player) => player.pos === "M")
						.map((player) => (
							<p key={player.id}>{`${player.number} ${player.name}`}</p>
						))}
					<h3>Forwards</h3>
					{away.startXI
						.filter((player) => player.pos === "F")
						.map((player) => (
							<p key={player.id}>{`${player.number} ${player.name}`}</p>
						))}
				</section>
			</div>
		</>
	);
}
