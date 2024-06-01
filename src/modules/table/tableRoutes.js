import { paths } from "../../constants/paths";
import { TableCreate } from "./entry/TableCreate";
import { TableUpdate } from "./entry/TableUpdate";

import { TableList } from "./list/TableList";

export const tableRoutes = [
    {
        id: "table",
        path: paths.table,
        element: <TableList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Table" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "tableCreate",
        path: paths.tableCreate,
        element: <TableCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Table", url: paths.table },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "tableDetail",
        path: `/${paths.table}/:id`,
        element: <TableUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Table", url: paths.table },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
