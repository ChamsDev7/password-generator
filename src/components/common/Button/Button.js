import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

/**
 * A generic button component.
 * 
 * @component
 * @example
 * const handleClick = () => {
 *   console.log('Button clicked!');
 * };
 * 
 * return (
 *   <Button onClick={handleClick} className="my-button">
 *     Click Me
 *   </Button>
 * );
 */
const Button = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  /** Button text or elements to be displayed */
  children: PropTypes.node.isRequired,
  /** Function to be called on button click */
  onClick: PropTypes.func,
  /** Additional class names for styling */
  className: PropTypes.string,
  /** Button type (e.g., 'button', 'submit', 'reset') */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;