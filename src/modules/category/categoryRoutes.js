import { paths } from "../../constants/paths";
import { CategoryCreate } from "./entry/CategoryCreate";
import { CategoryUpdate } from "./entry/CategoryUpdate";

import { CategoryList } from "./list/CategoryList";

export const categoryRoutes = [
    {
        id: "category",
        path: paths.category,
        element: <CategoryList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Category" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "categoryCreate",
        path: paths.categoryCreate,
        element: <CategoryCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Category", url: paths.category },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "categoryDetail",
        path: `/${paths.category}/:id`,
        element: <CategoryUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Category", url: paths.category },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
