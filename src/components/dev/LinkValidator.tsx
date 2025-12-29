import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  scanPageLinks,
  ValidationReport,
  logValidationReport,
} from "@/lib/sitemap-validator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

/**
 * Dev-only component to validate internal links against sitemap
 * Only renders in development mode
 */
export function LinkValidator() {
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const location = useLocation();

  // Only show in development
  if (!import.meta.env.DEV) {
    return null;
  }

  const runScan = useCallback(() => {
    setIsScanning(true);
    // Delay to allow DOM to settle after navigation
    setTimeout(() => {
      const newReport = scanPageLinks();
      setReport(newReport);
      logValidationReport(newReport);
      setIsScanning(false);
    }, 500);
  }, []);

  // Auto-scan on route change
  useEffect(() => {
    runScan();
  }, [location.pathname, runScan]);

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-[9999] bg-background border border-border rounded-full p-3 shadow-lg hover:bg-accent transition-colors"
        title="Open Link Validator"
      >
        {report && report.brokenLinks.length > 0 ? (
          <XCircle className="h-5 w-5 text-destructive" />
        ) : (
          <CheckCircle className="h-5 w-5 text-green-500" />
        )}
        {report && report.brokenLinks.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {report.brokenLinks.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-96 max-h-[80vh] bg-background border border-border rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-muted px-4 py-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">🔗 Link Validator</span>
          {report && (
            <Badge
              variant={report.brokenLinks.length > 0 ? "destructive" : "default"}
              className="text-xs"
            >
              {report.brokenLinks.length > 0
                ? `${report.brokenLinks.length} broken`
                : "All valid"}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={runScan}
            disabled={isScanning}
          >
            <RefreshCw
              className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsMinimized(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="px-4 py-3 bg-background border-b border-border">
        <div className="text-xs text-muted-foreground mb-1">
          Current: {location.pathname}
        </div>
        {report ? (
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-lg font-bold">{report.totalLinks}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-500">
                {report.validLinks}
              </div>
              <div className="text-xs text-muted-foreground">Valid</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-500">
                {report.dynamicLinks.length}
              </div>
              <div className="text-xs text-muted-foreground">Dynamic</div>
            </div>
            <div>
              <div className="text-lg font-bold text-destructive">
                {report.brokenLinks.length}
              </div>
              <div className="text-xs text-muted-foreground">Broken</div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            {isScanning ? "Scanning..." : "No scan data"}
          </div>
        )}
      </div>

      {/* Details (expandable) */}
      {isExpanded && report && (
        <div className="max-h-[50vh] overflow-y-auto">
          {/* Broken Links */}
          {report.brokenLinks.length > 0 && (
            <div className="border-b border-border">
              <div className="px-4 py-2 bg-destructive/10 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  Broken Links ({report.brokenLinks.length})
                </span>
              </div>
              <ul className="divide-y divide-border">
                {report.brokenLinks.map((link, idx) => (
                  <li key={idx} className="px-4 py-2 text-sm">
                    <div className="font-mono text-xs text-destructive break-all">
                      {link.href}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      "{link.text}" in {link.location}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dynamic Links */}
          {report.dynamicLinks.length > 0 && (
            <div className="border-b border-border">
              <div className="px-4 py-2 bg-yellow-500/10 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  Dynamic Links ({report.dynamicLinks.length})
                </span>
              </div>
              <ul className="divide-y divide-border max-h-40 overflow-y-auto">
                {report.dynamicLinks.slice(0, 10).map((link, idx) => (
                  <li key={idx} className="px-4 py-2 text-sm">
                    <div className="font-mono text-xs break-all">
                      {link.href}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      "{link.text}"
                    </div>
                  </li>
                ))}
                {report.dynamicLinks.length > 10 && (
                  <li className="px-4 py-2 text-xs text-muted-foreground">
                    +{report.dynamicLinks.length - 10} more...
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* All valid */}
          {report.brokenLinks.length === 0 &&
            report.dynamicLinks.length === 0 && (
              <div className="px-4 py-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-green-600 dark:text-green-400">
                  All links are valid!
                </div>
              </div>
            )}

          {/* External links summary */}
          {report.skippedLinks.length > 0 && (
            <div className="px-4 py-2 bg-muted/50 flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" />
              <span>{report.skippedLinks.length} external links skipped</span>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-2 bg-muted/50 text-xs text-muted-foreground text-center">
        Dev only • Last scan: {report?.timestamp.toLocaleTimeString() || "Never"}
      </div>
    </div>
  );
}
