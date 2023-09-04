import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {name:string}

function Button(props: ButtonProps): JSX.Element {
  return <button className="menu-button">{props.name}</button>;
};

export default Button;