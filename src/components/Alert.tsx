import { ReactNode } from "react";
interface AlertProps {
  children: ReactNode;
  onClose?: () => void;
}

function Alert({ children, onClose }: AlertProps) {
  return (
    <div className="alert alert-primary alert-dismissible">
      {children}
      <button
        onClick={onClose}
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default Alert;
