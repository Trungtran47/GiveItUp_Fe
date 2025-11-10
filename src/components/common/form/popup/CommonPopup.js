"use client";
import { Modal } from "antd";
import IcClose from "@/assets/icons/ic-close";
import { useEffect, useState } from "react";
import EventRegister, {
  EVENT_SHOW_POPUP2,
  EVENT_SHOW_POPUP,
  FIRST_POPUP,
  POPUP_CREATE_CATEGORY,
  POPUP_CONFIRM,
  POPUP_CREATE_AUTHOR,
  POPUP_TEXT_TYPE,
} from "@/utils/EventRegister";
import IconButton from "@/components/common/button/icon-button/IconButton";
import styles from "./CommonPopup.module.scss";
import PopupName from "@/components/common/form/popup/popup_name";
import CreateCategoryPopup from "@/containers/admin/category/components/CreateCategoryPopup";
import NotificationConfirm from "@/components/common/form/popup/notification_confirm";
import PopupCreateAuthor from "@/containers/users/profile/components/info/PopupCreateAuthor";
import TextPopup from "@/components/common/form/popup/TextPopup";

function CommonPopup(props) {
  let zIndex = props?._key == FIRST_POPUP ? 1050 : 1052;
  const [visible, showVisible] = useState(false);
  const [type, setType] = useState(null);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    let eventName =
      props?._key == FIRST_POPUP ? EVENT_SHOW_POPUP : EVENT_SHOW_POPUP2;
    console.log("CommonPopup mounted, listening:", eventName);
    const reloadEvent = EventRegister.on(eventName, (params) => {
      showVisible(false);
      setTimeout(() => {
        if (params) {
          setType(params.type);
          showVisible(params.open || true);
          setPayload(params?.payload);
        }
      }, 100);
    });
    return () => {
      EventRegister.off(reloadEvent);
    };
  }, []);

  const hiddenPopup = (e) => {
    if (
      type === PopupName.POPUP_CHOSE_BRANCH ||
      type === PopupName.POPUP_PASS_ORDER ||
      type === PopupName.POPUP_REFUND ||
      type === PopupName.POPUP_CONFIRM ||
      type === PopupName.POPUP_WARNING
    ) {
      return;
    }
    if (e.target.id === "commonPopup") {
      showVisible(false);
      if (payload?.onClickOutSide) {
        payload?.onClickOutSide();
      }
      if (payload?.backdropCallback) {
        payload.backdropCallback();
      }
    }
  };

  const onClickHiddenPopup = () => {
    payload?.close && payload?.close();
    showVisible(false);
  };

  const hiddenPopupControl = () => {
    showVisible(false);
    if (payload?.backdropCallback) {
      payload.backdropCallback();
    }
  };

  const getType = () => {
    switch (type) {
      case POPUP_TEXT_TYPE:
        return <TextPopup payload={payload} showVisible={hiddenPopupControl} />;
      case POPUP_CONFIRM:
        return (
          <NotificationConfirm
            payload={payload}
            showVisible={hiddenPopupControl}
          />
        );
      case POPUP_CREATE_CATEGORY:
        return (
          <CreateCategoryPopup
            payload={payload}
            showVisible={hiddenPopupControl}
          />
        );
      case POPUP_CREATE_AUTHOR:
        return (
          <PopupCreateAuthor
            payload={payload}
            showVisible={hiddenPopupControl}
          />
        );

      default:
    }
  };

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      open={visible}
      onCancel={(e) => {
        if (payload?.isClickOutside ?? true) hiddenPopup(e);
      }}
      footer={null}
      title={null}
      closable={false}
      centered
      maskClosable={payload?.isClickOutside ?? true}
      styles={{
        body: {
          padding: 0,
          borderRadius: 0,
          overflow: "visible",
        },
      }}
      style={{
        padding: 0,
        borderRadius: 0,
        width: "auto",
      }}
      width="auto"
      zIndex={zIndex}
    >
      <div className={styles.PopupContainer}>
        <div className={styles.PopupTitle}>
          <div className={styles.Title}>
            {payload?.title ?? payload?.data?.title}
          </div>
          <div className={styles.IconRight} onClick={onClickHiddenPopup}>
            <IconButton>
              <IcClose color="#000" size={22} />
            </IconButton>
          </div>
        </div>
        <div className={styles.notificationPopup}>{getType() ?? <></>}</div>
      </div>
    </Modal>
  );
}

export default CommonPopup;
