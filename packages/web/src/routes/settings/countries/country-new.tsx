import { ActionFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { insertCountry } from "@/api";
import { loader } from "./country-edit";
import { CountryForm } from "./country-form";

export async function action({ request }: ActionFunctionArgs) {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const values = {
        code: formData.get("code") as string,
        name: formData.get("name") as string,
      };
      const createResult = await insertCountry(values);
      if (!createResult.success) {
        throw new Error(createResult.error.message);
      }

      return redirect(`/settings/countries/${createResult.data.id}/edit`);
    }
  }
}

export default function SettingsCountryNewPage() {
  const country = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  let views = <div>Loading...</div>;
  if (!country.success) {
    views = <div>{country.error.message}</div>;
  } else if (country.success) {
    views = (
      <CountryForm
        code={country.data.data.code}
        name={country.data.data.name}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Create new Country</h3>
        <p className="text-sm text-muted-foreground">
          Add the details about the country
        </p>
      </div>
      <Separator />

      {views}
    </div>
  );
}
