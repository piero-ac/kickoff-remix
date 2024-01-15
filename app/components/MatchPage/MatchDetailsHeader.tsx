export default function Header({
	time,
	venue,
	date,
	referee,
}: {
	time: string;
	venue: string;
	date: string;
	referee: string | null;
}) {
	return (
		<>
			<div className="flex flex-row items-center gap-1">
				<img
					src="/img/calendar-event-line.svg"
					alt="Calendar Icon"
					width="15px"
				/>
				{date}
			</div>
			<div className="flex flex-row items-center gap-1">
				<img src="/img/time-line.svg" alt="Clock Icon" width="15px" />
				{time}
			</div>
			<div className="flex flex-row items-center gap-1 truncate">
				<img
					src="/img/treasure-map-line.svg"
					alt="Venue Location Icon"
					width="15px"
				/>
				{venue}
			</div>
			{referee && (
				<div className="hidden lg:flex flex-row items-center gap-1">
					<img src="/img/user-2-line.svg" alt="Referee Icon" width="15px" />{" "}
					{referee.split(",")[0]} {/* In case of Name, Country */}
				</div>
			)}
		</>
	);
}
