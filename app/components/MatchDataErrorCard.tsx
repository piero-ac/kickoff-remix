export default function ErrorCard({
	title,
	message,
}: {
	title: string;
	message: string | null;
}) {
	return (
		<div className="cyan-gradient text-brightwhite min-h-[150px] text-center flex flex-col items-center justify-center">
			<h2 className="text-2xl font-bold  uppercase w-full">{title}</h2>
			{message && <p>{message}</p>}
		</div>
	);
}
