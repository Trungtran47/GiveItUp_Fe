import React from 'react';
import { CommonStyles } from '../../../../../utils/CommonStyles';

const FooterGroupView  = (props)=>{
    return (
        <div style={{
            backgroundColor: CommonStyles.white,
            height: '52px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '20px',
            paddingLeft: '20px'

        }}>
           {props.children}
        </div>
    )
}

export default FooterGroupView;