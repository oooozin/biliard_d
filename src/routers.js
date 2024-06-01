import { createBrowserRouter, Navigate } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import NotFound from "./layouts/default/pages/NotFound";
import { BlankTemplate } from "./layouts/default/pages/BlankTemplate";
import { Login } from "./modules/auth/entry/Login";
import { dashboardRoutes } from "./modules/dashboard/dashboardRoute";
import { shopRoutes } from "./modules/shop/shopRoutes";
import { userRoutes } from "./modules/user/userRoutes";
import { categoryRoutes } from "./modules/category/categoryRoutes";
import { itemRoutes } from "./modules/item/itemRoutes";
import { itemDataRoutes } from "./modules/itemdata/itemDataRoutes";
import { materialRoutes } from "./modules/material/materialRoutes";
import { materialDataRoutes } from "./modules/materialdata/materialDataRoutes";
import { transferItemRoutes } from "./modules/transferitem/transferItemRoutes";
import { transferMaterialRoutes } from "./modules/transfermaterial/transferMaterialRoutes";
import { customerRoutes } from "./modules/customer/customerRoutes";
import { cashierRoutes } from "./modules/cashier/cashierRoutes";
import { tableRoutes } from "./modules/table/tableRoutes";
import { counterRoutes } from "./modules/counter/counterRoute";
import { adminRoutes } from "./modules/admin/adminRoutes";
import { packageRoutes } from "./modules/package/packageRoutes";
import { billRoutes } from "./modules/bill/billRoutes";
import { paymentRoutes } from "./modules/payment/paymentRoutes";
import { roleRoutes } from "./modules/role/roleRoutes";
import { orderRoutes } from "./modules/order/orderRoutes";


export const routers = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            ...dashboardRoutes,
            ...counterRoutes,
            ...shopRoutes,
            ...userRoutes,
            ...categoryRoutes,
            ...itemRoutes,
            ...itemDataRoutes,
            ...materialRoutes,
            ...materialDataRoutes,
            ...transferItemRoutes,
            ...transferMaterialRoutes,
            ...customerRoutes,
            ...cashierRoutes,
            ...tableRoutes,
            ...adminRoutes,
            ...packageRoutes,
            ...billRoutes,
            ...paymentRoutes,
            ...roleRoutes,
            ...orderRoutes
        ],
    },
    {
        path: "auth",
        element: <BlankTemplate />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);