import { convertDateToLocalTime } from "utils/datetime-functions";

// Will display Time (Not Started), or Score (Ongoing or Ended)

export default function MatchStatusCard({ fixture }: { fixture: Fixture }) {
	const { time } = convertDateToLocalTime(fixture.date);
	return (
		<p className="mx-1 px-1 border border-slate-500 min-w-[50px] text-center rounded">
			{time.split(" ")[0]}
		</p>
	);
}
