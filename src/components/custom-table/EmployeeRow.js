import React from "react";
import TextLink from "../common/text-common/text-link/TextLink";
import Text from "../common/text-common/text/Text";
import PropTypes from "prop-types";

function EmployeeRow(props) {
    const { name, code, width } = props;
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: width }}>
            <TextLink>{code}</TextLink>
            <Text>{name}</Text>
        </div>
    );
}

EmployeeRow.propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
};

export default EmployeeRow;
