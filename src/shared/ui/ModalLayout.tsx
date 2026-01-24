'use client';
// 오버레이
// 트랩/닫기
// 레이아웃

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export const ModalLayout = ({ children, onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
