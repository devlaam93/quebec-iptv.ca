import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Send, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import PhoneInput, { countryCodes } from "@/components/PhoneInput";

// Validation schema with proper error messages
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z
    .string()
    .trim()
    .min(1, "L'adresse email est requise")
    .email("Veuillez entrer une adresse email valide")
    .max(255, "L'email ne peut pas dépasser 255 caractères"),
  phone: z
    .string()
    .min(7, "Le numéro de téléphone doit contenir au moins 7 chiffres")
    .max(20, "Le numéro ne peut pas dépasser 20 caractères"),
  subject: z
    .string()
    .trim()
    .min(3, "Le sujet doit contenir au moins 3 caractères")
    .max(150, "Le sujet ne peut pas dépasser 150 caractères"),
  message: z
    .string()
    .trim()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(2000, "Le message ne peut pas dépasser 2000 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Accessible error message component
const FieldError = ({ id, message }: { id: string; message?: string }) => {
  if (!message) return null;
  
  return (
    <div 
      id={id}
      role="alert"
      aria-live="polite"
      className="flex items-center gap-1.5 mt-1.5 text-destructive"
    >
      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span className="text-sm">{message}</span>
    </div>
  );
};

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("CA");
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const messageValue = watch("message") || "";
  const hasErrors = Object.keys(errors).length > 0;

  // Focus error summary when form has errors after submit attempt
  useEffect(() => {
    if (hasErrors && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    }
  }, [hasErrors]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const selectedCountry = countryCodes.find(c => c.id === selectedCountryId);
      const fullPhone = `${selectedCountry?.code || "+1"} ${data.phone}`;
      
      const webhookPayload = {
        form_name: "Contact IPTV Quebec",
        form_id: "contact-form",
        name: data.name,
        email: data.email,
        phone: fullPhone,
        country: selectedCountry?.country || "Canada",
        subject: data.subject,
        message: data.message,
        meta: {
          date: new Date().toISOString(),
          page_url: window.location.href,
        }
      };

      await fetch("https://iptv-dashboard-xi.vercel.app/api/webhooks/lovanle/elementor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify(webhookPayload),
      });

      setIsSubmitted(true);
      toast.success("Message envoyé avec succès!");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const handleReset = () => {
    reset();
    setPhoneValue("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="border-primary/20">
        <CardContent className="pt-8 pb-8">
          <div 
            className="text-center space-y-4"
            role="status"
            aria-live="polite"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Message Envoyé!</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
            </p>
            <Button onClick={handleReset} variant="outline" className="mt-4">
              Envoyer un autre message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl">Envoyez-nous un Message</CardTitle>
        <CardDescription>
          Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Error Summary for Screen Readers */}
        {hasErrors && (
          <div
            ref={errorSummaryRef}
            tabIndex={-1}
            role="alert"
            aria-labelledby="error-summary-title"
            className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20"
          >
            <h4 id="error-summary-title" className="font-semibold text-destructive flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5" aria-hidden="true" />
              Veuillez corriger les erreurs suivantes:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-destructive">
              {errors.name && <li>{errors.name.message}</li>}
              {errors.email && <li>{errors.email.message}</li>}
              {errors.phone && <li>{errors.phone.message}</li>}
              {errors.subject && <li>{errors.subject.message}</li>}
              {errors.message && <li>{errors.message.message}</li>}
            </ul>
          </div>
        )}

        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-5"
          noValidate
          aria-label="Formulaire de contact"
        >
          {/* Name Field */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-name" className="text-sm font-medium">
              Nom Complet <span className="text-destructive" aria-label="requis">*</span>
            </Label>
            <Input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder="Jean Dupont"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            <FieldError id="contact-name-error" message={errors.name?.message} />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-email" className="text-sm font-medium">
              Adresse Email <span className="text-destructive" aria-label="requis">*</span>
            </Label>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="jean@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            <FieldError id="contact-email-error" message={errors.email?.message} />
          </div>

          {/* Phone Field */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-phone" className="text-sm font-medium">
              Téléphone <span className="text-destructive" aria-label="requis">*</span>
            </Label>
            <PhoneInput
              value={phoneValue}
              onChange={(value) => {
                setPhoneValue(value);
                setValue("phone", value, { shouldValidate: true });
              }}
              onCountryChange={setSelectedCountryId}
              selectedCountryId={selectedCountryId}
              error={!!errors.phone}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            />
            <FieldError id="contact-phone-error" message={errors.phone?.message} />
          </div>

          {/* Subject Field */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-subject" className="text-sm font-medium">
              Sujet <span className="text-destructive" aria-label="requis">*</span>
            </Label>
            <Input
              id="contact-subject"
              type="text"
              placeholder="Ex: Question sur les abonnements"
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "contact-subject-error" : undefined}
              {...register("subject")}
              className={errors.subject ? "border-destructive" : ""}
            />
            <FieldError id="contact-subject-error" message={errors.subject?.message} />
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-message" className="text-sm font-medium">
              Message <span className="text-destructive" aria-label="requis">*</span>
            </Label>
            <Textarea
              id="contact-message"
              placeholder="Décrivez votre demande en détail..."
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "contact-message-error contact-message-count" : "contact-message-count"}
              {...register("message")}
              className={`min-h-[120px] resize-none ${errors.message ? "border-destructive" : ""}`}
              maxLength={2000}
            />
            <div className="flex justify-between items-start">
              <FieldError id="contact-message-error" message={errors.message?.message} />
              <p 
                id="contact-message-count"
                className={`text-xs ml-auto ${messageValue.length > 1800 ? 'text-destructive' : 'text-muted-foreground'}`}
                aria-live="polite"
              >
                {messageValue.length}/2000
              </p>
            </div>
          </div>

          {/* Required Fields Note */}
          <p className="text-xs text-muted-foreground">
            <span className="text-destructive" aria-hidden="true">*</span> Champs obligatoires
          </p>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Envoyer le Message</span>
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
