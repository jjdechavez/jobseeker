import * as Form from "@radix-ui/react-form";
import { Fetcher, Form as RRDForm, useNavigate } from "react-router-dom";
import { RadixInput } from "@/components/radix-form-input";
import { Button } from "@/components/ui/button";

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
    ? "Save country"
    : "Save changes";
  const navigate = useNavigate();

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
            <RadixInput
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
            <RadixInput type="text" required defaultValue={name ?? ""} />
          </Form.Control>
        </Form.Field>

        <div className="inline-flex gap-x-4">
          <Form.Submit asChild>
            <Button type="submit">{actionLabel}</Button>
          </Form.Submit>
          <Button
            type="button"
            variant="link"
            onClick={() => navigate("/settings/countries")}
          >
            Cancel
          </Button>
        </div>
      </RRDForm>
    </Form.Root>
  );
}
