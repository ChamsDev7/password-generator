import PropTypes from 'prop-types';
import './Input.scss';

/**
 * A generic input component.
 * 
 * @component
 * @example
 * const handleChange = (e) => {
 *   console.log(e.target.value);
 * };
 * 
 * return (
 *   <Input
 *     type="text"
 *     value={value}
 *     onChange={handleChange}
 *     placeholder="Enter text here"
 *     className="my-input"
 *   />
 * );
 */
const Input = ({ type = 'text', value, onChange, placeholder = '', className = '', ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${className}`}
      {...props}
    />
  );
};

Input.propTypes = {
  /** Type of input (e.g., 'text', 'password', 'email') */
  type: PropTypes.string,
  /** Input value */
  value: PropTypes.string,
  /** Function to handle input changes */
  onChange: PropTypes.func,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Additional class names for styling */
  className: PropTypes.string,
};

export default Input;