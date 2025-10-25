import PropTypes from "prop-types";
import styles from './IconButton.module.scss'

const IconButton = ({
    style,
    onClick,
    children
}) => {
    return (
        <span
            onMouseDown={(e) => {
                e.preventDefault(); // Ngăn input bị focus lại
                e.stopPropagation(); // Ngăn sự kiện lan ra AutoComplete
            }}
            className={styles.iconButton}
            onClick={onClick}
            style={style}
        >
            {children}
        </span>
    );
};

IconButton.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.element.isRequired
};

export default IconButton;
