import { useParams } from "react-router";
import { getTourById } from "@/entities/tour";
import { TourViewer } from "@/features/view-tour";
import Modal from "@/shared/ui/Modal";
import DetailPage from "@/shared/ui/DetailPage";
import NotFound from "@/shared/ui/NotFound";

export default function TourPage({ onClose }: { onClose?: () => void }) {
  const { name = "" } = useParams();
  const tour = getTourById(name);
  const content = tour ? <TourViewer tour={tour} /> : <NotFound />;
  return onClose ? (
    <Modal label={tour ? `Virtual tour: ${tour.name}` : "Tour not found"} onClose={onClose}>
      {content}
    </Modal>
  ) : (
    <DetailPage>
      {tour && <h1 className="visually-hidden">Virtual tour: {tour.name}</h1>}
      {content}
    </DetailPage>
  );
}
