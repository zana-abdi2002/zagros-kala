import UserIcon from "./auth/UserIcon";
import CartIcon from "./ui/CartIcon";

function Navbar() {
  return (
    <div className="flex flex-row items-center justify-between">
      <p>menu</p>

      <p>Logo</p>

      <div className="flex items-center">
        <CartIcon />
        <UserIcon />
      </div>
    </div>
  );
}

export default Navbar;
