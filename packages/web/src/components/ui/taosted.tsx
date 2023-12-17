import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { ToasterToast, genId } from "@/components/ui/use-toast";

export function Toasted({
  id = genId(),
  title,
  description,
  action,
  ...props
}: Partial<ToasterToast>) {
  return (
    <ToastProvider>
      <Toast key={id} {...props}>
        <div className="grid gap-1">
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
        {action}
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
