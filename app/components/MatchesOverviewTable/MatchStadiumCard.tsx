export default function MatchStadiumCard({ name }: { name: string }) {
	return (
		<div className="md:w-[130px] text-sm justify-between font-semibold flex items-center gap-1">
			{name}
			<img src="/img/next.png" alt="Arrow Icon" height="10px" width="10px" />
		</div>
	);
}
