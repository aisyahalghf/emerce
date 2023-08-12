import {
  Avatar,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const Navbar = () => {
  const [user, setUser] = useState({});

  const handleLogout = async () => {
    await signOut(auth);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const renderNavbar = () => {
    if (user?.email) {
      return (
        <div className=" flex justify-center gap-5">
          <Icon className=" text-4xl " icon="ic:round-shopping-cart" />
          <Menu>
            <Tooltip label={user?.email} fontSize="xs">
              <MenuButton>
                <Avatar size="sm" />
              </MenuButton>
            </Tooltip>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      );
    } else {
      return (
        <div className=" flex justify-center gap-3">
          <div>
            <Link to={"/register"}>
              <Button variant={["ghost", "solid"]}>Register</Button>
            </Link>
          </div>
          <div>
            <Link to={"/login"}>
              <Button variant={["ghost", "solid"]}>Login</Button>
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <nav className="shadow shadow-slate-200 bg-[#D0B8A8]  sticky top-0 z-10 ">
        <div className=" container mx-auto flex flex-wrap items-center justify-between h-24 p-3 md:p-2 lg:0">
          <Link to="/">
            <span className="self-center text-3xl font-extrabold whitespace-nowrap ">
              emerce
            </span>
          </Link>
          {renderNavbar()}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
