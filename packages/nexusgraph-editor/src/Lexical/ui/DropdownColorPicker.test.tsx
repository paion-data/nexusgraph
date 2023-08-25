 // Copyright 2023 Paion Data. All rights reserved.
 import { describe, expect } from '@jest/globals';
 import { render, screen } from '@testing-library/react';
 import React from 'react';
 import DropdownColorPicker from "./DropdownColorPicker"

 describe('Dropdown color picker DOM test', () => {
   test('When disabled is true, renders the specified disabled', () => {
     render(<DropdownColorPicker disabled={true} stopCloseOnClickSelf onChange={() => onchange } buttonClassName={''} color={''}/>);
    //  expect(screen.)
   });
 });