import TableRow from "./table-row";

export function OrdersTable({ orders, trans }) {

	const columns = [
		"order_id",
		"order_date",
		"total_amount",
		"status"
	];

	return (

		<div className={`w-full h-auto`}>

			<section className="mt-16 space-y-4">

				<h1 className="capitalize-first mx-2 my-1 text-lg">{trans("orders_title")}</h1>

				<div className="flex flex-col space-y-2">

					<div className="md:grid hidden grid-cols-4 gap-2 children:text-xs children:px-2">

						{columns.map((col) => (
							<p>
								{trans(col)}
							</p>
						))}

					</div>

					{
						orders.map((order, index) => (
							<TableRow key={index} id={order.id} order={order.data()} />
						))
					}

				</div>

			</section>

		</div >

	);

};