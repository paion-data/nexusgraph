// Copyright 2023 Paion Data. All rights reserved.
import styled from "styled-components";

export const Dropdown = styled.div`
  z-index: 5;
  display: block;
  position: absolute;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  min-width: 100px;
  min-height: 40px;
  background-color: rgba(118, 118, 118, 0.9);

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
      }

      &.active {
        display: flex;
        width: 20px;
        height: 20px;
        background-size: contain;
      }

      &.paragraph {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-text-paragraph' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z' /%3E%3C/svg%3E");
      }

      &.large-heading {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-type-h1' viewBox='0 0 16 16' %3E%3Cpath d='M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z' /%3E%3C/svg%3E");
      }

      &.small-heading {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-type-h2' viewBox='0 0 16 16' %3E%3Cpath d='M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z' /%3E%3C/svg%3E");
      }

      &.bullet-list {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-list-ul' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' /%3E%3C/svg%3E");
      }

      &.numbered-list {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-list-ol' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z' /%3E%3Cpath d='M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z' /%3E%3C/svg%3E");
      }

      &.quote {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chat-square-quote' viewBox='0 0 16 16' %3E%3Cpath d='M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' /%3E%3Cpath d='M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z' /%3E%3C/svg%3E");
      }

      &.code {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-code' viewBox='0 0 16 16' %3E%3Cpath d='M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z' /%3E%3C/svg%3E");
      }
    }
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
    width: 1px;
    background-color: transparent;
    box-shadow: 10px 5px 20px rgba(137, 225, 252, 0.3);
    margin: 0 4px;
  } 

  i{
    &.format{
    background-size: contain;
    display: inline-block;
    height: 18px;
    width: 18px;
    margin-top: 2px;
    vertical-align: -0.25em;
    display: flex;
    opacity: 0.6;
    }

    &.chevron-down {
      margin-top: 3px;
      width: 16px;
      height: 16px;
      display: flex;
      user-select: none;
    }

    &.inside {
      width: 18px;
      height: 18px;
      display: flex;
      margin-left: -25px;
      margin-top: 11px;
      margin-right: 10px;
      pointer-events: none;
      }
  }

  select{

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
    color: #777;
    text-overflow: ellipsis;


    &.button{
      border: 0;
      display: flex;
      background: transparent;
      border-radius: 10px;
      padding: 8px;
      cursor: pointer;
      vertical-align: middle;
      
      &:hover:not([disabled]){
        background-color: transparent;
        box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
        border: none;
      }

      &:disabled{
        cursor: not-allowed;
        
        i{
          opacity: 0.2;
        }
      }
    }

      &.code-language {
      text-transform: capitalize;
      width: 130px;
    }
  }

  button{
      &.button{
      border: 0;
      display: flex;
      background: transparent;
      border-radius: 10px;
      padding: 8px;
      cursor: pointer;
      vertical-align: middle;

      &:hover:not([disabled]){
        background-color: transparent;
        box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
      }

      &:disabled{
        cursor: not-allowed;
        
        i{
          opacity: 0.2;
        }
      }
      }
      
      &.spaced{
        margin-right: 2px;
      }

      &.active{
        background-color: transparent;
        box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.7) !important;
        i{
          opacity: 1;
        }
      }

      span{
        &.text {
          display: flex;
          line-height: 20px;
          width: 200px;
          vertical-align: middle;
          font-size: 14px;
          color: #777;
          text-overflow: ellipsis;
          width: 70px;
          overflow: hidden;
          height: 20px;
          text-align: left;
        }

        &.icon {
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
          color:gray;
          margin-right:10px;
          margin-top:2px;

        }

        &.paragraph{
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-text-paragraph' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z' /%3E%3C/svg%3E");
        }
  
        &.h1{
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-type-h1' viewBox='0 0 16 16' %3E%3Cpath d='M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z' /%3E%3C/svg%3E");
        }
  
        &.h2{
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-type-h2' viewBox='0 0 16 16' %3E%3Cpath d='M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z' /%3E%3C/svg%3E");
        }
  
        &.ul{
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-list-ul' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' /%3E%3C/svg%3E");
        }
  
        &.ol{
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-list-ol' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z' /%3E%3Cpath d='M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z' /%3E%3C/svg%3E");
        }
  
        &.quote{
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chat-square-quote' viewBox='0 0 16 16' %3E%3Cpath d='M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' /%3E%3Cpath d='M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z' /%3E%3C/svg%3E");
        }
  
        &.code{
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-code' viewBox='0 0 16 16' %3E%3Cpath d='M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z' /%3E%3C/svg%3E");
        }
        }
      
      }

      i{
        &.format{
        background-size: contain;
        display: inline-block;
        height: 18px;
        width: 18px;
        margin-top: 2px;
        vertical-align: -0.25em;
        display: flex;
        opacity: 0.6;
        }

        &.chevron-down {
          background-color: transparent;
          background-size: contain;
          display: inline-block;
          height: 18px;
          width: 18px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'  class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E%0A");
        }

      &.bold {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-type-bold' viewBox='0 0 16 16'%3E%3Cpath d='M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z'/%3E%3C/svg%3E");
      }

      &.italic{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-type-italic' viewBox='0 0 16 16' %3E%3Cpath d='M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z' /%3E%3C/svg%3E%0A");
      }

      &.redo{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' color='%23fff' class='bi bi-arrow-clockwise' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z' /%3E%3Cpath d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z' /%3E%3C/svg%3E");
      }

      &.undo{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' color='%23fff' class='bi bi-arrow-counterclockwise' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z' /%3E%3Cpath d='M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z' /%3E%3C/svg%3E");
      }

      &.underline{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-type-underline' viewBox='0 0 16 16' %3E%3Cpath d='M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z' /%3E%3C/svg%3E");
      }

      &.strikethrough{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-type-strikethrough' viewBox='0 0 16 16' %3E%3Cpath d='M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z' /%3E%3C/svg%3E");
      }

      &.code{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-code' viewBox='0 0 16 16' %3E%3Cpath d='M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z' /%3E%3C/svg%3E");
      }

      &.link{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-link' viewBox='0 0 16 16' %3E%3Cpath d='M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z' /%3E%3Cpath d='M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z' /%3E%3C/svg%3E");
      }

      &.left-align{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-text-left' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z' /%3E%3C/svg%3E");
      }

      &.center-align{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-text-center' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z'/%3E%3C/svg%3E"); 
      }

      &.right-align{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-text-right' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z' /%3E%3C/svg%3E");
      }

      &.justify-align{
        background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-justify' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z' /%3E%3C/svg%3E");
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
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-fill' viewBox='0 0 16 16'%3E%3Cpath d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z'/%3E%3C/svg%3E");
      background-size: 16px;
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
  p {
    margin-left: 1px;
    margin-top: 8px;
    position: relative;

    strong{
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
      
      span{
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
      
      code{
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
      }

      em{
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
        // font-family: Menlo, Consolas, Monaco, monospace;
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
        box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
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
      

      strong{
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
          background-color: gray;
           padding: 1px 0.25rem;
        border-radius: 5px;
          font-size: 94%;
        }
      }
        
        span{
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
        
        code{
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
        }
  
        em{
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
            background-color: gray;
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
          // font-family: Menlo, Consolas, Monaco, monospace;
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
          box-shadow: inset 10px 5px 20px rgba(137, 225, 252, 0.3);
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
`;
