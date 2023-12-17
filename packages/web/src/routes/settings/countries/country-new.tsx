import { ActionFunctionArgs, redirect } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { insertCountry } from "@/api";
import { CountryForm } from "./country-form";
import { flash } from "@/lib/flash";

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

      flash.set("success", "Country has been successfully created!");
      return redirect(`/settings/countries/${createResult.data.id}/edit`);
    }
  }
}

export default function SettingsCountryNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Create new Country</h3>
        <p className="text-sm text-muted-foreground">
          Add the details about the country
        </p>
      </div>
      <Separator />

      <CountryForm />
    </div>
  );
}
