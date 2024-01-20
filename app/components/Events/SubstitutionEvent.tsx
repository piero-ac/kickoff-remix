const SubstitutionEvent = ({ event }: { event: MatchEvent }) => {
	return (
		<tr className="bg-green-100">
			<td>
				{event.time.elapsed}
				{event.time.extra && "+" + event.time.extra}'
			</td>
			<td>
				<img
					src="/img/substitution.svg"
					alt="Player Substitution Icon"
					className="w-[25px] inline"
				/>
				<img
					src={event.team.logo}
					alt={`${event.team.name} Logo`}
					className="w-[20px] inline"
				/>
			</td>
			<td className="bg-rose-100">{event.player.name}</td>
			<td className="bg-green-100">{event.assist.name}</td>
		</tr>
	);
};

export default SubstitutionEvent;
