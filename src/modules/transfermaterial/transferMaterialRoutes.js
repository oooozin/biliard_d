import { paths } from "../../constants/paths";
import { TransferMaterialCreate } from "./entry/TransferMaterialCreate";
import { TransferMaterialUpdate } from "./entry/TransferMaterialUpdate";

import { TransferMaterialList } from "./list/TransferMaterialList";

export const transferMaterialRoutes = [
    {
        id: "transferMaterial",
        path: paths.transferMaterial,
        element: <TransferMaterialList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "TransferMaterial" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "transferMaterialCreate",
        path: paths.transferMaterialCreate,
        element: <TransferMaterialCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "TransferMaterial", url: paths.transferMaterial },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "transferMaterialDetail",
        path: `/${paths.transferMaterial}/:id`,
        element: <TransferMaterialUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "TransferMaterial", url: paths.transferMaterial },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
