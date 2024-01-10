import { useState } from "react";
import TeamLineup from "./TeamLineup";
export default function Lineups({ lineups }: { lineups: Lineup[] }) {
	const [displayedLineup, setDisplayedLineup] = useState<"home" | "away">(
		"home"
	);
	const [home, away] = lineups;
	const homeName =
		home.name[0] + home.name[1] + home.name[home.name.length - 1];
	const awayName =
		away.name[0] + away.name[1] + away.name[away.name.length - 1];

	return (
		<>
			<div className="flex flex-row justify-center text-xl ">
				<button
					onClick={() => setDisplayedLineup("home")}
					disabled={displayedLineup === "home"}
					className={`w-[100px] p-1 rounded-s-md font-bold bg-cyan text-darkpurple ${
						displayedLineup === "home" && "underline"
					}`}
				>
					{homeName.toUpperCase()}
				</button>
				<button
					onClick={() => setDisplayedLineup("away")}
					disabled={displayedLineup === "away"}
					className={`w-[100px] p-1 rounded-e-md font-bold bg-hotpink text-darkpurple ${
						displayedLineup === "away" && "underline"
					}`}
				>
					{awayName.toUpperCase()}
				</button>
			</div>
			<section className="mt-1 px-5">
				{displayedLineup === "home" ? (
					<TeamLineup startXI={home.startXI} substitutes={home.substitutes} />
				) : (
					<TeamLineup startXI={away.startXI} substitutes={away.substitutes} />
				)}
			</section>
		</>
	);
}
