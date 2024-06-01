import { paths } from "../../constants/paths";
import { BillCreate } from "./entry/BillCreate";
import { BillUpdate } from "./entry/BillUpdate";

import { BillList } from "./list/BillList";

export const billRoutes = [
    {
        id: "bill",
        path: paths.bill,
        element: <BillList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Bill" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "billCreate",
        path: paths.billCreate,
        element: <BillCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Bill", url: paths.bill },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "billDetail",
        path: `/${paths.bill}/:id`,
        element: <BillUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Bill", url: paths.bill },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
