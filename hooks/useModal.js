import { useEffect, useRef, useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const contRef = useRef(null);
  const clickRef = useRef(null);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const outSideClick = (e) => {
    if (
      contRef.current &&
      clickRef.current &&
      !contRef.current.contains(e.target) &&
      !clickRef.current.contains(e.target)
    ) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", outSideClick);
    return () => {
      window.removeEventListener("click", outSideClick);
    };
  }, [showModal]);

  return {
    clickRef,
    contRef,
    showModal,
    handleOpen,
    handleClose,
    toggleModal,
  };
};

export default useModal;
