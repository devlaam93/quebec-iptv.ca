import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "ghost" | "outline";
  className?: string;
  showLabel?: boolean;
}

const BookmarkButton = ({
  isBookmarked,
  onToggle,
  size = "icon",
  variant = "ghost",
  className,
  showLabel = false,
}: BookmarkButtonProps) => {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      size={size}
      variant={variant}
      className={cn(
        "transition-all duration-200",
        isBookmarked && "text-primary",
        className
      )}
      aria-label={isBookmarked ? "Retirer de la liste de lecture" : "Ajouter à la liste de lecture"}
      title={isBookmarked ? "Retirer de la liste de lecture" : "Ajouter à la liste de lecture"}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-5 w-5 fill-current" />
      ) : (
        <Bookmark className="h-5 w-5" />
      )}
      {showLabel && (
        <span className="ml-2">
          {isBookmarked ? "Enregistré" : "Enregistrer"}
        </span>
      )}
    </Button>
  );
};

export default BookmarkButton;
