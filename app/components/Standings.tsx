export default function Standings({
	standings,
}: {
	standings: TeamStanding[];
}) {
	return (
		<table className="w-[300px] md:w-[400px] rounded-b-lg text-darkpurple">
			<thead className="bg-brightwhite  text-sm border-b border-b-cyan">
				<th>Pos</th>
				<th>Team</th>
				<th>P</th>
				<th className="hidden md:table-cell">W</th>
				<th className="hidden md:table-cell">D</th>
				<th className="hidden md:table-cell">L</th>
				<th>GD</th>
				<th>Pts</th>
			</thead>
			<tbody>
				{standings.length > 0 ? (
					standings.map((team, index) => (
						<tr key={team.rank} className="text-center bg-brightwhite">
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
