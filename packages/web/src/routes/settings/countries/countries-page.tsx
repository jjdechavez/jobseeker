import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Toasted } from "@/components/ui/taosted";
import { flash } from "@/lib/flash";
import { getCountries } from "@/api";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const s = url.searchParams.get("s") ?? undefined;

  const countries = await getCountries(s);
  const message = flash.get("success");
  return { countries, message };
}

export default function SettingsCountriesPage() {
  const navigate = useNavigate();
  const { countries, message } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  let toast = null
  if (message) {
    toast = <Toasted description={message} />
  }

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
      {toast}
    </div>
  );
}
