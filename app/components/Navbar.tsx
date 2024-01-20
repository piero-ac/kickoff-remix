import { Link } from "@remix-run/react";

const Navbar = () => {
	return (
		<nav className="bg-darkpurple p-2">
			<div className="mx-auto max-w-5xl">
				<div className="flex flex-col sm:flex-row justify-between items-center">
					<h1>
						<Link
							to="/"
							className="text-brightwhite
          text-2xl md:text-3xl font-bold hover:text-hotpink"
						>
							Kick⚽ff <span className="text-sm">EPL</span>
						</Link>
					</h1>
					<div className="flex flex-row justify-center gap-4 text-lime-500 ">
						<Link
							to={`/matches`}
							className="text-brightwhite text-xl md:text-2xl font-bold hover:text-hotpink"
							aria-label="matches"
						>
							Matches
						</Link>
						<Link
							to={`/teams`}
							className="text-brightwhite text-xl md:text-2xl font-bold hover:text-hotpink"
							aria-label="teams"
						>
							Teams
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
