import styled from 'styled-components'

export const StyledEditorContainer = styled.div`
margin: 20px auto 20px auto;
border-radius: 2px;
width: 90%;
height: 45%;
color: #000;
background-color: #fff;
position: relative;
line-height: 20px;
font-weight: 400;
text-align: left;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
font-size: 15px;
overflow: auto;
`
export const PlaceholderContainer = styled.div`
color: #999;
overflow: hidden;
position: absolute;
text-overflow: ellipsis;
top: 10px;
left: 10px;
font-size: 15px;
user-select: none;
display: inline-block;
pointer-events: none;
${StyledEditorContainer}:focus-within & {
  display: none;
}
`

export const InputContainer = styled.div`
resize: none;
font-size: 15px;
caret-color: rgb(5, 5, 5);
position: relative;
tab-size: 1;
outline: 0;
padding: 10px 3px 0px 3px;
caret-color: #444;
}
`
