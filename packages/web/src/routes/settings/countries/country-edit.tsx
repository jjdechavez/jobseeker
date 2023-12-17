import {
  useLoaderData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
} from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Toasted } from "@/components/ui/taosted";
import { findCountryById, updateCountry } from "@/api";
import { flash } from "@/lib/flash";

import { CountryForm } from "./country-form";

export async function action({ request, params }: ActionFunctionArgs) {
  if (params.countryId) {
    switch (request.method) {
      case "PUT": {
        const formData = await request.formData();
        const values = {
          code: formData.get("code") as string,
          name: formData.get("name") as string,
        };

        return updateCountry(params.countryId, values)
          .then(() => {
            flash.set("success", "Country changes were successfully saved!");
            return redirect(`/settings/countries`);
          })
          .catch((error: unknown) => {
            if (error instanceof Error) {
              throw new Error(error.message);
            } else {
              throw new Error("unexpected exception");
            }
          });
      }
      default:
        return null;
    }
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const country = await findCountryById(params.countryId!);
  const message = flash.get("success");

  return {
    country,
    message,
  };
}

export default function SettingsCountryEditPage() {
  const { country, message } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  let toast = null;
  if (message) {
    toast = <Toasted description={message} />;
  }

  let views = <div>Loading...</div>;
  if (!country.success) {
    views = <div>{country.error.message}</div>;
  } else if (country.success) {
    views = (
      <CountryForm
        formMethod="PUT"
        code={country.data.data.code}
        name={country.data.data.name}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Edit Country</h3>
        <p className="text-sm text-muted-foreground">
          Update details about the country
        </p>
      </div>
      <Separator />

      {views}
      {toast}
    </div>
  );
}
