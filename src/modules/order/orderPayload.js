export const orderPayload = {
    update: {
        id: "",
        invoice_number: "",
        table_number_id: "",
        shop_id: "",
        customer_id: "",
        checkin: "",
        checkout: "",
        table_charge: "",
        items_charge: "",
        total_time: "",
        charge: "",
        refund: "",
        payment_id: "",
        status: "",
        invoices: "",
    },
    store: {
        invoice_number: "",
        table_number_id: "",
        shop_id: "",
        customer_id: "",
        checkin: "",
        checkout: "",
        table_charge: "",
        items_charge: "",
        total_time: "",
        charge: "",
        refund: "",
        payment_id: "",
        status: "",
        invoices: "",
    },
    columnsName: 'orderColumns',
    columns: [
        { id: "invoice_number", label: "Invoice No", minWidth: 100 },
        { id: "shop_id", label: "Shop", minWidth: 100 },
        { id: "table_number_id", label: "Table", minWidth: 100 },
        { id: "customer_id", label: "Customer", minWidth: 100 },
        { id: "checkin", label: "Check In", minWidth: 180 },
        { id: "checkout", label: "Check Out", minWidth: 180 },
        { id: "table_charge", label: "Table Charge", minWidth: 100 },
        { id: "total_time", label: "Total Time", minWidth: 100 },
        { id: "charge", label: "Total Charge", minWidth: 100 },
        { id: "refund", label: "Refund", minWidth: 100 },
        { id: "payment_id", label: "Payment", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 100 },

        { id: "created_by", label: "Created By", minWidth: 100 },
        { id: "updated_by", label: "Updated By", minWidth: 100 },
        { id: "created_at", label: "Created At", minWidth: 100 },
        { id: "updated_at", label: "Updated At", minWidth: 100 },

        { id: "option", label: "Option", minWidth: 100 },
    ],
    paginateParams: {
        page: 1,
        per_page: 10,
        columns: "invoice_number,table_charge,total_time,charge,refund",
        search: "",
        order: "id",
        sort: "ASC",
        value: "",
        start_date: "",
        end_date: "",
        status: "SUCCESS"
    },
};
