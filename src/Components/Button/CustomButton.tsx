import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import './CustomAnswerButton.css';

export interface AnswerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string,
  className: string,
  handleClick: Function;  
}

function CustomButton(props: AnswerButtonProps): JSX.Element {
  return <button className={"menu-button " + props.className} onClick={()=>props.handleClick()}>{props.name}</button>;
}

export default CustomButton;