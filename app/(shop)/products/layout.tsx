import { Header } from "@/components/header/header";
import Footer from "@/components/footer/footer";
import MobileMenu from "@/components/header/mobile-menu";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import BottomActionBar from "@/components/bottom-action-bar";
import Topbar from "@/components/sections/top-bar";

const ShopPageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <Header isHomePage />
      <MobileMenu />
      <main className="h-full pt-[40px]">{children}</main>
      <BottomActionBar />
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default ShopPageLayout;
