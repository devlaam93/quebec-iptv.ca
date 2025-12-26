import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { usePrefetchRoute } from "@/hooks/usePrefetchRoute";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  end?: boolean;
  onClick?: () => void;
  /** Enable image prefetching on hover */
  prefetch?: boolean;
}

const NavLink = ({
  to,
  children,
  className,
  activeClassName = "text-primary font-medium",
  end = false,
  onClick,
  prefetch = true,
}: NavLinkProps) => {
  const location = useLocation();
  const { onMouseEnter, onMouseLeave } = usePrefetchRoute(to, {
    enableLogging: import.meta.env.DEV,
  });
  
  const isActive = end 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  return (
    <a
      href={to}
      onClick={onClick}
      onMouseEnter={prefetch ? onMouseEnter : undefined}
      onMouseLeave={prefetch ? onMouseLeave : undefined}
      onFocus={prefetch ? onMouseEnter : undefined}
      onBlur={prefetch ? onMouseLeave : undefined}
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
