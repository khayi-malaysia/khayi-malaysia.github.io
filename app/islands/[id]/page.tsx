import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IslandGuide } from "@/components/IslandGuide";
import { TRIPS } from "@/lib/trips";

export const dynamicParams = false;

export function generateStaticParams() {
  return TRIPS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const trip = TRIPS.find((t) => t.id === id);
  if (!trip) return {};
  return {
    title: `${trip.name} (${trip.i18n.my.name}) | Khayi ခရီး`,
    description: trip.i18n.en.description,
  };
}

export default async function IslandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = TRIPS.find((t) => t.id === id);
  if (!trip) notFound();
  return <IslandGuide trip={trip} />;
}
