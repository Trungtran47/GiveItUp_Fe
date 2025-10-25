import React from 'react';
import styles from './TextLink.module.scss';
import Text from '../text/Text';
import { Link } from '@mui/material';

function TextLink(props) {
    const { 
        style,
        onClick = () => {},
    } = props;

    return (
        <Text style={{...style}}>
            <Link
                className={`${styles.TextLink}`}
                onClick={onClick}
            >
                {props.children ?? props.children}
            </Link> 
        </Text>
    );
}

export default TextLink;
