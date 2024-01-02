export default function Standings({
	standings,
}: {
	standings: TeamStanding[];
}) {
	return (
		<table className="bg-lime-600 w-full text-black">
			<thead className="bg-lime-700">
				<th>#</th>
				<th className="w-[120px]">Team</th>
				<th>P</th>
				<th className="hidden md:table-cell">W</th>
				<th className="hidden md:table-cell">D</th>
				<th className="hidden md:table-cell">L</th>
				<th className="hidden md:table-cell">F</th>
				<th className="hidden md:table-cell">A</th>
				<th>GD</th>
				<th>Pts</th>
			</thead>
			<tbody>
				{standings.length > 0 ? (
					standings.map((team, index) => (
						<tr
							key={team.rank}
							className={`text-center ${index % 2 === 0 ? "" : "bg-lime-200"}`}
						>
							<td>{team.rank}</td>
							<td className="flex flex-row w-[170px] text-sm">
								<img
									src={team.team.logo || "https://placehold.co/20x20"}
									alt={`Logo of ${team.team.name}`}
									width="20px"
									className="ml-3 mr-3 object-cover"
								/>
								{team.team.name}
							</td>
							<td>{team.all.played || 0}</td>
							<td className="hidden md:table-cell">{team.all.win || 0}</td>
							<td className="hidden md:table-cell">{team.all.draw || 0}</td>
							<td className="hidden md:table-cell">{team.all.lose || 0}</td>
							<td className="hidden md:table-cell">
								{team.all.goals.for || 0}
							</td>
							<td className="hidden md:table-cell">
								{team.all.goals.against || 0}
							</td>
							<td>{team.goalsDiff || 0}</td>
							<td>{team.points || 0}</td>
						</tr>
					))
				) : (
					<tr>No standings available.</tr>
				)}
			</tbody>
		</table>
	);
}
