"use client";
import BrandHeader from "@/components/landing/BrandHeader";
import AuthCard from "@/components/landing/AuthCard";

export default function LandingPage() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    }}>
      <BrandHeader />
      <AuthCard />
    </main>
  );
}
