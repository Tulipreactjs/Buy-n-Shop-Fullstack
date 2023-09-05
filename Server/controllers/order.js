import Order from "../models/order";

//create order

export const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingDetails,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order item");
    } else {
      const order = new Order({
        user: req.user.id,
        orderItems,
        shippingDetails,
        shippingPrice,
        taxPrice,
        paymentMethod,
        totalPrice,
        isPaid: paymentMethod === "paypal" ? true : false,
        paidAt: paymentMethod === "paypal" ? Date.now : "",
        status: paymentMethod === "paypal" ? 1 : 0,
      });
      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get user Orders
export const getUserOrders = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user.id }).sort({ _id: -1 });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

//admin shop order history

export const getAllorders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
