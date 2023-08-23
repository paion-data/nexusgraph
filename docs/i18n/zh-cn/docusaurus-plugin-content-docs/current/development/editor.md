---
sidebar_position: 12
title: 编辑器
---

编辑器我们主要使用[lexical](https://playground.lexical.dev/)框架去实现，[由于lexical官方并没有把lexical-playground的所有模块发布到npm包](https://github.com/facebook/lexical/discussions/2406)，所以我们是通过复制粘贴lexical-playground基础代码（例如：编辑器多媒体组件中的插入图片功能插件），然后放进我们的项目中去完善编辑器功能。

## 多媒体

### 插入图片功能

图片插入控件代码:

packages/nexusgraph-editor/src/Lexical/plugins/ToolbarPlugin.tsx

```
 <DropDownItem
    onClick={() => {
        showModal("Insert Image", (onClose) => <InsertImageDialog editor={editor} onClose={onClose} />);
    }}
    className="item"
    >
    <i className="icon image" />
    <span className="text">Image</span>
</DropDownItem>
```

显示图片对话框代码:

packages/nexusgraph-editor/src/Lexical/plugins/ToolbarPlugin.tsx
```
const [modal, showModal] = useModal();
    <Toolbar>
       ...
      {modal}
    </Toolbar>
```

图片对话框组件图示

![Image component](./img/Image-component.png)

### 插入图片功能所需模块

 - ### useModal

packages/nexusgraph-editor/src/Lexical/plugins/DropDown/useModal.tsx

**自定义hook useModal 更新图片对话框**

 - ### Modal

packages/nexusgraph-editor/src/Lexical/plugins/DropDown/Modal.tsx

**实现对话框的显示与关闭**

 - ### InlineImageNode

packages/nexusgraph-editor/src/Lexical/plugins/DropDown/InlineImageNode.tsx

**自定义节点ImageNode节点延伸DecoratorNode,使得可以在编辑器内插入图片组件**

 - ### InlineImagePlugin

packages/nexusgraph-editor/src/Lexical/plugins/DropDown/InlineImagePlugin.tsx

**图片对话框中子选项组件**

 - ### FileInput

packages/nexusgraph-editor/src/Lexical/plugins/DropDown/FileInput.tsx

**文件输入框组件**

 - ### TextInput

packages/nexusgraph-editor/src/Lexical/plugins/DropDown/TextInput.tsx

**文本输入框组件**

 - ### Dialog

packages/nexusgraph-editor/src/Lexical/plugins/DropDown/Dialog.tsx

**对话框子选项列表组件以及提交组件**

 - ### Button

packages/nexusgraph-editor/src/Lexical/plugins/DropDown/Button.tsx

**button控件组件**

 - ### joinClasses

packages/nexusgraph-editor/src/Lexical/plugins/DropDown/joinClasses.ts

**根据boolean给Button加入不同类名**

 - ### Placeholder

packages/nexusgraph-editor/src/Lexical/plugins/DropDown/Placeholder.tsx

**实现给图片标题框中的添加文字占位符**

 - ### InlineImageComponent

 packages/nexusgraph-editor/src/Lexical/plugins/DropDown/InlineImageComponent.tsx

 ****