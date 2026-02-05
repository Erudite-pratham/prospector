import { cn } from "@/lib/utils";

export function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("mx-auto max-w-7xl px-4 md:px-6", className)}>
      {children}
    </main>
  );
}
