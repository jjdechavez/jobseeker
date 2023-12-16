import {
  useLoaderData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
} from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { CountryForm } from "./countries";
import { findCountryById, updateCountry } from "@/api";

export async function action({ request, params }: ActionFunctionArgs) {
  if (params.countryId) {
    switch (request.method) {
      case "PUT":
        const formData = await request.formData();
        const values = {
          code: formData.get("code") as string,
          name: formData.get("name") as string,
        };
        await updateCountry(params.countryId, values);
        return redirect(`settings/countries`);
      default:
        break;
    }
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const country = await findCountryById(params.countryId!);
  return country;
}

export default function SettingsCountryEditPage() {
  const country = useLoaderData() as Awaited<ReturnType<typeof loader>>;

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
    </div>
  );
}
