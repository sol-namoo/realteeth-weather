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
    <div className="">
      <div>
        <button onClick={onClose}>close</button>
      </div>
      {children}
    </div>
  );
};
