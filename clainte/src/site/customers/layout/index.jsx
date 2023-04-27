import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";
import CartMenu from "./CartMenu";
import LayoutProvider from "./LayoutContext";
import AccountMenu from "./AccountMenu";
import AccountDialog from "./AccountDialog";
import { useDispatch, useSelector } from "react-redux";
import { useGetWishlistQuery } from "../../../features/services/wishlistApiSlice";
import { setWishlist } from "../../../features/services/wishlistReducer";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import NavBar from "./NavBar";

function CustomerLayout({ children }) {
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
        <AccountDialog isAuthenticated={!!user} />
        <AccountMenu isAuthenticated={!!user} />
        <AppBar isAuthenticated={!!user} />
        <NavBar isAuthenticated={!!user} />
      </LayoutProvider>
      {children}
      <CartMenu isAuthenticated={!!user} />
      <Footer isAuthenticated={!!user} />
    </main>
  );
}

export default CustomerLayout;
