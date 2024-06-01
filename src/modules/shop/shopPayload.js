export const shopPayload = {
    update: {
        name: "", 
        open_time: "", 
        close_time: "", 
        address: "", 
        phone: "", 
        is_warehouse: "0"
    },
    store: {
        name: "", 
        open_time: "", 
        close_time: "", 
        address: "", 
        phone: "", 
        is_warehouse: "0"
    },
    columnsName: 'shopColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "name", label: "Name", minWidth: 100 },
        { id: "phone", label: "Phone", minWidth: 100 },
        { id: "address", label: "Address", minWidth: 150 },
        { id: "open_time", label: "Open Time", minWidth: 100 },
        { id: "close_time", label: "Close Time", minWidth: 100 },

        { id: "created_by", label: "Created By", minWidth: 100 },
        { id: "updated_by", label: "Updated By", minWidth: 100 },
        { id: "created_at", label: "Created At", minWidth: 100 },
        { id: "updated_at", label: "Updated At", minWidth: 100 },

        { id: "option", label: "Option", minWidth: 100 },
    ],
    paginateParams: {
        page: 1,
        per_page: 10,
        columns: "name,phone,address",
        search: "",
        order: "id",
        sort: "ASC",
        value: "",
        start_date: "",
        end_date: "",
    },
};
