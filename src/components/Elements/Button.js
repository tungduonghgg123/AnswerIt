import React from 'react';
import Button from '@material-ui/core/Button';

export function MyButton({ children, style, ...props }){
    return (
        <Button variant="contained" color="secondary" style={{...styles.button, ...style}} {...props}>
            {children}
        </Button>
    )
}
export function MyLink({ children, ...props }){
    return (
        <Button color="secondary"  {...props}>
            {children}
        </Button>
    )
}
const styles = {
    button: {
        color: 'white',
        textTransform: 'none'
    }
}