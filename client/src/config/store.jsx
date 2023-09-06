import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const Context = createContext();
let initialUser = "";
let initialCart = [];
let shippingData = {};
let paymentData = "";
export const StateContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [cartItems, setCartItems] = useState(initialCart);
  const [show, setShow] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(paymentData);
  const [shippingDetails, setShippingDetails] = useState(shippingData);
  console.log("cartItems", cartItems);

  //save payment method
  useEffect(() => {
    if (paymentMethod !== paymentData) {
      localStorage.setItem("paymentType", JSON.stringify(paymentMethod));
    }
  }, [paymentMethod]);

  //retrieve paymentMethod

  useEffect(() => {
    const getPaymentMethod = JSON.parse(localStorage.getItem("paymentType"));
    if (getPaymentMethod) {
      setPaymentMethod(getPaymentMethod);
    }
  }, []);

  //save shipping details
  useEffect(() => {
    if (shippingDetails !== shippingData) {
      localStorage.setItem("shippingInfo", JSON.stringify(shippingDetails));
    }
  }, [shippingDetails]);

  //retrieve shipping details

  useEffect(() => {
    const shipData = JSON.parse(localStorage.getItem("shippingInfo"));
    if (shipData) {
      setShippingDetails(shipData);
    }
  }, []);

  //save user to local storage
  useEffect(() => {
    if (currentUser !== initialUser) {
      localStorage.setItem("userinfo", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  //retrieve user from local storage
  useEffect(() => {
    const retrieveUser = JSON.parse(localStorage.getItem("userinfo"));
    if (retrieveUser) {
      setCurrentUser(retrieveUser);
    }
  }, []);

  //save cart to local storage
  useEffect(() => {
    if (cartItems !== initialCart) {
      localStorage.setItem("shoppingcart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  //retrieve cart from local storage
  useEffect(() => {
    const retrieveCart = JSON.parse(localStorage.getItem("shoppingcart"));
    if (retrieveCart) {
      setCartItems(retrieveCart);
    }
  }, []);

  //addtocart/increment qty

  const increaseCartQty = (id) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item._id === id._id) == null) {
        return [...currentItems, { ...id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item._id === id._id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQty = (id) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item._id === id._id).quantity === 1) {
        return currentItems.filter((item) => item._id !== id._id);
      } else {
        return currentItems.map((item) => {
          if (item._id === id._id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const deleteCartItems = (id) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item._id !== id);
    });
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const priceTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  //Logout User

  const logOut = () => {
    localStorage.removeItem("userinfo");
    location.replace("/");
    toast.success("Logged out successfully!");
  };

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
        logOut,
        increaseCartQty,
        decreaseCartQty,
        deleteCartItems,
        decreaseCartQty,
        cartItems,
        cartQuantity,
        priceTotal,
        show,
        setShow,
        shippingDetails,
        setShippingDetails,
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);
