export const itemDataPayload = {
    update: {
        item_id: "",
        shop_id: "",
        qty: "", 
    },
    store: {
        item_id: "",
        shop_id: "",
        qty: "", 
    },
    columnsName: 'itemDataColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "shop_id", label: "Shop", minWidth: 100 },
        { id: "item_id", label: "Item", minWidth: 100 },
        { id: "qty", label: "Qty", minWidth: 100 },

        { id: "created_by", label: "Created By", minWidth: 100 },
        { id: "updated_by", label: "Updated By", minWidth: 100 },
        { id: "created_at", label: "Created At", minWidth: 100 },
        { id: "updated_at", label: "Updated At", minWidth: 100 },

        { id: "option", label: "Option", minWidth: 100 },
    ],
    paginateParams: {
        page: 1,
        per_page: 10,
        columns: "qty",
        search: "",
        order: "id",
        sort: "ASC",
        value: "",
        start_date: "",
        end_date: "",
    },
};
