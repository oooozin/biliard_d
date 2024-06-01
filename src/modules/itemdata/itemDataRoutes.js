import { paths } from "../../constants/paths";
import { ItemDataCreate } from "./entry/ItemDataCreate";
import { ItemDataUpdate } from "./entry/ItemDataUpdate";

import { ItemDataList } from "./list/ItemDataList";

export const itemDataRoutes = [
    {
        id: "itemData",
        path: paths.itemData,
        element: <ItemDataList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "ItemData" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "itemDataCreate",
        path: paths.itemDataCreate,
        element: <ItemDataCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "ItemData", url: paths.itemData },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "itemDataDetail",
        path: `/${paths.itemData}/:id`,
        element: <ItemDataUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "ItemData", url: paths.itemData },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
