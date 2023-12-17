import { useJsonBody, usePathParam, useQueryParam } from "sst/node/api";
import {
  deleteCountry,
  findCountries,
  findCountryById,
  insertCountry,
  insertCountrySchema,
  updateCountry,
} from "@jobseeker/core/entities/countries";
import { BadRequestResponse, NotFoundResponse, withApiAuth } from "./api";

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

export const findById = withApiAuth(async () => {
  const countryId = usePathParam("id");
  if (!countryId) {
    throw new BadRequestResponse("Missing countryId");
  }

  const country = await findCountryById(countryId);
  if (!country) {
    throw new NotFoundResponse(`Country not found with an id of ${countryId}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ data: country }),
  };
});

export const update = withApiAuth(async () => {
  const countryId = usePathParam("id");
  if (!countryId) {
    throw new BadRequestResponse("Missing countryId");
  }

  const body = useJsonBody();
  if (!body) {
    throw new BadRequestResponse("Missing body");
  }

  await updateCountry(countryId, body);

  return {
    statusCode: 204,
  };
});

export const getAll = withApiAuth(async () => {
  const query = useQueryParam("s");

  const countries = await findCountries({ s: query });

  return {
    statusCode: 200,
    body: JSON.stringify({ data: countries }),
  };
});

export const destroy = withApiAuth(async () => {
  const countryId = usePathParam("id");
  if (!countryId) {
    throw new BadRequestResponse("Missing countryId");
  }

  await deleteCountry(countryId);

  return {
    statusCode: 200,
  };
});
