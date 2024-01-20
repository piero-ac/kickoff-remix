const VarEvent = ({ event }: { event: MatchEvent }) => {
	return (
		<tr>
			<td>
				{event.time.elapsed}
				{event.time.extra && "+" + event.time.extra}'
			</td>
			<td>
				<img
					src="/img/var.svg"
					alt="Var System Icon"
					className="w-[25px] inline"
				/>
			</td>
			<td>
				<img
					src={event.team.logo}
					alt={`${event.team.name} Logo`}
					className="w-[15px] inline"
				/>{" "}
				{event.player.name}
			</td>
			<td>{event.comments}</td>
		</tr>
	);
};

export default VarEvent;
