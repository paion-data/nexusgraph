// Copyright 2023 Paion Data. All rights reserved.
import { describe, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import TextInput from "./TextInput";

describe('text input DOM test', () => {
  test('Placeholder defaults to an empty string', () => {
    render(<TextInput label='my input' value='text in input box' onChange={() => {}}/>);
    expect(screen.getByPlaceholderText('')).not.toBeNull
  });
});

