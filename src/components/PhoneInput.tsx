import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Phone format patterns by country
const phoneFormats: Record<string, { pattern: string; placeholder: string; maxLength: number }> = {
  // Amérique du Nord (format: XXX XXX-XXXX)
  CA: { pattern: "### ###-####", placeholder: "438 123-4567", maxLength: 12 },
  US: { pattern: "### ###-####", placeholder: "555 123-4567", maxLength: 12 },
  
  // Europe
  FR: { pattern: "# ## ## ## ##", placeholder: "6 12 34 56 78", maxLength: 14 },
  BE: { pattern: "### ## ## ##", placeholder: "470 12 34 56", maxLength: 12 },
  CH: { pattern: "## ### ## ##", placeholder: "79 123 45 67", maxLength: 12 },
  GB: { pattern: "#### ######", placeholder: "7911 123456", maxLength: 11 },
  DE: { pattern: "### ########", placeholder: "170 12345678", maxLength: 12 },
  ES: { pattern: "### ### ###", placeholder: "612 345 678", maxLength: 11 },
  IT: { pattern: "### ### ####", placeholder: "312 345 6789", maxLength: 12 },
  PT: { pattern: "### ### ###", placeholder: "912 345 678", maxLength: 11 },
  NL: { pattern: "# ########", placeholder: "6 12345678", maxLength: 10 },
  LU: { pattern: "### ### ###", placeholder: "621 123 456", maxLength: 11 },
  
  // Afrique du Nord
  MA: { pattern: "### ## ## ##", placeholder: "612 34 56 78", maxLength: 12 },
  DZ: { pattern: "### ## ## ##", placeholder: "551 23 45 67", maxLength: 12 },
  TN: { pattern: "## ### ###", placeholder: "20 123 456", maxLength: 10 },
  LY: { pattern: "## ### ####", placeholder: "91 234 5678", maxLength: 11 },
  EG: { pattern: "### ### ####", placeholder: "100 123 4567", maxLength: 12 },
  
  // Afrique de l'Ouest
  SN: { pattern: "## ### ## ##", placeholder: "77 123 45 67", maxLength: 12 },
  CI: { pattern: "## ## ## ## ##", placeholder: "07 12 34 56 78", maxLength: 14 },
  ML: { pattern: "## ## ## ##", placeholder: "76 12 34 56", maxLength: 11 },
  BF: { pattern: "## ## ## ##", placeholder: "70 12 34 56", maxLength: 11 },
  NE: { pattern: "## ## ## ##", placeholder: "96 12 34 56", maxLength: 11 },
  TG: { pattern: "## ## ## ##", placeholder: "90 12 34 56", maxLength: 11 },
  BJ: { pattern: "## ## ## ##", placeholder: "97 12 34 56", maxLength: 11 },
  GN: { pattern: "### ## ## ##", placeholder: "622 12 34 56", maxLength: 12 },
  MR: { pattern: "## ## ## ##", placeholder: "22 12 34 56", maxLength: 11 },
  NG: { pattern: "### ### ####", placeholder: "803 123 4567", maxLength: 12 },
  GH: { pattern: "### ### ###", placeholder: "244 123 456", maxLength: 11 },
  
  // Afrique Centrale
  CM: { pattern: "### ## ## ##", placeholder: "670 12 34 56", maxLength: 12 },
  GA: { pattern: "# ## ## ##", placeholder: "6 12 34 56", maxLength: 10 },
  CG: { pattern: "## ### ####", placeholder: "06 123 4567", maxLength: 11 },
  CD: { pattern: "### ### ###", placeholder: "815 123 456", maxLength: 11 },
  TD: { pattern: "## ## ## ##", placeholder: "66 12 34 56", maxLength: 11 },
  CF: { pattern: "## ## ## ##", placeholder: "70 12 34 56", maxLength: 11 },
  
  // Afrique de l'Est
  KE: { pattern: "### ### ###", placeholder: "712 345 678", maxLength: 11 },
  TZ: { pattern: "### ### ###", placeholder: "712 345 678", maxLength: 11 },
  UG: { pattern: "### ### ###", placeholder: "712 345 678", maxLength: 11 },
  RW: { pattern: "### ### ###", placeholder: "788 123 456", maxLength: 11 },
  ET: { pattern: "### ### ###", placeholder: "911 234 567", maxLength: 11 },
  DJ: { pattern: "## ## ## ##", placeholder: "77 12 34 56", maxLength: 11 },
  
  // Afrique Australe
  ZA: { pattern: "## ### ####", placeholder: "71 234 5678", maxLength: 11 },
  MG: { pattern: "## ## ### ##", placeholder: "32 12 345 67", maxLength: 12 },
  MU: { pattern: "#### ####", placeholder: "5123 4567", maxLength: 9 },
  
  // Moyen-Orient
  LB: { pattern: "## ### ###", placeholder: "71 123 456", maxLength: 10 },
  JO: { pattern: "# #### ####", placeholder: "7 9012 3456", maxLength: 11 },
  SY: { pattern: "### ### ###", placeholder: "944 123 456", maxLength: 11 },
  IQ: { pattern: "### ### ####", placeholder: "750 123 4567", maxLength: 12 },
  KW: { pattern: "#### ####", placeholder: "5000 1234", maxLength: 9 },
  SA: { pattern: "## ### ####", placeholder: "50 123 4567", maxLength: 11 },
  AE: { pattern: "## ### ####", placeholder: "50 123 4567", maxLength: 11 },
  QA: { pattern: "#### ####", placeholder: "3312 3456", maxLength: 9 },
  BH: { pattern: "#### ####", placeholder: "3600 1234", maxLength: 9 },
  OM: { pattern: "#### ####", placeholder: "9212 3456", maxLength: 9 },
  YE: { pattern: "### ### ###", placeholder: "712 345 678", maxLength: 11 },
  PS: { pattern: "### ### ###", placeholder: "599 123 456", maxLength: 11 },
  IL: { pattern: "## ### ####", placeholder: "50 123 4567", maxLength: 11 },
  TR: { pattern: "### ### ## ##", placeholder: "532 123 45 67", maxLength: 13 },
  IR: { pattern: "### ### ####", placeholder: "912 345 6789", maxLength: 12 },
};

// Default format for countries not in the list
const defaultFormat = { pattern: "### ### ####", placeholder: "123 456 7890", maxLength: 12 };

const countryCodes = [
  // Amérique du Nord
  { code: "+1", country: "Canada", id: "CA" },
  { code: "+1", country: "États-Unis", id: "US" },
  
  // Europe
  { code: "+33", country: "France", id: "FR" },
  { code: "+32", country: "Belgique", id: "BE" },
  { code: "+41", country: "Suisse", id: "CH" },
  { code: "+44", country: "Royaume-Uni", id: "GB" },
  { code: "+49", country: "Allemagne", id: "DE" },
  { code: "+34", country: "Espagne", id: "ES" },
  { code: "+39", country: "Italie", id: "IT" },
  { code: "+351", country: "Portugal", id: "PT" },
  { code: "+31", country: "Pays-Bas", id: "NL" },
  { code: "+352", country: "Luxembourg", id: "LU" },
  
  // Afrique du Nord
  { code: "+212", country: "Maroc", id: "MA" },
  { code: "+213", country: "Algérie", id: "DZ" },
  { code: "+216", country: "Tunisie", id: "TN" },
  { code: "+218", country: "Libye", id: "LY" },
  { code: "+20", country: "Égypte", id: "EG" },
  
  // Afrique de l'Ouest
  { code: "+221", country: "Sénégal", id: "SN" },
  { code: "+225", country: "Côte d'Ivoire", id: "CI" },
  { code: "+223", country: "Mali", id: "ML" },
  { code: "+226", country: "Burkina Faso", id: "BF" },
  { code: "+227", country: "Niger", id: "NE" },
  { code: "+228", country: "Togo", id: "TG" },
  { code: "+229", country: "Bénin", id: "BJ" },
  { code: "+224", country: "Guinée", id: "GN" },
  { code: "+222", country: "Mauritanie", id: "MR" },
  { code: "+234", country: "Nigeria", id: "NG" },
  { code: "+233", country: "Ghana", id: "GH" },
  
  // Afrique Centrale
  { code: "+237", country: "Cameroun", id: "CM" },
  { code: "+241", country: "Gabon", id: "GA" },
  { code: "+242", country: "Congo", id: "CG" },
  { code: "+243", country: "RD Congo", id: "CD" },
  { code: "+235", country: "Tchad", id: "TD" },
  { code: "+236", country: "Centrafrique", id: "CF" },
  
  // Afrique de l'Est
  { code: "+254", country: "Kenya", id: "KE" },
  { code: "+255", country: "Tanzanie", id: "TZ" },
  { code: "+256", country: "Ouganda", id: "UG" },
  { code: "+250", country: "Rwanda", id: "RW" },
  { code: "+251", country: "Éthiopie", id: "ET" },
  { code: "+253", country: "Djibouti", id: "DJ" },
  
  // Afrique Australe
  { code: "+27", country: "Afrique du Sud", id: "ZA" },
  { code: "+261", country: "Madagascar", id: "MG" },
  { code: "+230", country: "Maurice", id: "MU" },
  
  // Moyen-Orient
  { code: "+961", country: "Liban", id: "LB" },
  { code: "+962", country: "Jordanie", id: "JO" },
  { code: "+963", country: "Syrie", id: "SY" },
  { code: "+964", country: "Irak", id: "IQ" },
  { code: "+965", country: "Koweït", id: "KW" },
  { code: "+966", country: "Arabie Saoudite", id: "SA" },
  { code: "+971", country: "Émirats Arabes Unis", id: "AE" },
  { code: "+974", country: "Qatar", id: "QA" },
  { code: "+973", country: "Bahreïn", id: "BH" },
  { code: "+968", country: "Oman", id: "OM" },
  { code: "+967", country: "Yémen", id: "YE" },
  { code: "+970", country: "Palestine", id: "PS" },
  { code: "+972", country: "Israël", id: "IL" },
  { code: "+90", country: "Turquie", id: "TR" },
  { code: "+98", country: "Iran", id: "IR" },
];

// Format phone number based on country pattern
const formatPhoneNumber = (value: string, countryId: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  
  const format = phoneFormats[countryId] || defaultFormat;
  const pattern = format.pattern;
  
  let result = "";
  let digitIndex = 0;
  
  for (let i = 0; i < pattern.length && digitIndex < digits.length; i++) {
    if (pattern[i] === "#") {
      result += digits[digitIndex];
      digitIndex++;
    } else {
      result += pattern[i];
    }
  }
  
  return result;
};

// Get placeholder for country
const getPlaceholder = (countryId: string): string => {
  return (phoneFormats[countryId] || defaultFormat).placeholder;
};

// Get max length for country
const getMaxLength = (countryId: string): number => {
  return (phoneFormats[countryId] || defaultFormat).maxLength;
};

// Flag component using flagcdn.com
const CountryFlag = ({ countryId, className }: { countryId: string; className?: string }) => (
  <img
    src={`https://flagcdn.com/w40/${countryId.toLowerCase()}.png`}
    srcSet={`https://flagcdn.com/w80/${countryId.toLowerCase()}.png 2x`}
    alt={countryId}
    className={cn("w-7 h-5 object-cover shadow-md border-2 border-border", className)}
    loading="lazy"
  />
);

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onCountryChange: (code: string) => void;
  selectedCountryId?: string;
  error?: boolean;
}

const PhoneInput = ({
  value,
  onChange,
  onCountryChange,
  selectedCountryId = "CA",
  error = false,
}: PhoneInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = countryCodes.find(c => c.id === selectedCountryId) || countryCodes[0];
  const currentPlaceholder = getPlaceholder(selectedCountryId);
  const currentMaxLength = getMaxLength(selectedCountryId);

  // Handle input change with formatting
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatPhoneNumber(rawValue, selectedCountryId);
    onChange(formattedValue);
  };

  const filteredCountries = countryCodes.filter(
    country =>
      country.country.toLowerCase().includes(search.toLowerCase()) ||
      country.code.includes(search)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country: typeof countryCodes[0]) => {
    onCountryChange(country.id);
    setIsOpen(false);
    setSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={cn(
          "flex items-center h-11 rounded-md border-2 bg-background transition-all duration-200 ease-out",
          error ? "border-destructive" : "border-input",
          "focus-within:border-focus focus-within:ring-0"
        )}
      >
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 h-full border-r border-input hover:bg-muted/50 transition-colors rounded-l-md"
        >
          <CountryFlag countryId={selectedCountry.id} />
          <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
        </button>

        {/* Country Code Display */}
        <span className="pl-3 pr-1 text-sm text-muted-foreground font-medium">
          {selectedCountry.code}
        </span>

        {/* Phone Number Input */}
        <input
          ref={inputRef}
          type="tel"
          value={value}
          onChange={handleInputChange}
          placeholder={currentPlaceholder}
          maxLength={currentMaxLength}
          className="flex-1 h-full px-2 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-background border border-border rounded-lg shadow-xl z-[100] overflow-hidden animate-in fade-in-0 zoom-in-95">
          {/* Search Input */}
          <div className="p-2 border-b border-border">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-md">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un pays..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoFocus
              />
            </div>
          </div>

          {/* Country List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.id}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors",
                    selectedCountry.id === country.id && "bg-primary/5"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <CountryFlag countryId={country.id} />
                    <span className="text-foreground">{country.country}</span>
                    <span className="text-muted-foreground">({country.code})</span>
                  </span>
                  {selectedCountry.id === country.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                Aucun pays trouvé
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
export { countryCodes };
