import { paths } from "../../constants/paths";
import { MaterialDataCreate } from "./entry/MaterialDataCreate";
import { MaterialDataUpdate } from "./entry/MaterialDataUpdate";

import { MaterialDataList } from "./list/MaterialDataList";

export const materialDataRoutes = [
    {
        id: "materialData",
        path: paths.materialData,
        element: <MaterialDataList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "MaterialData" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "materialDataCreate",
        path: paths.materialDataCreate,
        element: <MaterialDataCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "MaterialData", url: paths.materialData },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "materialDataDetail",
        path: `/${paths.materialData}/:id`,
        element: <MaterialDataUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "MaterialData", url: paths.materialData },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
