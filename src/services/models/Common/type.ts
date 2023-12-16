import * as z from "zod"
import { paginationRequest } from "./schema"

export type PaginationRequest = z.infer<typeof paginationRequest>