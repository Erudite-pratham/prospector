import { MaxWidthWrapper } from "@/components/common/MaxWidthWrapper";
import { Navbar } from "@/components/layout/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </main>
    </>
  );
}
