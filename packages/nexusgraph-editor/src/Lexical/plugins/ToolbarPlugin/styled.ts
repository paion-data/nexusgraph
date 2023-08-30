// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";
import * as svgs from "../svgTool";
export const FontDropDown = styled.div`
  .dropdown {
    z-index: 5;
    display: block;
    position: absolute;
    box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    min-height: 40px;
    background-color: rgba(60, 60, 60, 0.9);

    .color-picker-wrapper {
      margin: 20px;

      .Input__wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
      }
      .Input__label {
        display: flex;
        flex: 1;
        color: white;
      }
      .Input__input {
        display: flex;
        flex: 2;
        border: 1px solid #999;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 16px;
        border-radius: 5px;
        min-width: 0;
        background-color: rgba(233, 239, 242, 0.2);
      }
    }

    .color-picker-basic-color {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 0;
      padding-top: 20px;
    }

    .color-picker-basic-color button {
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 16px;
      width: 16px;
      cursor: pointer;
      list-style-type: none;
    }

    .color-picker-basic-color button.active {
      box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
    }

    .color-picker-saturation {
      width: 100%;
      position: relative;
      margin-top: 15px;
      height: 150px;
      background-image: linear-gradient(transparent, black), linear-gradient(to right, white, transparent);
      user-select: none;
    }
    .color-picker-saturation_cursor {
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 15px #00000026;
      box-sizing: border-box;
      transform: translate(-10px, -10px);
    }
    .color-picker-hue {
      width: 100%;
      position: relative;
      margin-top: 15px;
      height: 12px;
      background-image: linear-gradient(
        to right,
        rgb(255, 0, 0),
        rgb(255, 255, 0),
        rgb(0, 255, 0),
        rgb(0, 255, 255),
        rgb(0, 0, 255),
        rgb(255, 0, 255),
        rgb(255, 0, 0)
      );
      user-select: none;
      border-radius: 12px;
    }

    .color-picker-hue_cursor {
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid #ffffff;
      border-radius: 50%;
      box-shadow: #0003 0 0 0 0.5px;
      box-sizing: border-box;
      transform: translate(-10px, -4px);
    }

    .color-picker-color {
      border: 1px solid #ccc;
      margin-top: 15px;
      width: 100%;
      height: 20px;
    }

    .fontsize-item {
      width: 50px !important;
    }

    .item {
      margin: 0 8px 0 8px;
      padding: 8px;
      color: #050505;
      cursor: pointer;
      line-height: 16px;
      font-size: 15px;
      display: flex;
      align-content: center;
      flex-direction: row;
      flex-shrink: 0;
      justify-content: space-between;
      background-color: transparent;
      border-radius: 8px;
      border: 0;
      width: 160px;

      &:first-child {
        margin-top: 8px;
      }

      &:last-child {
        margin-bottom: 8px;
      }

      &:hover {
        background-color: transparent;
        box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
      }

      span {
        &.text {
          display: flex;
          line-height: 20px;
          flex-grow: 1;
          color: white;
        }
      }

      i {
        &.icon {
          display: flex;
          width: 20px;
          height: 20px;
          user-select: none;
          margin-right: 12px;
          line-height: 16px;
          background-size: contain;
        }

        &.clear {
          background-image: url("${svgs.default.clear}");
        }

        &.left-align {
          background-image: url("${svgs.default.alignleft}");
        }

        &.center-align {
          background-image: url("${svgs.default.aligncenter}");
        }

        &.right-align {
          background-image: url("${svgs.default.alignright}");
        }

        &.justify-align {
          background-image: url("${svgs.default.alignjustify}");
        }

        &.indent {
          background-image: url("${svgs.default.indent}");
        }

        &.outdent {
          background-image: url("${svgs.default.outdent}");
        }
      }
    }
  }
`;
export const Dropdown = styled.div`
  z-index: 5;
  display: block;
  position: absolute;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  min-width: 100px;
  min-height: 40px;
  background-color: rgba(60, 60, 60, 0.9);

  .item {
    margin: 0 8px 0 8px;
    padding: 8px;
    color: #050505;
    cursor: pointer;
    line-height: 16px;
    font-size: 15px;
    display: flex;
    align-content: center;
    flex-direction: row;
    flex-shrink: 0;
    justify-content: space-between;
    background-color: transparent;
    border-radius: 8px;
    border: 0;
    min-width: 268px;

    &:first-child {
      margin-top: 8px;
    }

    &:last-child {
      margin-bottom: 8px;
    }

    &:hover {
      background-color: transparent;
      box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
    }

    span {
      &.icon {
        display: flex;
        width: 20px;
        height: 20px;
        user-select: none;
        margin-right: 12px;
        line-height: 16px;
        background-size: contain;
      }

      &.text {
        display: flex;
        line-height: 20px;
        flex-grow: 1;
        width: 200px;
        color: white;
      }

      &.paragraph {
        background-image: url("${svgs.default.paragraph}");
      }

      &.first-heading {
        background-image: url("${svgs.default.h1}");        }

      &.second-heading {
        background-image: url("${svgs.default.h2}");        }

      &.third-heading {
        background-image: url("${svgs.default.h3}");        }

      &.fourth-heading {
        background-image: url("${svgs.default.h4}");        }

      &.fifth-heading {
        background-image: url("${svgs.default.h5}");        }

      &.sixth-heading {
        background-image: url("${svgs.default.h6}");        }

      &.bullet-list {
        background-image: url("${svgs.default.ul}");        }

      &.numbered-list {
        background-image: url("${svgs.default.ol}");        }

      &.check-list {
        background-image: url("${svgs.default.checklist}");        }

      &.quote {
        background-image: url("${svgs.default.quote}");        }

      &.code {
        background-image: url("${svgs.default.code}");        }
  }
`;

export const Toolbar = styled.div`
  display: flex;
  margin-bottom: 1px;
  background: none;
  padding: 4px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  vertical-align: middle;
  overflow: auto;

  .divider {
    border: 0.1px solid;
    color: rgba(137, 225, 252, 0.1);
    background-color: transparent;
  }

  select {
    border: 0;
    display: flex;
    background: none;
    border-radius: 10px;
    padding: 8px;
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 70px;
    font-size: 14px;
    color: white;
    text-overflow: ellipsis;

    &.button {
      border: 0;
      display: flex;
      background: transparent;
      border-radius: 10px;
      padding: 8px;
      cursor: pointer;
      vertical-align: middle;

      &:hover:not([disabled]) {
        background-color: transparent;
        box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
        border: none;
      }

      &:disabled {
        cursor: not-allowed;

        i {
          opacity: 0.2;
        }
      }
    }

    &.code-language {
      text-transform: capitalize;
      width: 130px;
    }
  }

  button {
    &.button,
    &.toolbar-item {
      border: 0;
      display: flex;
      background: transparent;
      border-radius: 10px;
      padding: 8px;
      cursor: pointer;
      vertical-align: middle;

      &:hover:not([disabled]) {
        background-color: transparent;
        box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
      }

      &:disabled {
        cursor: not-allowed;

        i {
          opacity: 0.2;
        }
      }

      &.spaced {
        margin-right: 2px;
      }

      &.active {
        background-color: transparent;
        box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.7) !important;
        i {
          opacity: 1;
        }
      }

      span {
        &.text {
          display: flex;
          line-height: 20px;
          vertical-align: middle;
          font-size: 14px;
          color: white;
          text-overflow: ellipsis;
          width: 70px;
          overflow: hidden;
          height: 20px;
          text-align: left;
        }

        &.icon {
          color: red;
          display: flex;
          width: 20px;
          height: 20px;
          user-select: none;
          margin-right: 8px;
          line-height: 16px;
          background-size: contain;
        }

        &.block-type {
          background-size: contain;
          display: block;
          width: 18px;
          height: 18px;
          color: gray;
          margin-right: 10px;
        }

        &.paragraph {
          background-image: url("${svgs.default.paragraph}");
        }

        &.font-family {
          background-image: url("${svgs.default.fontfamily}");
        }

        &.dropdown-more {
          background-image: url("${svgs.default.addition}");
        }

        &.h1 {
          background-image: url("${svgs.default.h1}");
        }

        &.h2 {
          background-image: url("${svgs.default.h2}");
        }

        &.h3 {
          background-image: url("${svgs.default.h3}");
        }

        &.h4 {
          background-image: url("${svgs.default.h4}");
        }

        &.h5 {
          background-image: url("${svgs.default.h5}");
        }

        &.h6 {
          background-image: url("${svgs.default.h6}");
        }

        &.bullet {
          background-image: url("${svgs.default.ul}");
        }

        &.number {
          background-image: url("${svgs.default.ol}");
        }

        &.check {
          background-image: url("${svgs.default.checklist}");
        }

        &.quote {
          background-image: url("${svgs.default.quote}");
        }

        &.code {
          background-image: url("${svgs.default.code}");
        }

        &.left-align {
          background-image: url("${svgs.default.alignleft}");
        }

        &.font-color {
          background-image: url("${svgs.default.fontcolor}");
        }

        &.bg-color {
          background-image: url("${svgs.default.bgcolor}");
        }
      }
    }

    i {
      &.format {
        background-size: contain;
        display: inline-block;
        height: 18px;
        width: 18px;
        margin-top: 2px;
        vertical-align: -0.25em;
        display: flex;
      }

      &.chevron-down {
        background-color: transparent;
        background-size: contain;
        display: inline-block;
        margin-top: 2px;
        height: 18px;
        width: 18px;
        background-image: url("${svgs.default.down}");
      }

      &.bold {
        background-image: url("${svgs.default.bold}");
      }

      &.italic {
        background-image: url("${svgs.default.italic}");
      }

      &.redo {
        background-image: url("${svgs.default.redo}");
      }

      &.undo {
        background-image: url("${svgs.default.undo}");
      }

      &.underline {
        background-image: url("${svgs.default.underline}");
      }

      &.strikethrough {
        background-image: url("${svgs.default.strikethrough}");
      }

      &.code {
        background-image: url("${svgs.default.code}");
      }

      &.link {
        background-image: url("${svgs.default.link}");
      }

      &.font-background-color {
        background-image: url("${svgs.default.fontcolor}");
      }

      &.left-align {
        background-image: url("${svgs.default.aligncenter}");
      }

      &.center-align {
        background-image: url("${svgs.default.aligncenter}");
      }

      &.right-align {
        background-image: url("${svgs.default.alignright}");
      }

      &.justify-align {
        background-image: url("${svgs.default.alignjustify}");
      }
    }
    &.font-size {
      span {
        &.text {
          width: 40px;
        }
      }
    }
    &.font-family {
      span {
        &.text {
          width: 60px;
        }
      }
    }
  }
`;

export const LinkEditor = styled.div`
  position: absolute;
  z-index: 100;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  max-width: 300px;
  width: 100%;
  background-color: transparent;
  box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
  border-radius: 8px;
  transition: opacity 0.5s;

  button {
    &.button {
      width: 20px;
      height: 20px;
      display: inline-block;
      padding: 6px;
      border-radius: 8px;
      cursor: pointer;
      margin: 0 2px;
    }

    &.hovered {
      width: 20px;
      height: 20px;
      display: inline-block;
      background-color: #eee;
    }
  }

  i {
    background-size: contain;
    display: inline-block;
    height: 20px;
    width: 20px;
    vertical-align: -0.25em;
  }

  input {
    display: block;
    width: calc(100% - 24px);
    box-sizing: border-box;
    margin: 8px 12px;
    padding: 8px 12px;
    border-radius: 15px;
    background-color: #eee;
    font-size: 15px;
    color: rgb(5, 5, 5);
    border: 0;
    outline: 0;
    position: relative;
    font-family: inherit;
  }

  div {
    display: block;
    width: calc(100% - 24px);
    box-sizing: border-box;
    margin: 8px 12px;
    padding: 8px 12px;
    border-radius: 15px;
    background-color: #fff;
    font-size: 15px;
    color: rgb(5, 5, 5);
    border: 0;
    outline: 0;
    position: relative;
    font-family: inherit;

    a {
      color: rgb(33, 111, 219);
      text-decoration: none;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      margin-right: 30px;
      text-overflow: ellipsis;

      &:hover {
        text-decoration: underline;
      }
    }

    &.link-edit {
      background-image: url("${svgs.default.pencil}");
      background-position: center;
      background-repeat: no-repeat;
      width: 35px;
      vertical-align: -0.25em;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      cursor: pointer;
    }
  }
`;

export const Paragraph = styled.div`
    border-top:1px solid rgba(137, 225, 252, 0.1);
    p ,blockquote ,h1 ,h2 ,ul ,ol ,h3 ,h4 ,h5 ,h6{
    margin-left: 1px;
    margin-top: 8px;
    position: relative;

    strong, span ,em{
      &.font-semibold {
        font-weight: 600
      }
      
      &.italic {
        font-style: italic
      }
      
      &.underline {
        text-decoration: underline;
      }
      
      &.line-through {
        text-decoration: line-through;
      }
      
      &.underlined-line-through {
        text-decoration: underline line-through;
      }

      &.code {
        background-color:rgba(137, 225, 252, 0.3);
        padding: 1px 0.25rem;
        border-radius: 5px;
        font-size: 94%;
      }
    }
    }

    code{
      &.editor-code {
        background-color: transparent;
        box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
        display: block;
        padding: 8px 8px 8px 52px;
        line-height: 1.53;
        font-size: 13px;
        margin: 0;
        margin-top: 8px;
        margin-bottom: 8px;
        tab-size: 2;
        /* white-space: pre; */
        overflow-x: auto;
        position: relative;
      
      
      &::before {
        content: attr(data-gutter);
        position: absolute;
        background-color: transparent;
        box-shadow: 10px 5px 20px rgba(137, 225, 252, 0.3);
        left: 0;
        top: 0;
        border-right: 1px solid #ccc;
        padding: 8px;
        color: #777;
        white-space: pre-wrap;
        text-align: right;
        min-width: 25px;
      }

      &::after {
        content: attr(data-highlight-language);
        top: 0;
        right: 3px;
        padding: 3px;
        font-size: 10px;
        text-transform: uppercase;
        position: absolute;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
    blockquote{
      &.editor-quote{
        margin: 0;
        margin-left: 20px;
        font-size: 15px;
        color:rgba(206, 208, 212, 0.8);
        border-left-color: rgb(101, 103, 107);
        border-left-width: 4px;
        border-left-style: solid;
        padding-left: 16px;
        }
    }
    
    .PlaygroundEditorTheme__ul {
      padding: 0;
      margin: 0;
      margin-left: 16px;
      list-style-position: inside;
    }
    .PlaygroundEditorTheme__listItem {
      margin: 0 32px;
    }
    .PlaygroundEditorTheme__listItemChecked,
    .PlaygroundEditorTheme__listItemUnchecked {
      position: relative;
      margin-left: 8px;
      margin-right: 8px;
      padding-left: 24px;
      padding-right: 24px;
      list-style-type: none;
      outline: none;
    }
    .PlaygroundEditorTheme__listItemChecked {
      text-decoration: line-through;
    }
    .PlaygroundEditorTheme__listItemUnchecked:before,
    .PlaygroundEditorTheme__listItemChecked:before {
      content: '';
      width: 16px;
      height: 16px;
      top: 2px;
      left: 0;
      cursor: pointer;
      display: block;
      background-size: cover;
      position: absolute;
    }
    .PlaygroundEditorTheme__listItemUnchecked[dir='rtl']:before,
    .PlaygroundEditorTheme__listItemChecked[dir='rtl']:before {
      left: auto;
      right: 0;
    }
    .PlaygroundEditorTheme__listItemUnchecked:focus:before,
    .PlaygroundEditorTheme__listItemChecked:focus:before {
      box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.7)
      border-radius: 2px;
    }
    .PlaygroundEditorTheme__listItemUnchecked:before {
      border: 1px solid #999;
      border-radius: 2px;
    }
    .PlaygroundEditorTheme__listItemChecked:before {
      border: 1px solid rgba(137, 225, 252, 0.7);
      border-radius: 2px;
      background-color: rgba(137, 225, 252, 0.7);
      background-repeat: no-repeat;
    }
    .PlaygroundEditorTheme__listItemChecked:after {
      content: '';
      cursor: pointer;
      border-color: #fff;
      border-style: solid;
      position: absolute;
      display: block;
      top: 6px;
      width: 3px;
      left: 7px;
      height: 6px;
      transform: rotate(45deg);
      border-width: 0 2px 2px 0;
    }
  }
`;
