import { Avatar, Tooltip } from "@mui/material";
import Link from "next/link";

function GuestUserIcon() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
      <Link href="/signup" aria-label="Sign Up / Sign In">
        <Tooltip title="SignUp / SignIn">
          <Avatar />
        </Tooltip>
      </Link>
    </div>
  );
}

export default GuestUserIcon;
