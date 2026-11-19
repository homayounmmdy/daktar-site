import { Suspense } from "react";
import DashboardClient from "./components/DashboardClient";

export const metadata = {
  title: "داشبورد — داکتر سایت",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#FAFAFA]" />}>
      <DashboardClient />
    </Suspense>
  );
}
