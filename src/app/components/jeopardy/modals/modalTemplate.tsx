const Modal = ({
    isOpen,
    onClose,
    children
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#000080] border-2 border-[#FFCC00] rounded-lg p-6 max-w-2xl w-full"
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};


export default Modal;