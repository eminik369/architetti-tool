import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ee partners | AI Solutions per l'Architettura",
  description:
    "Soluzioni AI progettate per TStudio. Dall'analisi dei bandi alla coordinazione progetto.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
