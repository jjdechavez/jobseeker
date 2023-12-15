import { useJsonBody } from "sst/node/api";
import {
  insertCountry,
  insertCountrySchema,
} from "@jobseeker/core/entities/countries";
import { BadRequestResponse, withApiAuth } from "./api";

export const create = withApiAuth(async () => {
  const body = useJsonBody();
  if (!body) {
    throw new BadRequestResponse("Body missing");
  }

  const result = insertCountrySchema.safeParse(body);
  if (!result.success) {
    throw new BadRequestResponse(result.error.message);
  }

  const countryId = await insertCountry(result.data);

  return {
    statusCode: 201,
    body: JSON.stringify({ id: countryId }),
  };
});
