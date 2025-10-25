import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MenuButton from "../menu/MenuButton";
import IconArrowDown from "assets/icons/ic-arrow-down";
import { CommonStyles } from "utils/CommonStyles";
import Constants from "utils/Constants";

const ButtonStatus = (props) => {
    const {
        onChangeApproved = () => {},
        title = "",
        status,
        dataStatus = [],
        color = "",
        isShowDropdown = true,
        isProcess,
        style,
        sx
    } = props;

    const newDataStatus = dataStatus?.map((item) => ({
        ...item,
        onClickItem: () => onChangeApproved(item),
    }));

    const dataMenu = newDataStatus?.filter((item) => item.key != status);

    const itemStatus = newDataStatus?.find((item) => item.key == status);

    const isButton = itemStatus?.isButton || !isShowDropdown;

    return (
        <MenuButton
            title={title || itemStatus?.label}
            endIcon={
                !isButton ? <IconArrowDown color={CommonStyles.white} /> : <></>
            }
            options={isButton ? [] : dataMenu}
            sx={{
                background: itemStatus?.color || color,
                display: "inline-flex",
                alignItems: "center",
                width: isProcess ? "120px" : "fit-content",
                height: "28px",
                marginLeft: isProcess && "-4px",
                padding: "4px 8px 4px 0",
                fontWeight: CommonStyles.fontMedium,
                whiteSpace: "nowrap",
                "&:hover": {
                    backgroundColor: itemStatus?.color || color,
                    boxShadow: isButton
                        ? "unset"
                        : "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
                    cursor: isButton ? "default" : "pointer",
                },
                ...style,
            }}
        />
    );
};

ButtonStatus.propTypes = {};

export default ButtonStatus;
