import { paths } from "../../constants/paths";
import { OrderCreate } from "./entry/OrderCreate";
import { OrderUpdate } from "./entry/OrderUpdate";

import { OrderList } from "./list/OrderList";

export const orderRoutes = [
    {
        id: "order",
        path: paths.order,
        element: <OrderList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Order" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "orderCreate",
        path: paths.orderCreate,
        element: <OrderCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Order", url: paths.order },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "orderDetail",
        path: `/${paths.order}/:id`,
        element: <OrderUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Order", url: paths.order },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
