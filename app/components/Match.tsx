import { convertDateToLocalTime } from "utils/datetime-functions";
// import PremierLeagueLogo from "~/img/premierleague-logo.png";

export default function Match({ match, src }: { match: Match; src: string }) {
	const { time } = convertDateToLocalTime(match.fixture.date);

	return (
		<div className="border border-black flex flex-row gap-1 md:gap-2 items-center p-1 text-xs md:text-lg ">
			<p className="rounded-full shadow-lg bg-lime-300 border-slate-500 p-1 w-[80px] md:w-[100px]">
				{time}
			</p>
			<p className="truncate">
				<img src={src} alt="" height="20px" width="20px" className="inline" />{" "}
				{match.teams.home.name} vs {match.teams.away.name}
			</p>
		</div>
	);
}
