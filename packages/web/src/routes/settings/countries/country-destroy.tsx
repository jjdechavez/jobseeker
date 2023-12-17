import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteCountry } from "@/api";

export async function action({ params }: ActionFunctionArgs) {
  await deleteCountry(params.countryId!);
  return redirect("/settings/countries");
}
