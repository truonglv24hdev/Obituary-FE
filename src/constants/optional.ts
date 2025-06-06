import { createElement } from "react";
import { IconBook, IconQR } from "@/components/icons";

export const addons = [
  {
    id:"book",
    price: 60,
    title: "Printable hard cover memorial book",
    icon: () => createElement(IconBook, { width: 40, height: 40 }),
    payment: "Add to payment"
  },
  {
    id:"qr",
    price: 30,
    title: "QR Code plate",
    icon: () => createElement(IconQR, { width: 40, height: 40 }),
    payment: "Add to payment"
  },
];
