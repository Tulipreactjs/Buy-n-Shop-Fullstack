import { useState, useEffect } from "react";
import { PageLayout, Headings } from "../component";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import registerOptions from "../utils/formValidation";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { useStore } from "../config/store";
import { createOrder } from "../config/api";

export default function Checkout() {
  const {
    shippingDetails,
    setShippingDetails,
    paymentMethod,
    setPaymentMethod,
    currentUser,
    priceTotal,
  } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: shippingDetails.fullname || "",
      shippingAddress: shippingDetails.shippingAddress || "",
      phone: shippingDetails.phone || "",
      state: shippingDetails.state || "",
    },
  });

  useEffect(() => {
    document.title = "Checkout";
  });

  const paymentOptions = [{ name: "Cash" }, { name: "Paypal" }];
  const tax = 0.05;
  const calcTax = (tax * priceTotal).toFixed(2);
  const calcShippingFee = (priceTotal / 2) * tax;
  const shippingFee = priceTotal > 3500 ? 0 : calcShippingFee.toFixed(2);

  const total = (
    Number(priceTotal) +
    Number(calcTax) +
    Number(shippingFee)
  ).toFixed(2);
  return (
    <PageLayout>
      <Headings title="Checkout" />
    </PageLayout>
  );
}
