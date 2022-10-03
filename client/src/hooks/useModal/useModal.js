import { useState } from "react";

function useModal(){
    const [modalOpen, setModalOpen] = useState(false);

    function openModal() {
        setModalOpen(true);
      }
    
      function closeModal() {
        setModalOpen(false)
      }

      return [modalOpen, openModal, closeModal]
}

export default useModal;