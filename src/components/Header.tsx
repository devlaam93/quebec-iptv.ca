import { useState } from "react";
import PromoBanner from "./PromoBanner";
import HeaderLogo from "./header/HeaderLogo";
import DesktopNav from "./header/DesktopNav";
import MobileNav from "./header/MobileNav";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(() => {
    return sessionStorage.getItem("promoBannerClosed") !== "true";
  });

  const handleBannerClose = () => {
    setBannerVisible(false);
  };

  return (
    <>
      <PromoBanner onClose={handleBannerClose} />
      <header
        className={`fixed left-0 right-0 z-50 bg-background/95 sm:bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm transition-all ${
          bannerVisible ? "top-[68px] sm:top-[40px]" : "top-0"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
          <HeaderLogo />
          <DesktopNav />
          <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
        </div>
      </header>
    </>
  );
};

export default Header;
