export default function StandingsError({
	title,
	message,
}: {
	title: string;
	message: string;
}) {
	return (
		<div>
			<h2 className="cyan-gradient text-brightwhite font-bold text-center text-2xl md:text-3xl py-1 rounded-t-lg w-[300px] md:w-[385px]">
				League Standings
			</h2>
			<div className="w-[300px] md:w-[385px] rounded-b-lg text-darkpurple">
				<div className="min-h-[300px] text-2xl text-center bg-brightwhite hover:bg-hotpink hover:text-brightwhite flex flex-col items-center justify-center">
					<p className="font-semibold text-4xl bg-brightwhite">{title}</p>
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
}
