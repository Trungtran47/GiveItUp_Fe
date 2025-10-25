import PropTypes from "prop-types";
import React from "react";
import IcDowloadFile from "../../../../../assets/icons/ic-export-file";
import useTrans from "../../../../../hooks/use-trans";
import { CommonStyles } from "../../../../../utils/CommonStyles";
import ButtonCommon from "../ButtonCommon";

const ExportButton = (props) => {
    const { t } = useTrans();
    const {
        title = t("export_file"),
        onClick,
        type = "button",
        disabled = false,
        sx = {},
        endIcon,
        value,
    } = props;
    return (
        <ButtonCommon
            value={value}
            textColor={CommonStyles.white}
            startIcon={<IcDowloadFile />}
            endIcon={endIcon}
            title={title}
            onClick={onClick}
            type={type}
            disabled={disabled}
            sx={sx}
        />
    );
};

ExportButton.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    sx: PropTypes.object,
    endIcon: PropTypes.node,
    value: PropTypes.any,
};

export default ExportButton;
