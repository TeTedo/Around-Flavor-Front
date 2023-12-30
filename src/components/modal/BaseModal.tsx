import React from "react";
import { useRecoilState } from "recoil";

// export const BaseModal = () => {
//   const [modal, setModal] = useRecoilState(modalState);

//   if (!modal.isOpen) return;

//   const modalCloseHandler = (clicked: React.MouseEvent) => {
//     if (clicked.target === clicked.currentTarget) {
//       setModal({ ...modal, isOpen: false });
//     }
//   };

//   return (
//     <ModalWrapper
//       style={modal.style}
//       onClick={(event) => modalCloseHandler(event)}
//     >
//       {modal.children}
//     </ModalWrapper>
//   );
// };
