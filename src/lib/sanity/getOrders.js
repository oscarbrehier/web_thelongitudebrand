import { client } from "./client";

export async function getOrders(user_id) {

    const ORDERS_QUERY = `*[_type == 'order'] {
        user -> {
            email,
            firebaseId
        },
        products[] {
            quantity,
            size,
            unit_price,
            product -> {
              title,
              images
            }
        },
        total,
        _createdAt
    }`;

    const orders = await client.fetch(ORDERS_QUERY);
    return orders.filter((order) => order.user && order.user.firebaseId == user_id);

};