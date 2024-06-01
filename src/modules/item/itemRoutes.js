import { paths } from "../../constants/paths";
import { ItemCreate } from "./entry/ItemCreate";
import { ItemUpdate } from "./entry/ItemUpdate";

import { ItemList } from "./list/ItemList";

export const itemRoutes = [
    {
        id: "item",
        path: paths.item,
        element: <ItemList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Item" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "itemCreate",
        path: paths.itemCreate,
        element: <ItemCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Item", url: paths.item },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "itemDetail",
        path: `/${paths.item}/:id`,
        element: <ItemUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Item", url: paths.item },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
