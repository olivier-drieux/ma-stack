"use server";

import {
	createSafeActionClient,
	flattenValidationErrors,
} from "next-safe-action";
import { zodAdapter } from "next-safe-action/adapters/zod";
import type { ZodSchema } from "zod";

const clientAction = (schema: ZodSchema) =>
	createSafeActionClient({
		validationAdapter: zodAdapter(),
	}).schema(schema, {
		handleValidationErrorsShape: (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	});

export default clientAction;
