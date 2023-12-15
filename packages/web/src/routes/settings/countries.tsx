import * as Form from "@radix-ui/react-form";
import { ActionFunctionArgs, Form as RRDForm } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

// import { insertCountrySchema } from "../../../../packages/core/src/entities/countries";
import { Button } from "@/components/ui/button";
import { insertCountry } from "@/api";

export async function action({ request }: ActionFunctionArgs) {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const values = {
        code: formData.get("code") as string,
        name: formData.get("name") as string,
      };
      const res = await insertCountry(values)
      console.log(res)

      // return insertCountry(values);
      return true;
    }
  }
}

export default function SettingsCountriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />

      <Form.Root className="space-y-8" asChild>
        <RRDForm method="POST">
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
              <Input type="text" required maxLength={3} />
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
              <Input type="text" required />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <Button type="submit">Create country</Button>
          </Form.Submit>
        </RRDForm>
      </Form.Root>
    </div>
  );
}
