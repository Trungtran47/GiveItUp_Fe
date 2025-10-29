/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-underscore-dangle */
import IconConfirm from "@/assets/icons/ic-confirm";
import PropTypes from "prop-types";
import { useState } from "react";
import { CommonStyles } from "@/utils/CommonStyles";
import LoadingButton from "@/components/common/button/loading/LoadingButton";
import HeadCommonPopup from "@/components/common/form/popup/component/HeadCommonPopup";
import NotificationCommonPopup from "@/components/common/form/popup/notification_common_popup";

function NotificationConfirm(props) {
  const { payload, showVisible } = props;
  const htmlParse = payload?.data?.message;

  function _renderHeader() {
    return (
      <HeadCommonPopup onHandleRight={onClosePopup} content={payload?.title} />
    );
  }
  function _renderComponentChildren() {
    return (
      <div className="flex flex-col items-center justify-center ">
        <span className="mt-2">
          <IconConfirm />
        </span>
        <p
          // chuyển qua tailwind css cho tôi
          className="text-popup mt-3 w-75 text-center text-[14px] font-semibold "
          dangerouslySetInnerHTML={{ __html: htmlParse }}
          style={{
            lineHeight: "18px",
          }}
        />
      </div>
    );
  }

  const onClosePopup = () => {
    showVisible(false);
  };
  const handleClose = () => {
    showVisible(false);
  };

  const [loading, setLoading] = useState(false);

  const onClickOk = () => {
    payload.isLoading ? closePopupIsloading() : closePopup();
  };

  const closePopupIsloading = () => {
    setLoading(true);
    payload?.callback({
      closeLoading,
    });
  };

  const closeLoading = () => {
    setLoading(false);
    showVisible(false);
  };
  const closePopup = () => {
    if (payload?.callback) {
      payload?.callback();
    }
    showVisible(false);
  };
  function _renderFooter() {
    return (
      <div
        style={{
          display: "flex",
          gap: 10,
          margin: 16,
          justifyContent: "center",
        }}
      >
        <LoadingButton
          onClick={handleClose}
          loading={loading}
          title={payload?.closeButtonMessage ?? "Đóng"}
          backgroundColor={CommonStyles.grayLight400}
          textColor={CommonStyles.neutral900}
        ></LoadingButton>
        <LoadingButton
          onClick={onClickOk}
          typeColor={CommonStyles.mainColor}
          loading={loading}
          title="Đồng ý"
        ></LoadingButton>
      </div>
    );
  }
  return (
    <NotificationCommonPopup
      className="notification-confirm"
      payload={payload}
      showVisible={showVisible}
      handleClose={handleClose}
      header={_renderHeader}
      body={_renderComponentChildren}
      footer={_renderFooter}
    />
  );
}
NotificationConfirm.propTypes = {
  payload: PropTypes.shape({
    className: PropTypes.string,
    isShowBtnClose: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    closeButtonMessage: PropTypes.string,
    confirmButtonMessage: PropTypes.string,
    onClickOk: PropTypes.func,
  }),
  showVisible: PropTypes.func,
};
NotificationConfirm.defaultProps = {
  payload: {
    className: "",
    isShowBtnClose: true,
    title: "",
    message: "",
    closeButtonMessage: "",
    confirmButtonMessage: "",
    onClickOk: null,
  },
  showVisible: null,
};

export default NotificationConfirm;
