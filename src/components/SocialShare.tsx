import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = useCallback((platform: keyof typeof shareLinks) => {
    const width = 600;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    window.open(
      shareLinks[platform],
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );
  }, [shareLinks]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [url]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        // User cancelled or error
        console.log("Share cancelled");
      }
    }
  }, [title, description, url]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground mr-1">Partager :</span>
      
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-colors"
        onClick={() => handleShare("facebook")}
        aria-label="Partager sur Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-colors"
        onClick={() => handleShare("twitter")}
        aria-label="Partager sur Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-colors"
        onClick={() => handleShare("linkedin")}
        aria-label="Partager sur LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={`h-9 w-9 rounded-full transition-colors ${
          copied 
            ? "bg-green-500/10 text-green-500 border-green-500/30" 
            : "hover:bg-primary/10 hover:text-primary hover:border-primary/30"
        }`}
        onClick={handleCopyLink}
        aria-label={copied ? "Lien copié" : "Copier le lien"}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </Button>

      {/* Native share button for mobile */}
      {typeof navigator !== "undefined" && navigator.share && (
        <Button
          variant="default"
          size="sm"
          className="rounded-full ml-2"
          onClick={handleNativeShare}
        >
          Partager
        </Button>
      )}
    </div>
  );
};

export default SocialShare;
