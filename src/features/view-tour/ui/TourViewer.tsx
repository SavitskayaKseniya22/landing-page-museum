import type { TourType } from "@/entities/tour";

export default function TourViewer({ tour }: { tour: TourType }) {
  return (
    <iframe
      style={{ width: "100%", height: "100%", minHeight: "60vh", border: "none" }}
      src={tour.link}
      loading="lazy"
      title={tour.name}
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}
