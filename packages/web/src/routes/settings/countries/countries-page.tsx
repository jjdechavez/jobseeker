import * as Form from "@radix-ui/react-form";
import {
  ActionFunctionArgs,
  Fetcher,
  LoaderFunctionArgs,
  Form as RRDForm,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCountries, insertCountry } from "@/api";
import { DataTable } from "./data-table";
import { columns } from "./columns";

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

      return redirect(`settings/countries/${createResult.data}`);
    }
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const s = url.searchParams.get("s") ?? undefined;

  const countries = await getCountries(s);
  return countries;
}

export default function SettingsCountriesPage() {
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
      <div>
        <h3 className="text-lg font-medium">Countries</h3>
        <p className="text-sm text-muted-foreground">
          List of countries with code and name.
        </p>
      </div>
      <Separator />

      {views}
    </div>
  );
}

interface BaseFormProps {
  formMethod: Fetcher["formMethod"];
}

interface CountryFormProps extends BaseFormProps {
  code: string;
  name: string;
}

export function CountryForm({
  code,
  name,
  formMethod = "POST",
}: Partial<CountryFormProps>) {
  const actionLabel = ["POST", "post"].includes(formMethod)
    ? "Create Country"
    : "Save Country";

  return (
    <Form.Root className="space-y-8" asChild>
      <RRDForm method={formMethod}>
        <Form.Field className="space-y-2" name="code">
          <div className="flex justify-between items-center">
            <Form.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[invalid]:text-destructive">
              Code
            </Form.Label>
            <Form.Message
              className="text-sm font-medium text-destructive"
              match="valueMissing"
            >
              Please enter your code
            </Form.Message>
            <Form.Message
              className="text-sm font-medium text-destructive"
              match="tooLong"
            >
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <Input
              type="text"
              required
              maxLength={3}
              defaultValue={code ?? ""}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="space-y-2" name="name">
          <div className="flex justify-between items-center">
            <Form.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[invalid]:text-destructive">
              Name
            </Form.Label>
            <Form.Message
              className="text-sm font-medium text-destructive"
              match="valueMissing"
            >
              Please enter country name
            </Form.Message>
          </div>
          <Form.Control asChild>
            <Input type="text" required defaultValue={name ?? ""} />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <Button type="submit">{actionLabel}</Button>
        </Form.Submit>
      </RRDForm>
    </Form.Root>
  );
}
