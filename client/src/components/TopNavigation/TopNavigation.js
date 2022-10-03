import React, { useState } from "react";
import {Link} from "react-router-dom"
import styles from "./TopNavigation.module.scss";
import { useModal } from "../../hooks";

import AuthenticationModal from "../Modal/AuthenticationModal/AuthenticationModal";

import { ReactComponent as Logo } from "../../assets/logo.svg";

function TopNavigation() {
  const [modalOpen, openModal, closeModal] = useModal();
  const [shouldShowLogin, setShouldShowLogin] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.navigationWrapper}>
          <Link to="/">
            <Logo className={styles.logo} />
          </Link>
          <div className={styles.navigationContainer}>
            <nav className={styles.navigation}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <p className={styles.navLink}>Our story</p>
                </li>
                <li className={styles.navItem}>
                  <p className={styles.navLink}>Membership</p>
                </li>
                <li className={styles.navItem}>
                  <p className={styles.navLink}>Write</p>
                </li>
                <li className={styles.navItem}>
                  <button
                    className={styles.signIn}
                    onClick={() => {
                      setShouldShowLogin(true);
                      openModal();
                    }}
                  >
                    Sign In
                  </button>
                </li>
              </ul>
            </nav>
            <button
              className={styles.navButton}
              onClick={() => {
                setShouldShowLogin(false);
                openModal();
              }}
            >
              Get started
            </button>
          </div>
          {modalOpen && (
            <AuthenticationModal
              shouldShowLogin={shouldShowLogin}
              isOpen={modalOpen}
              onRequestClose={closeModal}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default TopNavigation;
