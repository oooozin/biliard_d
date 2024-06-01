export const transferItemPayload = {
    update: {
        from_shop: "",
        to_shop: "",
        item_id: "",
        qty: "", 
    },
    store: {
        from_shop: "",
        to_shop: "",
        item_id: "",
        qty: "",
    },
    columnsName: 'transferItemColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "from_shop", label: "From Shop", minWidth: 100 },
        { id: "to_shop", label: "To Shop", minWidth: 100 },
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
        columns: "name",
        search: "",
        order: "id",
        sort: "ASC",
        value: "",
        start_date: "",
        end_date: "",
    },
};
