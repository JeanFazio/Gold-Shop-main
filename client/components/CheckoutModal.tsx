import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export function CheckoutModal({ isOpen, onClose, total }: CheckoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Compra</DialogTitle>
          <DialogDescription>
            Preencha seus dados para ser redirecionado ao checkout
          </DialogDescription>
        </DialogHeader>
        <CheckoutForm onClose={onClose} total={total} />
      </DialogContent>
    </Dialog>
  );
}
