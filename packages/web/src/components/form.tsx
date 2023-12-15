import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormControl.displayName = "FormControl";

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <Label ref={ref} className={className} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

// const FormMessage = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLParagraphElement> & {
//     error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
//   }
// >(({ className, children, error, ...props }, ref) => {
//   const body = error ? String(error?.message) : children;
//
//   if (!body) {
//     return null;
//   }
//
//   return (
//     <p
//       ref={ref}
//       className={cn("text-sm font-medium text-destructive", className)}
//       {...props}
//     >
//       {body}
//     </p>
//   );
// });
// FormMessage.displayName = "FormMessage";

export { FormItem, FormLabel, FormDescription };
