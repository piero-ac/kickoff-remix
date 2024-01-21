import { NavLink } from "@remix-run/react";

const MatchDetailsNavigation = () => {
	return (
		<>
			<NavLink
				to="lineups"
				className={({ isActive, isPending }) =>
					isActive ? "font-semibold uppercase" : ""
				}
			>
				Lineups
			</NavLink>
			<NavLink
				to="events"
				className={({ isActive, isPending }) =>
					isActive ? "font-semibold uppercase" : ""
				}
			>
				Events
			</NavLink>
			<NavLink
				to="statistics"
				className={({ isActive, isPending }) =>
					isActive ? "font-semibold uppercase" : ""
				}
			>
				Stats
			</NavLink>
		</>
	);
};

export default MatchDetailsNavigation;
