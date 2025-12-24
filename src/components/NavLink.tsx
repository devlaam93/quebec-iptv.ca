import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  end?: boolean;
  onClick?: () => void;
}

const NavLink = ({
  to,
  children,
  className,
  activeClassName = "text-primary font-medium",
  end = false,
  onClick,
}: NavLinkProps) => {
  const location = useLocation();
  
  const isActive = end 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  return (
    <a
      href={to}
      onClick={onClick}
      className={cn(
        "transition-colors",
        className,
        isActive && activeClassName
      )}
    >
      {children}
    </a>
  );
};

export default NavLink;
