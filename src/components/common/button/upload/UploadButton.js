import PropTypes from "prop-types";
import React from "react";
import IcUploadFile from "../../../../../assets/icons/ic-upload-file";
import useTrans from "../../../../../hooks/use-trans";
import { CommonStyles } from "../../../../../utils/CommonStyles";
import ButtonCommon from "../ButtonCommon";

const UploadButton = (props) => {
    const { t } = useTrans();
    const {
        title = t("upload_file"),
        onClick,
        type = "button",
        disabled = false,
        sx = {},
        endIcon,
        value
    } = props;
    return (
        <ButtonCommon
            value={value}
            textColor={CommonStyles.white}
            startIcon={<IcUploadFile />}
            endIcon={endIcon}
            title={title}
            onClick={onClick}
            type={type}
            disabled={disabled}
            sx={sx}
        />
    );
};

UploadButton.prototype = {
    title : PropTypes.string,
    onClick : PropTypes.func
}

export default UploadButton;
