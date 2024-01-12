export default function CardEvent({ event }: { event: MatchEvent }) {
	const rowColor =
		event.detail === "Yellow Card" ? "bg-amber-100" : "bg-red-100";
	return (
		<tr className={rowColor}>
			<td>
				{event.time.elapsed}
				{event.time.extra && "+" + event.time.extra}'
			</td>
			<td>
				{event.detail === "Yellow Card" ? (
					<img
						src="/img/yellow-card.svg"
						alt="Yellow Card Icon"
						className="w-[15px] inline"
					/>
				) : (
					<img src="/img/red-card.svg" alt="Red Card Icon" />
				)}{" "}
				<img
					src={event.team.logo}
					alt={`${event.team.name} Logo`}
					className="w-[20px] inline"
				/>
			</td>
			<td>{event.player.name}</td>
			<td>{event.comments}</td>
		</tr>
	);
}
