"use client";

import { useEffect, useState } from "react";
import { getIndustries, Industry } from "@/lib/api/industry.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function IndustriesGrid() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getIndustries();
        setIndustries(data);
      } catch (err: any) {
        setError(err.message || "Failed to load industries");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading industries...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {industries.map((industry) => (
        <Link key={industry.id} href={`/industry/${industry.id}`}>
          <Card className="cursor-pointer hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-base">{industry.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Created on {new Date(industry.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
