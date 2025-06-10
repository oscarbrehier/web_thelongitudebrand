export function EmptyState({
	trans,
	ns = null,
	title,
	description,
	children
}) {

	let namespace;

	if (ns) namespace = { ns };

	return (

		<div className="flex-1 w-full flex flex-col items-center justify-center space-y-8">

			<p className="font-playfair text-5xl italic">{trans(title, namespace)}.</p>

			<div className="text-center">
				{
					Array.isArray(description) ? (

						description.map((line) => (

							trans(line, namespace).split('\n').map((line, i) => (
								<span key={i}>
									{line}
									<br />
								</span>
							))

						))

					) : (

						trans(description, namespace).split('\n').map((line, i) => (
							<span key={i}>
								{line}
								<br />
							</span>
						))

					)
				}
			</div>

			{children}

		</div>

	);

};