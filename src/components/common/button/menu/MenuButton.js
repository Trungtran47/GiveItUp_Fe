import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { CommonStyles } from "../../../../../utils/CommonStyles";
import Text from "../../text-common/text/Text";
import ButtonCommon from "../ButtonCommon";

const MenuButton = ({
    title,
    onClick = () => {},
    disabled = false,
    options = [],
    startIcon,
    endIcon,
    sx,
}) => {
    const CustomMenu = styled(Menu)(({ theme }) => ({
        "& .MuiPaper-root": {
            borderRadius: CommonStyles.borderRadiusPopup,
            padding: "0 8px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            minWidth: '140px',
        },
    }));

    const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
        padding: "8px 8px",
        fontWeight: CommonStyles.fontMedium,
        color: "#0f172a",
        "&:hover": {
            backgroundColor: "#f3f4f6",
        },
    }));
    const [anchorEl, setAnchorEl] = useState(null);
    const memoOptions = useMemo(
        () => options?.map((o) => ({ ...o, value: o?.key })),
        [options]
    );
    const handleClick = (event) => {
        if (disabled) return;
        if (!memoOptions?.length) {
            onClick();
        } else {
            setAnchorEl(event.currentTarget); // Mở menu khi có options
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickItem = (option) => {
        if (option?.onClickItem) {
            option?.onClickItem()
            handleClose();
        }
    }
    useEffect(() => {
        if (disabled && anchorEl) {
            handleClose();
        }
    }, [disabled, anchorEl]);

    return (
        <>
            <ButtonCommon
                startIcon={startIcon}
                endIcon={endIcon}
                onClick={handleClick}
                title={title}
                disabled={disabled}
                sx={sx}
            />
            {!!memoOptions?.length && (
                <CustomMenu
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={handleClose}
                >
                    {memoOptions?.map((option, index) => (
                        <CustomMenuItem
                            key={index}
                            onClick={() => handleClickItem(option)}
                        >
                            {option.icon && (
                                <ListItemIcon>{option.icon}</ListItemIcon>
                            )}
                            <Text>{option.label}</Text>
                        </CustomMenuItem>
                    ))}
                </CustomMenu>
            )}
        </>
    );
};

export default MenuButton;
