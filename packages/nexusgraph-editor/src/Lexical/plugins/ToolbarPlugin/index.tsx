// Copyright 2023 Paion Data. All rights reserved.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { $createCodeNode, $isCodeNode, getCodeLanguages, getDefaultCodeLanguage } from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, $isQuoteNode, HeadingTagType } from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $isAtNodeEnd,
  $isParentElementRTL,
  $patchStyleText,
  $wrapNodes,
} from "@lexical/selection";
import { $getNearestBlockElementAncestorOrThrow, $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  GridSelection,
  INDENT_CONTENT_COMMAND,
  LexicalEditor,
  NodeSelection,
  OUTDENT_CONTENT_COMMAND,
  RangeSelection,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";

import DropDown, { DropDownItem } from "../../ui/DropDown";
import DropdownColorPicker from "../../ui/DropdownColorPicker";
import { Dropdown, LinkEditor, Toolbar } from "./styled";

const LowPriority = 1;

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
  ["10px", "10px"],
  ["11px", "11px"],
  ["12px", "12px"],
  ["13px", "13px"],
  ["14px", "14px"],
  ["15px", "15px"],
  ["16px", "16px"],
  ["17px", "17px"],
  ["18px", "18px"],
  ["19px", "19px"],
  ["20px", "20px"],
];

const supportedBlockTypes: Set<string> = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "bullet",
  "number",
  "check",
]);

const blockTypeToBlockName: Record<string, string> = {
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  check: "Check List",
  quote: "Quote",
  bullet: "Bulleted List",
};

function Divider() {
  return <div className="divider"></div>;
}

function positionEditorElement(editor: HTMLElement, rect: DOMRect | null): void {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.scrollY + 10}px`;
    editor.style.left = `${rect.left + window.scrollX}px`;
  }
}

function FloatingLinkEditor({ editor }: { editor: LexicalEditor }) {
  const editorRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [lastSelection, setLastSelection] = useState<null | RangeSelection | NodeSelection | GridSelection>(null);

  const updateLinkEditor = useCallback(() => {
    const selection: typeof lastSelection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement: HTMLElement | Element | null = editor.getRootElement();
    if (nativeSelection) {
      if (
        selection !== null &&
        !nativeSelection.isCollapsed &&
        rootElement !== null &&
        rootElement.contains(nativeSelection.anchorNode)
      ) {
        const domRange = nativeSelection.getRangeAt(0);
        let rect;
        if (nativeSelection.anchorNode === rootElement) {
          let inner = rootElement;
          while (inner.firstElementChild != null) {
            inner = inner.firstElementChild;
          }
          rect = inner.getBoundingClientRect();
        } else {
          rect = domRange.getBoundingClientRect();
        }

        if (!mouseDownRef.current) {
          positionEditorElement(editorElem, rect);
        }
        setLastSelection(selection);
      } else if (!activeElement || activeElement.className !== "link-input") {
        positionEditorElement(editorElem, null);
        setLastSelection(null);
        setEditMode(false);
        setLinkUrl("");
      }
    }
    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <LinkEditor ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== "") {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setEditMode(false);
              }
            } else if (event.key === "Escape") {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <div
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true);
              }}
            />
          </div>
        </>
      )}
    </LinkEditor>
  );
}

function Select({
  onChange,
  className,
  options,
  value,
}: {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  options: string[];
  value: string;
}) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function getSelectedNode(selection: RangeSelection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

/**
 * Combine dropdown menu and font-size, font-family button
 *
 * @param param0
 *
 * @returns font-size and font-family button ,and font-size or font-family drop-down menus
 */
function FontDropDownList({
  editor,
  value,
  style,
  disabled = false,
}: {
  editor: LexicalEditor;
  value: string;
  style: string;
  disabled?: boolean;
}): JSX.Element {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
    },
    [editor, style]
  );

  const buttonAriaLabel =
    style === "font-family" ? "Formatting options for font family" : "Formatting options for font size";

  return (
    <DropDown
      disabled={disabled}
      buttonClassName={"toolbar-item " + style}
      buttonLabel={value}
      buttonIconClassName={style === "font-family" ? "icon block-type font-family" : ""}
      buttonAriaLabel={buttonAriaLabel}
    >
      {(style === "font-family" ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(([option, text]) => (
        <DropDownItem
          className={`item ${style === "font-size" ? "fontsize-item" : ""}`}
          onClick={() => handleClick(option)}
          key={option}
        >
          <span className="text">{text}</span>
        </DropDownItem>
      ))}
    </DropDown>
  );
}

function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown,
}: {
  editor: LexicalEditor;
  blockType: string;
  toolbarRef: React.RefObject<HTMLDivElement>;
  setShowBlockOptionsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${top + 40}px`;
      dropDown.style.left = `${left}px`;
    }
  }, [dropDownRef, toolbarRef]);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: Event) => {
        const target = event.target as Node;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  return (
    <Dropdown ref={dropDownRef}>
      <button className="item" onClick={formatParagraph}>
        <span className="icon paragraph"></span>
        <span className="text">Normal</span>
      </button>
      <button className="item" onClick={() => formatHeading("h1")}>
        <span className="icon first-heading"></span>
        <span className="text">Heading 1</span>
      </button>
      <button className="item" onClick={() => formatHeading("h2")}>
        <span className="icon second-heading"></span>
        <span className="text">Heading 2</span>
      </button>
      <button className="item" onClick={() => formatHeading("h3")}>
        <span className="icon third-heading"></span>
        <span className="text">Heading 3</span>
      </button>
      <button className="item" onClick={() => formatHeading("h4")}>
        <span className="icon fourth-heading"></span>
        <span className="text">Heading 4</span>
      </button>
      <button className="item" onClick={() => formatHeading("h5")}>
        <span className="icon fifth-heading"></span>
        <span className="text">Heading 5</span>
      </button>
      <button className="item" onClick={() => formatHeading("h6")}>
        <span className="icon sixth-heading"></span>
        <span className="text">Heading 6</span>
      </button>
      <button className="item" onClick={formatBulletList}>
        <span className="icon bullet-list"></span>
        <span className="text">Bulleted List</span>
      </button>
      <button className="item" onClick={formatNumberedList}>
        <span className="icon numbered-list"></span>
        <span className="text">Numbered List</span>
      </button>
      <button className="item" onClick={formatCheckList}>
        <span className="icon check-list"></span>
        <span className="text">Check List</span>
        {blockType === "ol" && <span className="active" />}
      </button>
      <button className="item" onClick={formatQuote}>
        <span className="icon quote"></span>
        <span className="text">Quote</span>
      </button>
      <button className="item" onClick={formatCode}>
        <span className="icon code"></span>
        <span className="text">Code Block</span>
      </button>
    </Dropdown>
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<string>("");
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isRTL, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [fontSize, setFontSize] = useState<string>("15px");
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [fontColor, setFontColor] = useState<string>("#fff");
  const [bgColor, setBgColor] = useState<string>("#000");

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getKey() === "root" ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }

      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
      setIsRTL($isParentElementRTL(selection));

      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      setFontSize($getSelectionStyleValueForProperty(selection, "font-size", "16px"));

      setFontFamily($getSelectionStyleValueForProperty(selection, "font-family", "Arial"));

      setFontColor($getSelectionStyleValueForProperty(selection, "color", "#fff"));

      setBgColor($getSelectionStyleValueForProperty(selection, "background-color", "#373b3d"));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const clearFormatting = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const nodes = selection.getNodes();

        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return;
        }

        nodes.forEach((node, idx) => {
          // We split the first and last node by the selection
          // So that we don't format unselected text inside those nodes
          if ($isTextNode(node)) {
            if (idx === 0 && anchor.offset !== 0) {
              node = node.splitText(anchor.offset)[1] || node;
            }
            if (idx === nodes.length - 1) {
              node = node.splitText(focus.offset)[0] || node;
            }

            if (node.__style !== "") {
              node.setStyle("");
            }
            if (node.__format !== 0) {
              node.setFormat(0);
              $getNearestBlockElementAncestorOrThrow(node).setFormat("");
            }
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true);
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat("");
          }
        });
      }
    });
  }, [editor]);

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [editor]
  );

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ "background-color": value });
    },
    [applyStyleText]
  );

  return (
    <Toolbar ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="button spaced"
        aria-label="Undo"
      >
        <i className="format undo"></i>
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="button"
        aria-label="Redo"
      >
        <i className="format redo"></i>
      </button>
      <Divider />
      {supportedBlockTypes.has(blockType) && (
        <>
          <button
            className="button block-controls"
            onClick={() => setShowBlockOptionsDropDown(!showBlockOptionsDropDown)}
            aria-label="Formatting Options"
          >
            <span className={"icon block-type " + blockType}></span>
            <span className="text">{blockTypeToBlockName[blockType]}</span>
            <i className="chevron-down "></i>
          </button>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              document.body
            )}
          <Divider />
        </>
      )}
      {blockType === "code" ? (
        <>
          <Select
            className="button code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <i className="chevron-down inside"></i>
        </>
      ) : (
        <>
          <>
            <FontDropDownList disabled={!isEditable} style={"font-family"} value={fontFamily} editor={editor} />
            <Divider />
            <FontDropDownList disabled={!isEditable} style={"font-size"} value={fontSize} editor={editor} />
            <Divider />
          </>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            }}
            className={"button spaced " + (isBold ? "active" : "")}
            aria-label="Format Bold"
          >
            <i className="format bold"></i>
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            }}
            className={"button spaced " + (isItalic ? "active" : "")}
            aria-label="Format Italics"
          >
            <i className="format italic"></i>
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            }}
            className={"button spaced " + (isUnderline ? "active" : "")}
            aria-label="Format Underline"
          >
            <i className="format underline"></i>
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
            }}
            className={"button spaced " + (isStrikethrough ? "active" : "")}
            aria-label="Format Strikethrough"
          >
            <i className="format strikethrough"></i>
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
            }}
            className={"button spaced " + (isCode ? "active" : "")}
            aria-label="insert Code"
          >
            <i className="format code"></i>
          </button>
          <button onClick={insertLink} className={"button spaced " + (isLink ? "active" : "")} aria-label="insert Link">
            <i className="format link"></i>
          </button>
          {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <DropdownColorPicker
            disabled={!isEditable}
            buttonClassName="toolbar-item color-picker"
            buttonAriaLabel="Formatting text color"
            buttonIconClassName="icon font-color"
            color={fontColor}
            onChange={onFontColorSelect}
            title="text color"
          />
          <DropdownColorPicker
            disabled={!isEditable}
            buttonClassName="toolbar-item color-picker"
            buttonAriaLabel="Formatting background color"
            buttonIconClassName="icon bg-color"
            color={bgColor}
            onChange={onBgColorSelect}
            title="bg color"
          />
          <DropDown
            disabled={!isEditable}
            buttonClassName="toolbar-item spaced"
            buttonLabel=""
            buttonAriaLabel="Formatting options for additional text styles"
            buttonIconClassName="icon dropdown-more"
          >
            <DropDownItem
              onClick={clearFormatting}
              className="item"
              title="Clear text formatting"
              aria-label="Clear all text formatting"
            >
              <i className="icon clear" />
              <span className="text">Clear Formatting</span>
            </DropDownItem>
          </DropDown>
          <Divider />
          <DropDown
            disabled={!isEditable}
            buttonLabel="Align"
            buttonIconClassName="icon left-align"
            buttonClassName="toolbar-item spaced alignment"
            buttonAriaLabel="Formatting options for text alignment"
          >
            <DropDownItem
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
              }}
              className="item"
            >
              <i className="icon left-align" />
              <span className="text">Left Align</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
              }}
              className="item"
            >
              <i className="icon center-align" />
              <span className="text">Center Align</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
              }}
              className="item"
            >
              <i className="icon right-align" />
              <span className="text">Right Align</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
              }}
              className="item"
            >
              <i className="icon justify-align" />
              <span className="text">Justify Align</span>
            </DropDownItem>
            <Divider />
            <DropDownItem
              onClick={() => {
                editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
              }}
              className="item"
            >
              <i className={"icon " + (isRTL ? "indent" : "outdent")} />
              <span className="text">Outdent</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
              }}
              className="item"
            >
              <i className={"icon " + (isRTL ? "outdent" : "indent")} />
              <span className="text">Indent</span>
            </DropDownItem>
          </DropDown>
        </>
      )}
    </Toolbar>
  );
}
