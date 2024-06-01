import { paths } from "../../constants/paths";
import { MaterialCreate } from "./entry/MaterialCreate";
import { MaterialUpdate } from "./entry/MaterialUpdate";

import { MaterialList } from "./list/MaterialList";

export const materialRoutes = [
    {
        id: "material",
        path: paths.material,
        element: <MaterialList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Material" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "materialCreate",
        path: paths.materialCreate,
        element: <MaterialCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Material", url: paths.material },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "materialDetail",
        path: `/${paths.material}/:id`,
        element: <MaterialUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Material", url: paths.material },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
