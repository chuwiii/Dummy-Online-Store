import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://react-313a4-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!res.ok) throw new Error(`Could not fetch cart data.`);

      const data = await res.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          title: "  Error!",
          message: "Fetching cart data failed",
          status: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        title: "Sending...",
        message: "Sending cart data!",
        status: "pending...",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://react-313a4-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!res.ok) throw new Error("Sending cart data failed.");
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          title: "Success!",
          message: "Sent cart data successfully!",
          status: "success",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          title: "  Error!",
          message: "Sending cart data failed",
          status: "error",
        })
      );
    }
  };
};
