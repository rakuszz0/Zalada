export const StaffInventoryRules = {
    "ACCESS_VIEW_PRODUCT": 1020,
    "ACCESS_CREATE_PRODUCT": 1021,
    "ACCESS_EDIT_PRODUCT": 1022,
}

export const StaffTransactionRules = {
    "ACCESS_HANDLE_TRANSACTION": 2025,
}

export const StaffShippingRules = {
    "ACCESS_HANDLE_CONTROL": 3025,
}

export const StaffCustomerRules = {
    "ACCESS_VIEW_USER": 4020,
    "ACCESS_CREATE_USER": 4021,
    "ACCESS_EDIT_USER": 4022,
    "ACCESS_DELETE_USER": 4023
}


export const SuperAdminRules = {
    ...StaffInventoryRules,
    ...StaffInventoryRules,
    ...StaffTransactionRules,
    ...StaffShippingRules,
    ...StaffCustomerRules,
    "ACCESS_DELETE_PRODUCT": 1023,
}

export const ListRules = {
    ...SuperAdminRules,
}