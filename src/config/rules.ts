export const StaffInventoryRules = {
    "ACCESS_VIEW_PRODUCT": 1020,
    "ACCESS_ADD_PRODUCT": 1021,
    "ACCESS_EDIT_PRODUCT": 1022,
}

export const StaffTransactionRules = {
    "ACCESS_HANDLE_TRANSACTION": 2025,
}

export const StaffShippingRules = {
    "ACCESS_SHIPPING_CONTROL": 3025,
}

export const CustomerRules = {
    "ACCESS_CREATE_TRANSACTION": 2022,
    "ACCESS_CREATE_CARTS": 5022
}


export const SuperAdminRules = {
    ...StaffInventoryRules,
    ...StaffInventoryRules,
    ...StaffTransactionRules,
    ...StaffShippingRules,
    "ACCESS_DELETE_PRODDUCT": 1023,
    "ACCESS_UPDATE_PRODUCT": 1024,
    "ACCESS_CREATE_USER": 4021,
    "ACCESS_VIEW_USER": 6020
}

export const ListRules = {
    ...SuperAdminRules,
    ...CustomerRules
}