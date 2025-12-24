import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavLink from "@/components/NavLink";
import { menuItems } from "./navigationData";

const DesktopNav = () => {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="space-x-2 xl:space-x-4">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavLink
              to={item.href}
              end={item.href === "/"}
              className="text-sm xl:text-base text-muted-foreground hover:text-foreground px-2"
              activeClassName="text-primary font-medium"
            >
              {item.label}
            </NavLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;
