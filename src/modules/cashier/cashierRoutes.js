import { paths } from "../../constants/paths";
import { CashierCreate } from "./entry/CashierCreate";
import { CashierUpdate } from "./entry/CashierUpdate";

import { CashierList } from "./list/CashierList";

export const cashierRoutes = [
    {
        id: "cashier",
        path: paths.cashier,
        element: <CashierList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Cashier" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "cashierCreate",
        path: paths.cashierCreate,
        element: <CashierCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Cashier", url: paths.cashier },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "cashierDetail",
        path: `/${paths.cashier}/:id`,
        element: <CashierUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Cashier", url: paths.cashier },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
