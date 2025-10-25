import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import IcTableMenu from "../../../../../assets/icons/table/ic-table-menu";
import { CommonStyles } from "../../../../../utils/CommonStyles";
import Text from "../../text-common/text/Text";

const TableMenu = ({
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
            minWidth: "140px",
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
            option?.onClickItem();
            handleClose();
        }
    };
    useEffect(() => {
        if (disabled && anchorEl) {
            handleClose();
        }
    }, [disabled, anchorEl]);

    return (
        <>
            <IconButton
                sx={{
                    backgroundColor: "#fff",
                    width: "36px",
                    height: "36px",
                    border: `1px solid ${CommonStyles.mainColor}`,
                    borderRadius: "8px",
                }}
                aria-label="menu"
                onClick={handleClick}
            >
                <IcTableMenu />
            </IconButton>
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

export default TableMenu;
