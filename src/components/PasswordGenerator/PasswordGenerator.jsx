import { useState, useCallback } from "react";
import { Tooltip } from "react-tooltip";
import {
  LOWERCASE_CHARS,
  NUMBER_CHARS,
  SYMBOL_CHARS,
  UPPERCASE_CHARS,
} from "../../constants";
import Button from "../common/Button";
import Input from "../common/Input";
import "./PasswordGenerator.scss";

/**
 * PasswordGenerator component for generating passwords.
 *
 * @returns {JSX.Element} PasswordGenerator component.
 */
const PasswordGenerator = () => {
  const [length, setLength] = useState(10);
  const [includeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");
  const [, setTooltipVisible] = useState(false);

  // Function to generate password
  const generatePassword = useCallback(() => {
    let characterSet = LOWERCASE_CHARS; // Lowercase is always included
    if (includeUppercase) characterSet += UPPERCASE_CHARS;
    if (includeNumbers) characterSet += NUMBER_CHARS;
    if (includeSymbols) characterSet += SYMBOL_CHARS;

    // Generate the password
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      generatedPassword += characterSet[randomIndex];
    }

    setPassword(generatedPassword);
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  // Function to handle checkbox changes
  const handleCheckboxChange = useCallback((e) => {
    const { name, checked } = e.target;

    switch (name) {
      case "includeUppercase":
        setIncludeUppercase(checked);
        break;
      case "includeNumbers":
        setIncludeNumbers(checked);
        break;
      case "includeSymbols":
        setIncludeSymbols(checked);
        break;
      default:
        break;
    }
  }, []);

  const handleCopy = () => {
    // Copy to clipboard logic
    navigator.clipboard.writeText(password);

    // Show tooltip with "Copied" message
    setTooltipText("Copied!");
    setTooltipVisible(true);

    // Hide tooltip after 2 seconds
    setTimeout(() => {
      setTooltipVisible(false);
      setTooltipText("Copy to clipboard");
    }, 2000);
  };

  return (
    <div className="password-generator">
      <div className="password-container">
        <Input
          type="text"
          value={password}
          className="password-input"
          readOnly
        />
        <Button
          className="copy-button my-anchor-element"
          onClick={handleCopy}
          disabled={!password}
        >
          <i className="fas fa-copy"></i>
        </Button>
        {password && (
          <Tooltip anchorSelect=".my-anchor-element" place="top">
            {tooltipText}
          </Tooltip>
        )}
      </div>
      <div className="character-length">
        <h4>Character length {length}</h4>
      </div>
      <div className="length-slider-container">
        <Input
          type="range"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10))}
          min="1"
          max="20"
          className="length-slider"
        />
      </div>
      <div className="options">
        <label>
          <Input
            type="checkbox"
            name="includeLowercase"
            checked={includeLowercase}
            onChange={handleCheckboxChange}
          />
          Include Lowercase
        </label>
        <label>
          <Input
            type="checkbox"
            name="includeUppercase"
            checked={includeUppercase}
            onChange={handleCheckboxChange}
          />
          Include Uppercase
        </label>
        <label>
          <Input
            type="checkbox"
            name="includeNumbers"
            checked={includeNumbers}
            onChange={handleCheckboxChange}
          />
          Include Numbers
        </label>
        <label>
          <Input
            type="checkbox"
            name="includeSymbols"
            checked={includeSymbols}
            onChange={handleCheckboxChange}
          />
          Include Symbols
        </label>
      </div>
      <Button className="generate-button" onClick={generatePassword}>
        Generate
      </Button>
    </div>
  );
};

export default PasswordGenerator;
