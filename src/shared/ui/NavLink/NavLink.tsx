import { ReactNode } from "react";

import styles from "./NavLink.module.scss";

function NavLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a className={styles["nav-link"]} href={href}>
      {children}
    </a>
  );
}

export default NavLink;
