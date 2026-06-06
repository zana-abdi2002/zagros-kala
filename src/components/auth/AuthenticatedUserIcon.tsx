"use client";

import { Avatar } from "@mui/material";
import UserSettingsMenu from "./UserSettingsMenu";

function AuthenticatedUserIcon() {
  return (
    <UserSettingsMenu>
      <Avatar />
    </UserSettingsMenu>
  );
}

export default AuthenticatedUserIcon;
