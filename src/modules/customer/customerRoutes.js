import { paths } from "../../constants/paths";
import { CustomerCreate } from "./entry/CustomerCreate";
import { CustomerUpdate } from "./entry/CustomerUpdate";

import { CustomerList } from "./list/CustomerList";

export const customerRoutes = [
    {
        id: "customer",
        path: paths.customer,
        element: <CustomerList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Customer" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "customerCreate",
        path: paths.customerCreate,
        element: <CustomerCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Customer", url: paths.customer },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "customerDetail",
        path: `/${paths.customer}/:id`,
        element: <CustomerUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Customer", url: paths.customer },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
