import { useCallback, useState } from "react";
import HackathonFaqModal from "./HackathonFaqModal";

export default function HackathonFaqButton({
  className = "yellow-button w-button",
  children,
  ariaLabel = "Read frequently asked questions",
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <button type="button" className={className} aria-label={ariaLabel} onClick={openModal}>
        {children}
      </button>

      {modalOpen && <HackathonFaqModal onClose={closeModal} />}
    </>
  );
}
