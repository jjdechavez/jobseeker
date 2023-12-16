import * as Form from "@radix-ui/react-form";
import {
  ActionFunctionArgs,
  Fetcher,
  Form as RRDForm,
  redirect,
} from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertCountry } from "@/api";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";

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

export default function SettingsCountriesPage() {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ] as Payment[];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Countries</h3>
        <p className="text-sm text-muted-foreground">
          List of countries with code and name.
        </p>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} />
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
