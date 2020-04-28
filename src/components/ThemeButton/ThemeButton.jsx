import React from 'react';
import styled from "styled-components"
import useDarkMode from 'use-dark-mode';

const DarkModeToggleContainer = styled.div`
  display: flex;
  margin-left: auto;
  padding-right: 1.5rem;
  & > button {
    font-size: 1.2em;
    background: none;
    border: none;
    color: #ffe600;
    cursor: pointer;
    transition: color 0.3s ease;
    &:last-child {
      color: #666;
    }

    &:focus {
      outline: none;
    }
  }
`

const ToggleControl = styled.div`
  position: relative;
  width: 58px;
  height: 24px;
  padding: 0 4px;
  display: flex;
  align-items: center;
`

const DmcCheck = styled.input`
  width: 50px;
  height: 26px;
  background: #555;
  position: absolute;
  border-radius: 12px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  vertical-align: 2px;
  outline: none;

  &:checked + label {
    left: 29px;
  }

  &:focus-visible {
    outline: solid 2px white;
  }

  & + label {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: all 0.3s ease;
    cursor: pointer;
    position: absolute;
    left: 5px;
    background: #fff;
    background-color: #f6f6f6;
    z-index: 100;
  }
`

const Icon = styled.span`
  position: absolute;
  z-index: 50;
  left: ${(props) => props.left || 'inherit'};
  right: ${(props) => props.right || 'inherit'};
  cursor: pointer;
`

const Toggle = ({ darkMode, checked, onChange }) => (
  <ToggleControl className="toggle-control">
    <Icon onClick={darkMode.disable} left="8px">☀</Icon>
    <DmcCheck
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id="dmcheck"
    />
    <label htmlFor="dmcheck" />
    <Icon onClick={darkMode.enable} right="8px">☾</Icon>
  </ToggleControl>
);

const DarkModeToggle = ({ onChange }) => {
  const darkMode = useDarkMode(true, {
    onChange
  });

  return (
    <DarkModeToggleContainer>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} darkMode={darkMode} />
    </DarkModeToggleContainer>
  );
};

export default DarkModeToggle;
