import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import './CustomButton.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string,
  className: string,
  handleClick: Function;  
}

function CustomButton(props: ButtonProps): JSX.Element {
  return <button className={"menu-button " + props.className} onClick={()=>props.handleClick()}>{props.name}</button>;
}

export default CustomButton;