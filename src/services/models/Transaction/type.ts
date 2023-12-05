import { User } from "@entities";

export type GetUserResponse = Pick<User, "id" | "address" | "email" | "phone_number" | "username" | "registered_date">