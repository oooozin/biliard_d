import { paths } from "../../constants/paths";
import { PackageCreate } from "./entry/PackageCreate";
import { PackageUpdate } from "./entry/PackageUpdate";

import { PackageList } from "./list/PackageList";

export const packageRoutes = [
    {
        id: "package",
        path: paths.package,
        element: <PackageList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Package" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "packageCreate",
        path: paths.packageCreate,
        element: <PackageCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Package", url: paths.package },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "packageDetail",
        path: `/${paths.package}/:id`,
        element: <PackageUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Package", url: paths.package },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
