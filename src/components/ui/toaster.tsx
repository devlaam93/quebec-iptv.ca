import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <div
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map(function ({ id, title, description, action, variant, ...props }) {
          return (
            <Toast 
              key={id} 
              variant={variant}
              role={variant === "destructive" ? "alert" : "status"}
              aria-live={variant === "destructive" ? "assertive" : "polite"}
              {...props}
            >
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              {action}
              <ToastClose aria-label="Fermer la notification" />
            </Toast>
          );
        })}
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}
