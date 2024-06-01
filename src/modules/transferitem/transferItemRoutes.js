import { paths } from "../../constants/paths";
import { TransferItemCreate } from "./entry/TransferItemCreate";
import { TransferItemUpdate } from "./entry/TransferItemUpdate";

import { TransferItemList } from "./list/TransferItemList";

export const transferItemRoutes = [
    {
        id: "transferItem",
        path: paths.transferItem,
        element: <TransferItemList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "TransferItem" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "transferItemCreate",
        path: paths.transferItemCreate,
        element: <TransferItemCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "TransferItem", url: paths.transferItem },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "transferItemDetail",
        path: `/${paths.transferItem}/:id`,
        element: <TransferItemUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "TransferItem", url: paths.transferItem },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
