import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartMenu from "./CartMenu";
import LayoutProvider from "./LayoutContext";
import AccountMenu from "./AccountMenu";
import AccountDialog from "./AccountDialog";
import { useDispatch, useSelector } from "react-redux";
import { useGetWishlistQuery } from "../../../features/services/wishlistApiSlice";
import { setWishlist } from "../../../features/services/wishlistReducer";
import { selectCurrentUser } from "../../../features/auth/authSlice";

function Customer({ children }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { data: fetchedWishlist, isFetching: isFetchingWishlist } =
    useGetWishlistQuery();

  useEffect(() => {
    user &&
      !isFetchingWishlist &&
      dispatch(setWishlist({ products: fetchedWishlist }));
  }, [dispatch, fetchedWishlist, isFetchingWishlist, user]);

  return (
    <main>
      <LayoutProvider>
        <AccountDialog />
        <AccountMenu />
        <Navbar />
      </LayoutProvider>
      {children}
      <CartMenu />
      <Footer />
    </main>
  );
}

export default Customer;
