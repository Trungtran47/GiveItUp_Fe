"use client";
import React from "react";
import ButtonCommon from "@/components/common/button/ButtonCommon";
function TextPopup(props) {
  const { payload, showVisible } = props;
  const handleClick = () => {
    if (payload?.fallback) {
      payload?.fallback();
    }
    showVisible(false);
  };
  return (
    <div className="p-[10px]">
      {/* {config?.showTopTitle && (
                <div className="main-title text-center h5">{config.topTitle}</div>
            )} */}
      <div
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "normal",
        }}
      >
        {typeof payload?.message === "string"
          ? payload.message
          : JSON.stringify(payload?.message, null, 2)}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <div style={{ margin: "auto" }}>
          <ButtonCommon
            typeColor="border-green"
            onClick={() => handleClick()}
            title={payload?.buttonTitle ?? "Đóng"}
          >
            Đóng
          </ButtonCommon>
        </div>
      </div>
    </div>
  );
}
TextPopup.defaultProps = {
  config: {
    topTitle: "Thông báo",
    showTopTitle: true,
  },
};
export default TextPopup;
