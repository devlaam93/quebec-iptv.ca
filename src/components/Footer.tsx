import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HeaderLogo from "@/components/header/HeaderLogo";
import amexIcon from "@/assets/logos/amex-icon.png";
import paypalIcon from "@/assets/logos/paypal-icon.png";
import { Mail, Phone, MapPin, Clock, Shield, Headphones } from "lucide-react";
const WhatsAppIcon = ({
  className
}: {
  className?: string;
}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>;

// Official payment method SVG icons
const VisaIcon = ({
  className
}: {
  className?: string;
}) => <svg className={className} viewBox="0 0 750 471" fill="none">
    <rect width="750" height="471" rx="40" fill="#1A1F71" />
    <path fillRule="evenodd" clipRule="evenodd" d="M278.198 334.228L311.538 138.368H364.938L331.598 334.228H278.198ZM524.308 142.688C513.458 138.628 496.378 134.228 475.268 134.228C422.298 134.228 385.018 162.428 384.708 202.848C384.408 232.858 411.998 249.618 432.958 259.548C454.478 269.728 461.638 276.348 461.538 285.568C461.388 299.888 444.258 306.298 428.268 306.298C406.018 306.298 394.148 303.188 375.768 294.928L368.448 291.478L360.448 339.098C373.868 345.168 398.848 350.448 424.858 350.688C481.158 350.688 517.658 322.848 518.108 279.748C518.328 256.168 503.738 238.248 472.238 223.368C452.888 213.718 441.278 207.348 441.398 197.548C441.398 188.868 451.388 179.578 472.858 179.578C490.668 179.288 503.788 183.168 514.068 187.228L518.958 189.528L527.108 143.208L524.308 142.688ZM661.618 138.368H620.818C608.098 138.368 598.508 141.868 592.668 154.688L514.978 334.228H571.188C571.188 334.228 580.358 309.638 582.578 303.638C588.778 303.638 643.298 303.728 651.128 303.728C652.868 311.568 657.848 334.228 657.848 334.228H707.848L661.618 138.368ZM600.178 262.428C604.758 250.868 623.058 202.688 623.058 202.688C622.748 203.228 627.588 190.868 630.378 183.138L634.148 201.028C634.148 201.028 645.468 253.318 647.848 262.428H600.178ZM232.898 138.368L180.438 271.148L174.878 243.118C165.238 211.888 136.378 177.848 104.178 160.888L151.948 333.978L208.548 333.908L289.598 138.368H232.898Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M146.918 138.368H60.8781L60.0781 142.268C127.818 159.268 171.968 199.148 188.698 247.298L171.618 155.048C168.558 142.318 158.908 138.768 146.918 138.368Z" fill="#F9A533" />
  </svg>;
const MastercardIcon = ({
  className
}: {
  className?: string;
}) => <svg className={className} viewBox="0 0 152 100" fill="none">
    <rect width="152" height="100" rx="8" fill="#000000" />
    <circle cx="52" cy="50" r="30" fill="#EB001B" />
    <circle cx="100" cy="50" r="30" fill="#F79E1B" />
    <path d="M76 27C83.5 33 88 42 88 50C88 58 83.5 67 76 73C68.5 67 64 58 64 50C64 42 68.5 33 76 27Z" fill="#FF5F00" />
  </svg>;
const PaypalIcon = ({
  className
}: {
  className?: string;
}) => <div className={className}>
    <img src={paypalIcon} alt="Paiement par PayPal" className="h-full w-full object-contain" />
  </div>;
const ApplePayIcon = ({
  className
}: {
  className?: string;
}) => <svg className={className} viewBox="0 0 165 105" fill="none">
    <rect width="165" height="105" rx="12" fill="#000000" />
    <path d="M48.875 35.156c-1.71 2.008-4.431 3.574-7.153 3.35-.332-2.679 1.002-5.507 2.566-7.258 1.71-2.008 4.653-3.5 7.078-3.574.283 2.753-.854 5.507-2.491 7.482zm2.466 3.797c-3.963-.221-7.34 2.232-9.222 2.232-1.907 0-4.824-2.158-7.986-2.084-4.11.074-7.912 2.38-10.011 6.028-4.28 7.39-1.118 18.33 3.04 24.358 2.027 2.976 4.431 6.248 7.62 6.126 3.04-.148 4.208-1.96 7.888-1.96 3.68 0 4.726 1.96 7.962 1.886 3.31-.074 5.395-2.976 7.423-5.952 2.32-3.424 3.262-6.7 3.31-6.873-.073-.074-6.364-2.454-6.437-9.695-.073-6.052 4.95-8.956 5.173-9.104-2.834-4.17-7.227-4.636-8.76-4.962zm26.05-8.658v45.303h7.35V57.16h10.183c9.296 0 15.832-6.373 15.832-15.488 0-9.116-6.389-15.414-15.611-15.414h-17.754zm7.35 6.126h8.494c6.388 0 10.036 3.424 10.036 9.363 0 5.938-3.648 9.388-10.085 9.388h-8.445V36.42zm41.287 39.548c4.617 0 8.91-2.38 10.843-6.126h.148v5.755h6.815V49.4c0-6.823-5.493-11.216-13.941-11.216-7.888 0-13.723 4.467-13.943 10.597h6.608c.538-2.902 3.236-4.81 7.116-4.81 4.599 0 7.176 2.133 7.176 6.052v2.68l-9.37.554c-8.714.517-13.43 4.095-13.43 10.295 0 6.274 4.888 10.446 11.978 10.446zm1.955-5.656c-4.012 0-6.56-1.93-6.56-4.88 0-5.014 2.395-5.383 8.592-5.754l8.347-.518v2.754c0 4.887-4.159 8.398-10.38 8.398zm25.145 18.181c7.177 0 10.549-2.754 13.478-11.068l12.907-36.039h-7.494l-8.665 27.53h-.147l-8.666-27.53h-7.716l12.466 34.524-.684 2.084c-1.125 3.498-2.957 4.843-6.242 4.843-.586 0-1.71-.074-2.174-.148v5.655c.44.148 2.321.148 2.937.148z" fill="white" />
  </svg>;
const GooglePayIcon = ({
  className
}: {
  className?: string;
}) => <svg className={className} viewBox="0 0 165 105" fill="none">
    <rect width="165" height="105" rx="12" fill="#FFFFFF" stroke="#DADCE0" strokeWidth="1" />
    <path d="M78.302 52.5v15.386h-4.873V28.114h12.926c3.11 0 5.748 1.04 7.915 3.12 2.213 2.08 3.32 4.589 3.32 7.528 0 3.033-1.107 5.566-3.32 7.599-2.12 2.033-4.758 3.05-7.915 3.05h-8.053v3.089zm0-19.629v14.237h8.147c1.858 0 3.414-.644 4.639-1.933 1.272-1.288 1.908-2.87 1.908-4.706 0-1.787-.636-3.322-1.908-4.61-1.225-1.336-2.781-2.004-4.639-2.004l-8.147 1.016z" fill="#3C4043" />
    <path d="M111.228 42.378c3.579 0 6.406 1.016 8.478 3.05 2.073 2.032 3.109 4.823 3.109 8.37v16.988h-4.685v-3.837h-.212c-2.002 3.156-4.662 4.734-7.986 4.734-2.852 0-5.232-.844-7.146-2.533-1.906-1.688-2.864-3.81-2.864-6.37 0-2.69.964-4.835 2.887-6.416 1.93-1.593 4.498-2.39 7.71-2.39 2.734 0 4.992.504 6.76 1.511v-1.065c0-1.616-.66-2.988-1.978-4.11-1.319-1.136-2.852-1.699-4.592-1.699-2.663 0-4.758 1.112-6.29 3.332l-4.31-2.72c2.26-3.32 5.632-4.985 10.119-4.985v.14zm-5.96 22.72c0 1.23.543 2.248 1.623 3.05 1.085.801 2.33 1.206 3.72 1.206 2.027 0 3.814-.752 5.349-2.248 1.553-1.51 2.33-3.276 2.33-5.309-1.436-1.135-3.414-1.699-5.938-1.699-1.835 0-3.367.45-4.592 1.348-1.248.897-1.876 2.003-1.876 3.332l-.616.32z" fill="#3C4043" />
    <path d="M151.152 43.276l-16.27 37.44h-5.02l6.055-13.01-10.709-24.43h5.302l7.758 18.704h.118l7.545-18.704h5.221z" fill="#3C4043" />
    <path d="M58.77 49.46c0-1.146-.094-2.248-.283-3.312H41.324v6.27h9.787c-.424 2.272-1.694 4.196-3.603 5.496v4.564h5.82c3.415-3.134 5.388-7.77 5.388-13.018h.054z" fill="#4285F4" />
    <path d="M41.324 66.934c4.874 0 8.963-1.604 11.945-4.364l-5.82-4.518c-1.624 1.088-3.697 1.724-6.125 1.724-4.709 0-8.704-3.18-10.134-7.462h-6.008v4.658c2.994 5.924 9.145 9.962 16.142 9.962z" fill="#34A853" />
    <path d="M31.19 52.314c-.377-1.088-.565-2.248-.565-3.456 0-1.208.212-2.392.565-3.456v-4.658h-6.008c-1.247 2.46-1.953 5.238-1.953 8.114 0 2.876.706 5.654 1.953 8.114l6.008-4.658z" fill="#FABB05" />
    <path d="M41.324 37.94c2.663 0 5.044.916 6.927 2.7l5.185-5.19c-3.132-2.924-7.222-4.716-12.112-4.716-6.997 0-13.148 4.038-16.142 9.962l6.008 4.658c1.43-4.282 5.425-7.462 10.134-7.462v.048z" fill="#E94235" />
  </svg>;
const InteracIcon = ({
  className
}: {
  className?: string;
}) => <svg className={className} viewBox="0 0 165 105" fill="none">
    <rect width="165" height="105" rx="12" fill="#FFCC00" />
    <circle cx="82.5" cy="52.5" r="32" fill="white" />
    <circle cx="75" cy="38" r="5" fill="#333333" />
    <rect x="72" y="45" width="6" height="25" rx="3" fill="#333333" />
    <path d="M85 50L105 38V68L85 56V50Z" fill="#333333" />
  </svg>;
const AmexIcon = ({
  className
}: {
  className?: string;
}) => <div className={className}>
    
  </div>;
const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Content */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="text-center sm:text-left">
                {/* Logo */}
                <div className="flex justify-center sm:justify-start mb-4">
                  <HeaderLogo />
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-sm mx-auto sm:mx-0">
                  Le meilleur service IPTV au Quebec avec plus de 45 000 chaînes et 100 000+ VOD.
                </p>

                {/* Key Info badges */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Support 24/7</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Garantie 7 jours</span>
                  </div>
                </div>

                {/* Support hours - Compact on mobile */}
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <Headphones className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Heures de Support</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4 gap-1 text-xs text-muted-foreground">
                    <p className="flex items-center justify-center sm:justify-start gap-1.5">
                      <span className="font-medium text-foreground">WhatsApp:</span>
                      <span className="text-emerald-500 font-medium">24h/24</span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-1.5">
                      <span className="font-medium text-foreground">Email:</span>
                      <span>Sous 2h</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-8">
              {/* Mobile: Accordion layout */}
              <div className="sm:hidden">
                <Accordion type="multiple" className="w-full">
                  {/* Règlements */}
                  <AccordionItem value="reglements" className="border-border">
                    <AccordionTrigger className="text-sm font-semibold text-foreground uppercase tracking-wider hover:no-underline py-3">
                      Règlements
                    </AccordionTrigger>
                    <AccordionContent>
                      <nav aria-label="Liens légaux">
                        <ul className="space-y-2">
                          <li><a href="/politique-confidentialite" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Confidentialité</a></li>
                          <li><a href="/conditions-generales" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Conditions générales</a></li>
                          <li><a href="/avis-non-responsabilite" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Non-responsabilité</a></li>
                          <li><a href="/dmca-policy" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">DMCA</a></li>
                        </ul>
                      </nav>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Service Client */}
                  <AccordionItem value="service" className="border-border">
                    <AccordionTrigger className="text-sm font-semibold text-foreground uppercase tracking-wider hover:no-underline py-3">
                      Service Client
                    </AccordionTrigger>
                    <AccordionContent>
                      <nav aria-label="Service client">
                        <ul className="space-y-2">
                          <li><a href="/annulation-commande" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Annulation</a></li>
                          <li><a href="/politique-remboursement" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Remboursement</a></li>
                          <li><a href="/conditions-paiement" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Paiement</a></li>
                          <li><a href="/faq" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
                          <li><a href="/accessibilite" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Accessibilité</a></li>
                          <li><a href="/blog" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                        </ul>
                      </nav>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Contact */}
                  <AccordionItem value="contact" className="border-border">
                    <AccordionTrigger className="text-sm font-semibold text-foreground uppercase tracking-wider hover:no-underline py-3">
                      Contact
                    </AccordionTrigger>
                    <AccordionContent>
                      <address className="not-italic space-y-2">
                        <a href="mailto:support@quebeciptv.ca" className="flex items-center gap-2.5 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>support@quebeciptv.ca</span>
                        </a>
                        <a href="tel:+15141234567" className="flex items-center gap-2.5 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>+1 (514) 123-4567</span>
                        </a>
                        <p className="flex items-center gap-2.5 py-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>Montreal, QC, Canada</span>
                        </p>
                      </address>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Desktop/Tablet: Standard grid layout */}
              <div className="hidden sm:grid sm:grid-cols-3 sm:gap-8">
                {/* Règlements */}
                <nav aria-label="Liens légaux">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    Règlements
                  </h3>
                  <ul className="space-y-1">
                    <li><a href="/politique-confidentialite" className="block py-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">Confidentialité</a></li>
                    <li><a href="/conditions-generales" className="block py-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">Conditions générales</a></li>
                    <li><a href="/avis-non-responsabilite" className="block py-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">Non-responsabilité</a></li>
                    <li><a href="/dmca-policy" className="block py-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">DMCA</a></li>
                  </ul>
                </nav>

                {/* Service Client */}
                <nav aria-label="Service client">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    Service Client
                  </h3>
                  <ul className="space-y-1">
                    <li><a href="/annulation-commande" className="block py-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">Annulation</a></li>
                    <li><a href="/politique-remboursement" className="block py-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">Remboursement</a></li>
                    <li><a href="/conditions-paiement" className="block py-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">Paiement</a></li>
                    <li><a href="/faq" className="block py-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
                    <li><a href="/accessibilite" className="block py-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">Accessibilité</a></li>
                    <li><a href="/blog" className="block py-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                  </ul>
                </nav>

                {/* Contact */}
                <address className="not-italic">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    Contact
                  </h3>
                  <div className="space-y-3">
                    <a href="mailto:support@quebeciptv.ca" className="flex items-center gap-2.5 py-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="truncate">support@quebeciptv.ca</span>
                    </a>
                    <a href="tel:+15141234567" className="flex items-center gap-2.5 py-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>+1 (514) 123-4567</span>
                    </a>
                    <p className="flex items-center gap-2.5 py-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Montreal, QC, Canada</span>
                    </p>
                  </div>
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-5 sm:py-6">
          <div className="flex flex-col items-center gap-4">
            {/* Payment Methods */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center" role="list" aria-label="Modes de paiement acceptés">
              <span className="text-xs text-muted-foreground mr-1 sm:mr-2">Paiements sécurisés:</span>
              <span role="listitem" aria-label="Visa"><VisaIcon className="h-7 w-7 sm:h-8 sm:w-8 opacity-80 hover:opacity-100 transition-opacity" /></span>
              <span role="listitem" aria-label="Mastercard"><MastercardIcon className="h-7 w-7 sm:h-8 sm:w-8 opacity-80 hover:opacity-100 transition-opacity" /></span>
              <span role="listitem" aria-label="PayPal"><PaypalIcon className="h-7 w-7 sm:h-8 sm:w-8 opacity-80 hover:opacity-100 transition-opacity" /></span>
              <span role="listitem" aria-label="Interac"><InteracIcon className="h-7 w-7 sm:h-8 sm:w-8 opacity-80 hover:opacity-100 transition-opacity" /></span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-4">
              <nav aria-label="Liens rapides" className="flex flex-wrap justify-center gap-x-1 gap-y-1 order-1 sm:order-2">
                <a href="/" className="text-xs px-3 py-2 min-h-[44px] flex items-center text-muted-foreground hover:text-primary transition-colors">Accueil</a>
                <a href="/tarifs" className="text-xs px-3 py-2 min-h-[44px] flex items-center text-muted-foreground hover:text-primary transition-colors">Tarifs</a>
                <a href="/essai-gratuit" className="text-xs px-3 py-2 min-h-[44px] flex items-center text-muted-foreground hover:text-primary transition-colors">Essai Gratuit</a>
                <a href="/contact" className="text-xs px-3 py-2 min-h-[44px] flex items-center text-muted-foreground hover:text-primary transition-colors">Contact</a>
              </nav>
              <p className="text-xs text-muted-foreground order-2 sm:order-1">
                © 2026 Quebec IPTV. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;