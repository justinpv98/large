import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import { useModal } from "../../hooks";

import cx from "classnames";

import TopNavigation from "../../components/TopNavigation/TopNavigation";
import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";

function Home() {
  const [modalOpen, openModal, closeModal] = useModal();

  return (
    <Fragment>
      <TopNavigation />
      <main className={styles.hero}>
        <div className={styles.heroContentWrapper}>
          <div className={styles.heroContent}>
            <h1 className={cx("display", styles.heading)}>Stay serious.</h1>
            <h2 className={styles.subheading}>
              Discover stories, thinking, and expertise from writers on any
              topic.
            </h2>
            <button onClick={openModal} className={styles.heroButton}>
              Start reading
            </button>
          </div>
        </div>
      </main>
      {modalOpen && (
        <AuthenticationModal
          shouldShowLogin={false}
          isOpen={modalOpen}
          onRequestClose={closeModal}
        />
      )}
    </Fragment>
  );
}

export default Home;
