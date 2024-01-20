const GoalEvent = ({ event }: { event: MatchEvent }) => {
	return (
		<tr className="bg-blue-100">
			<td>
				{event.time.elapsed}
				{event.time.extra && "+" + event.time.extra}'
			</td>
			<td>
				<img
					src="/img/soccer-ball.svg"
					alt="Soccer Ball Icon"
					className="w-[15px] inline"
				/>
				<img
					src={event.team.logo}
					alt={`${event.team.name} Logo`}
					className="w-[20px] inline"
				/>
			</td>
			<td>{event.player.name}</td>
			<td>{event.assist.name}</td>
		</tr>
	);
};

export default GoalEvent;
