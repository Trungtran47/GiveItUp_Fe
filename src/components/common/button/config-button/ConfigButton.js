import { Divider, IconButton, Popover } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import IcMoreColumn from "@/assets/icons/ic-more-column";
import React, { Fragment } from "react";
export default function ConfigButton(props) {
  const { disabled = false } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    e.stopPropagation();
  };

  const openDropDown = Boolean(anchorEl);
  const id = openDropDown ? "simple-popover" : undefined;
  const renderItem = (item) => {
    switch (item?.type) {
      case "divider":
        return <Divider />;
      default:
        return (
          <MenuItem
            style={{
              minWidth: 130,
              gap: 15,
              paddingLeft: 5,
              paddingRight: 5,
              pointerEvents: item?.disable ? "none" : "fill",
              fontSize: 14,
            }}
            onClick={(e) => {
              !item?.disabled && item.onClick();
              e.stopPropagation();
              e.preventDefault();
              !item?.disabled && handleClose(e);
            }}
            disabled={item?.disabled}
            disableRipple
          >
            {item.icon}
            {item.title}
          </MenuItem>
        );
    }
  };
  return (
    <>
      <div>
        <IconButton disabled={disabled} onClick={handleClick}>
          <IcMoreColumn />
        </IconButton>
        {!!props?.menuList?.length && (
          <Popover
            id={id}
            open={openDropDown}
            anchorEl={anchorEl}
            onClose={handleClose}
            sx={{
              marginLeft: "0px",
              top: 5,
            }}
            disableScrollLock
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div
              style={{
                padding: 10,
                fontSize: 14,
              }}
            >
              {props?.menuList?.map((item, key) => {
                return <Fragment key={key}>{renderItem(item)}</Fragment>;
              })}
            </div>
          </Popover>
        )}
      </div>
    </>
  );
}
ConfigButton.defaultProps = {
  icon: <IcMoreColumn />,
  menuList: [],
};
