import { configureStore } from "@reduxjs/toolkit";
import countSlice from "./shares/countSlice";
import shareSlice from "./shares/shareSlice";
import dashboardSlice from "./modules/dashboard/dashboardSlice";
import shopSlice from "./modules/shop/shopSlice";
import userSlice from "./modules/user/userSlice";
import categorySlice from "./modules/category/categorySlice";
import itemSlice from "./modules/item/itemSlice";
import itemDataSlice from "./modules/itemdata/itemDataSlice";
import materialSlice from "./modules/material/materialSlice";
import materialDataSlice from "./modules/materialdata/materialDataSlice";
import transferItemSlice from "./modules/transferitem/transferItemSlice";
import transferMaterialSlice from "./modules/transfermaterial/transferMaterialSlice";
import customerSlice from "./modules/customer/customerSlice";
import cashierSlice from "./modules/cashier/cashierSlice";
import tableSlice from "./modules/table/tableSlice";
import counterSlice from "./modules/counter/counterSlice";
import packageSlice from "./modules/package/packageSlice";
import billSlice from "./modules/bill/billSlice";
import paymentSlice from "./modules/payment/paymentSlice";
import roleSlice from "./modules/role/roleSlice";
import orderSlice from "./modules/order/orderSlice";

export const stores = configureStore({
    reducer: {
        share: shareSlice,
        count: countSlice,
        shop: shopSlice,
        user: userSlice,
        item: itemSlice,
        itemData: itemDataSlice,
        category: categorySlice,
        material: materialSlice,
        materialData: materialDataSlice,
        dashboard: dashboardSlice,
        transferItem: transferItemSlice,
        transferMaterial: transferMaterialSlice,
        customer: customerSlice,
        cashier: cashierSlice,
        table: tableSlice,
        counter: counterSlice,
        package: packageSlice,
        bill: billSlice,
        payment: paymentSlice,
        role: roleSlice,
        order: orderSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
