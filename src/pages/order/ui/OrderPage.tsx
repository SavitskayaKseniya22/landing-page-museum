import { TicketOrder } from "@/features/book-tickets";
import Modal from "@/shared/ui/Modal";
import DetailPage from "@/shared/ui/DetailPage";
import { useId } from "react";

export default function OrderPage({ onClose }: { onClose?: () => void }) {
  const titleId = useId();
  return onClose ? (
    <Modal label="Book tickets" labelledBy={titleId} onClose={onClose}>
      <TicketOrder titleId={titleId} />
    </Modal>
  ) : (
    <DetailPage>
      <TicketOrder headingLevel={1} titleId={titleId} />
    </DetailPage>
  );
}
