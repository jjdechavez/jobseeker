import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getCountries } from "@/api";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const s = url.searchParams.get("s") ?? undefined;

  const countries = await getCountries(s);
  return countries;
}

export default function SettingsCountriesPage() {
  const navigate = useNavigate();
  const countries = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  let views = <div>Loading...</div>;
  if (!countries.success) {
    views = (
      <div>
        After fetching countries, parse has been failed:{" "}
        {countries.error.message}
      </div>
    );
  } else if (countries.success) {
    views = <DataTable columns={columns} data={countries.data.data} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Countries</h3>
          <p className="text-sm text-muted-foreground">
            List of countries with code and name.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => navigate("/settings/countries/new")}
        >
          Add Country
        </Button>
      </div>
      <Separator />

      {views}
    </div>
  );
}
