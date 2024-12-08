import React, { useState } from "react";
import { Nav, Stack } from "react-bootstrap";
import { List, House, Gear, BoxArrowRight } from "react-bootstrap-icons";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.toggle} onClick={() => setCollapsed(!collapsed)}>
        <List size={30} />
      </div>
      <Nav className="flex-column">
        <Nav.Link href="#" className={styles.link}>
          <Stack direction="horizontal" gap={2}>
            <House /> {collapsed ? "" : "Dashboard"}
          </Stack>
        </Nav.Link>
        <Nav.Link href="#" className={styles.link}>
          <Stack direction="horizontal" gap={2}>
            <Gear /> {collapsed ? "" : "Settings"}
          </Stack>
        </Nav.Link>
        <Nav.Link href="#" className={styles.link}>
          {" "}
          <Stack direction="horizontal" gap={2}>
            <BoxArrowRight /> {collapsed ? "" : "Log Out"}
          </Stack>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
