import React from 'react';
import Button from '@material-ui/core/Button';

export function MyButton({ children, style, ...props }){
    return (
        <Button variant="contained" color="secondary" style={{...styles.button, ...style}} {...props}>
            {children}
        </Button>
    )
}
export function MyLink({ children, style,...props }){
    return (
        <Button color="secondary"  {...props} style={{...styles.link, ...style}}>
            {children}
        </Button>
    )
}
const styles = {
    button: {
        color: 'white',
        textTransform: 'none'
    }, 
    link: {
        textTransform: 'none'
    }
}