export default function Standings({ standings }: { standings: Standings[] }) {
	return (
		<table className="bg-lime-600 w-full text-black">
			<thead className="bg-lime-700">
				<th>#</th>
				<th className="w-[120px]">Team</th>
				<th>P</th>
				<th>W</th>
				<th>D</th>
				<th>L</th>
				<th className="hidden md:table-cell">F</th>
				<th className="hidden md:table-cell">A</th>
				<th className="hidden md:table-cell">GD</th>
				<th>Pts</th>
			</thead>
			<tbody>
				{standings.map((team, index) => (
					<tr
						key={team.rank}
						className={`text-center ${index % 2 === 0 ? "" : "bg-lime-200"}`}
					>
						<td>{team.rank}</td>
						<td className="flex flex-row w-[120px]">
							{team.team.logo && (
								<img
									src={team.team.logo}
									alt={`Logo of ${team.team.name}`}
									height="20px"
									width="20px"
									className="ml-3 mr-3"
								/>
							)}
							{team.team.name}
						</td>
						<td>{team.all.played || 0}</td>
						<td>{team.all.win || 0}</td>
						<td>{team.all.draw || 0}</td>
						<td>{team.all.lose || 0}</td>
						<td className="hidden md:table-cell">{team.all.goals.for || 0}</td>
						<td className="hidden md:table-cell">
							{team.all.goals.against || 0}
						</td>
						<td className="hidden md:table-cell">{team.goalsDiff || 0}</td>
						<td>{team.points || 0}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
