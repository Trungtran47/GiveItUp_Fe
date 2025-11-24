"use client";

import IcLogo from "@spo/assets/images/logo/logo.png";
import Image from "next/image";
import styles from "./Header.module.scss";

const Logo = () => {
  // const changeLang = (shortKey) => {
  //     const locale = shortKey ?? 'vi-VN';

  //     Cookies.set('NEXT_LOCALE', locale, { expires: 365, sameSite: 'lax' });

  //     dispatch(actions.switchLanguage(locale));

  //     router.replace(pathname);
  // };
  return (
    <div className={styles.container_top}>
      <Image src={IcLogo} alt="Logo" width={225} height={40} />
      {/* <button onClick={() => changeLang(Constants.KEY_lANG.VI.VALUE)}></button> */}
    </div>
  );
};

export default Logo;
