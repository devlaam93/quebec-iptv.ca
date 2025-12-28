import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavLink from "@/components/NavLink";
import { menuItems } from "./navigationData";

const DesktopNav = () => {
  return (
    <nav aria-label="Navigation principale" className="hidden lg:flex">
      <NavigationMenu>
        <NavigationMenuList className="space-x-2 xl:space-x-4">
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === "/"}
                className="text-sm xl:text-base text-muted-foreground hover:text-foreground px-3 py-3 min-h-[44px] min-w-[44px] inline-flex items-center touch-manipulation"
                activeClassName="text-primary font-medium"
              >
                {item.label}
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNav;
