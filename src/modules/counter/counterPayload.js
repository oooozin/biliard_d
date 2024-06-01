export const counterPayload = {
    checkin: {        
        table_number_id: "",
        status: "PENDING",
        shop_id: "",
    },
    createorder: {
        items: ""
    },
    store: {
        name: "",
        description: "",
        shop_id: "",
        cashier_id: "",
        status: "", 
    },
    columnsName: 'counterColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "name", label: "Name", minWidth: 100 },
        { id: "description", label: "Description", minWidth: 100 },
        { id: "shop_id", label: "Shop", minWidth: 100 },
        { id: "cashier_id", label: "Cashier", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 100 },
    ],
    paginateParams: {
        filter: "shop_id",
        value: ""
    },
    categoryParams: {
        shop_id : 0
    }
};
