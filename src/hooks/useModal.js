import { useState, useEffect } from "react";

export default function useModal(refModal, refToggleButton) {
  const [showWatchListFilters, setShowWatchListFilters] = useState(false);

  useEffect(() => {
    const modal = refModal.current;
    const toggleButton = refToggleButton.current;

    const toggle = () => {
      setShowWatchListFilters((prev) => {
        if (!prev) {
          document.addEventListener("click", handleOutsideClick, false);
        } else {
          document.removeEventListener("click", handleOutsideClick, false);
        }
        return !prev;
      });
    };

    if (toggleButton !== null) {
      toggleButton.addEventListener("click", toggle);
    }

    const handleOutsideClick = (e) => {
      if (modal !== null && toggleButton !== null) {
        if (!modal.contains(e.target) && !toggleButton.contains(e.target)) {
          toggle();
        }
      }
    };

    return () => {
      if (toggleButton !== null) {
        toggleButton.removeEventListener("click", toggle);
        document.removeEventListener("click", handleOutsideClick, false);
      }
    };
  }, [refModal, refToggleButton]);

  return [showWatchListFilters];
}
