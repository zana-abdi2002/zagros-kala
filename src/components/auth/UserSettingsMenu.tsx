"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Settings } from "@mui/icons-material";
import CreditCard from "@mui/icons-material/CreditCard";
import Logout from "@mui/icons-material/Logout";
import {
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

function UserSettingsMenu({ children }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError(context) {
          alert(context.error.message);
        },
      },
    });
  };

  return (
    <div>
      <Tooltip title="Account Menu">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open}
          sx={{
            padding: 0,
          }}
        >
          {children}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 10,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <CreditCard fontSize="small" />
          </ListItemIcon>
          Billing
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleSignOut} sx={{ color: "red" }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "red" }} />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserSettingsMenu;
