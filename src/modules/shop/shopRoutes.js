import { paths } from "../../constants/paths";
import { ShopCreate } from "./entry/ShopCreate";
import { ShopUpdate } from "./entry/ShopUpdate";

import { ShopList } from "./list/ShopList";

export const shopRoutes = [
    {
        id: "shop",
        path: paths.shop,
        element: <ShopList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Shop" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "shopCreate",
        path: paths.shopCreate,
        element: <ShopCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Shop", url: paths.shop },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "shopDetail",
        path: `/${paths.shop}/:id`,
        element: <ShopUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Shop", url: paths.shop },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
