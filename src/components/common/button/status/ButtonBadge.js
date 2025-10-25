import { Button } from "@mui/material";
import PropTypes from "prop-types";
import Text from "../../text-common/text/Text";
import { CommonStyles } from "utils/CommonStyles";

const ButtonBadge = (props) => {
    const {
        title = "",
        status,
        dataStatus = [],
        textColor = CommonStyles.white,
        textSize = CommonStyles.fontSizeTiny,
        style,
    } = props;

    const itemStatus = dataStatus?.find((item) => item.key == status);

    return (
        <Button
            sx={{
                borderRadius: "8px",
                boxShadow: "none",
                backgroundColor: itemStatus?.color,
                textTransform: "none",
                minWidth: "68px",
                minHeight: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                    backgroundColor: itemStatus?.color,
                    boxShadow:  "unset",
                    cursor: "default",
                },
                ...style,
            }}
        >
            <Text
                style={{
                    color: textColor,
                    fontSize: textSize,
                    fontWeight: "500",
                }}
            >
                {title || itemStatus?.label}
            </Text>
        </Button>
    );
};

ButtonBadge.propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    status: PropTypes.number,
    dataStatus: PropTypes.array,
    textColor: PropTypes.string,
    textSize: PropTypes.string,
};

export default ButtonBadge;
