export type ObjectValues<T> = T[keyof T];
// example of use ObjectValues
//const USER_EVENT = {
//   pageview: 'Visit',
//   order: 'Order'
// } as const
// type UserEventName = typeof USER_EVENT[keyof typeof USER_EVENT]  -> // "Visit" | "Order"
