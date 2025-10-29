import { useEffect, useRef, useState } from "react";
import styles from "./CommonPopup.module.scss";

function NotificationCommonPopup(props) {
  const { payload, className, header, body, footer, handleClose } = props;
  const refParent = useRef(false);
  const headerRef = useRef(false);
  const bodyRef = useRef(false);
  const footerRef = useRef(false);
  const [maxBodyHeight, setMaxBodyHeight] = useState(0);

  useEffect(() => {
    const headerHeight = headerRef.current.clientHeight;
    const footerHeight = footerRef.current.clientHeight;
    setTimeout(() => {
      let marginTop = 56;
      if (window.innerWidth < 576) {
        marginTop = 0;
      }
      const maxHeight =
        window.innerHeight - (headerHeight + footerHeight + marginTop);
      setMaxBodyHeight(maxHeight);
    }, 0);
  }, []);

  return (
    <form
      className={`${styles["notification-popup"]} ${className}`}
      ref={refParent}
    >
      {!!header && (
        <div className="notification-popup-header w-100" ref={headerRef}>
          <div className="notification-popup-header-title bases__position--relative">
            {/* {typeof header === 'function' ? (
                            header()
                        ) : (
                            <span className="title">{payload?.title ?? ''}</span>
                        )}
                        {payload?.isShowBtnClose && (
                            <ClosePopupBtn
                                className="bases__position--absolute bases__right--0 bases__top--0 close-btn-icon"
                                onClick={() => handleClose()}
                            />
                        )} */}
          </div>
        </div>
      )}

      {!!body && (
        <div
          className="notification-popup-body "
          ref={bodyRef}
          style={{ maxHeight: maxBodyHeight }}
        >
          {body()}
        </div>
      )}

      {!!footer && (
        <div
          className="notification-popup-footer"
          style={{ textAlign: "center", marginTop: 20 }}
          ref={footerRef}
        >
          {footer()}
        </div>
      )}
    </form>
  );
}

export default NotificationCommonPopup;
