import { Link } from "@remix-run/react";

const Leagues = [
	{ id: 39, name: "Premier League", nameShort: "🇬🇧 PL" },
	{ id: 140, name: "La Liga", nameShort: "🇪🇸 LL" },
	{ id: 78, name: "Bundesliga", nameShort: "🇩🇪 BDL" },
];

export default function Navbar() {
	return (
		<nav className="bg-stone-900 p-4 ">
			<div className="mx-0 md:mx-[3rem]">
				<div className="mx-auto  flex flex-col md:flex-row justify-between items-center">
					<h1>
						<Link
							to="/"
							className="text-lime-500 
          text-2xl md:text-3xl font-bold"
						>
							Kick⚽ff
						</Link>
					</h1>
					<div className="flex flex-row justify-center gap-4 text-lime-500 ">
						{Leagues.map((league) => (
							<Link
								key={league.id}
								to={`/${league.id}`}
								className=" text-xl md:text-2xl font-bold"
								aria-label={league.name}
							>
								<span className="hidden md:block">{league.name}</span>
								<span className="md:hidden">{league.nameShort}</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
}
