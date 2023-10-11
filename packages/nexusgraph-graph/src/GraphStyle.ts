// Copyright 2023 Paion Data. All rights reserved.
import { calculateDefaultNodeColors } from "@neo4j-devtools/word-color";
import { NodeModel } from "./models/Node";
import { RelationshipModel } from "./models/Relationship";

export class Selector {
  tag = "";
  classes: string[] = [];
  constructor(tag: string, classes: null | string[]) {
    this.tag = tag;
    this.classes = classes ?? [];
  }

  public toString(): string {
    return selectorArrayToString([this.tag].concat(this.classes));
  }
}

class StyleRule {
  selector: Selector;
  props: Record<string, string>;
  constructor(matchesSelector: Selector, matchesProps: Record<string, string>) {
    this.selector = matchesSelector;
    this.props = matchesProps;
  }

  public matches(selector: Selector) {
    if (this.selector.tag !== selector.tag) {
      return false;
    }
    for (let i = 0; i < this.selector.classes.length; i++) {
      const selectorClass = this.selector.classes[i];
      if (selectorClass != null && selector.classes.indexOf(selectorClass) === -1) {
        return false;
      }
    }
    return true;
  }

  public matchesExact(selector: Selector) {
    return this.matches(selector) && this.selector.classes.length === selector.classes.length;
  }
}

class StyleElement {
  selector: Selector;
  props: any;
  constructor(selector: Selector) {
    this.selector = selector;
    this.props = {};
  }

  public applyRules(rules: StyleRule[]): StyleElement {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (rule.matches(this.selector)) {
        this.props = { ...this.props, ...rule.props };
        this.props.caption = this.props.caption || this.props.defaultCaption;
      }
    }
    return this;
  }

  public get(attr: string) {
    return this.props[attr] || "";
  }
}

const DEFAULT_STYLE = {
  node: {
    diameter: "50px",
    color: "#A5ABB6",
    "border-color": "#9AA1AC",
    "border-width": "2px",
    "text-color-internal": "#FFFFFF",
    "font-size": "10px",
  },
  relationship: {
    color: "#A5ABB6",
    "shaft-width": "1px",
    "font-size": "8px",
    padding: "3px",
    "text-color-external": "#000000",
    "text-color-internal": "#FFFFFF",
    caption: "<type>",
  },
};

type DefaultSizeType = { diameter: string };
const DEFAULT_SIZES: DefaultSizeType[] = [
  {
    diameter: "10px",
  },
  {
    diameter: "20px",
  },
  {
    diameter: "50px",
  },
  {
    diameter: "65px",
  },
  {
    diameter: "80px",
  },
];

type DefaultArrayWidthType = { "shaft-width": string };
const DEFAULT_ARRAY_WIDTHS: DefaultArrayWidthType[] = [
  {
    "shaft-width": "1px",
  },
  {
    "shaft-width": "2px",
  },
  {
    "shaft-width": "3px",
  },
  {
    "shaft-width": "5px",
  },
  {
    "shaft-width": "8px",
  },
  {
    "shaft-width": "13px",
  },
  {
    "shaft-width": "25px",
  },
  {
    "shaft-width": "38px",
  },
];

type DefaultColorType = {
  color: string;
  "border-color": string;
  "text-color-internal": string;
};
const DEFAULT_COLORS: DefaultColorType[] = [
  {
    color: "#604A0E",
    "border-color": "#423204",
    "text-color-internal": "#FFFFFF",
  },
  {
    color: "#C990C0",
    "border-color": "#b261a5",
    "text-color-internal": "#FFFFFF",
  },
  {
    color: "#F79767",
    "border-color": "#f36924",
    "text-color-internal": "#FFFFFF",
  },
  {
    color: "#57C7E3",
    "border-color": "#23b3d7",
    "text-color-internal": "#2A2C34",
  },
  {
    color: "#F16667",
    "border-color": "#eb2728",
    "text-color-internal": "#FFFFFF",
  },
  {
    color: "#D9C8AE",
    "border-color": "#c0a378",
    "text-color-internal": "#2A2C34",
  },
  {
    color: "#8DCC93",
    "border-color": "#5db665",
    "text-color-internal": "#2A2C34",
  },
  {
    color: "#ECB5C9",
    "border-color": "#da7298",
    "text-color-internal": "#2A2C34",
  },
  {
    color: "#4C8EDA",
    "border-color": "#2870c2",
    "text-color-internal": "#FFFFFF",
  },
  {
    color: "#FFC454",
    "border-color": "#d7a013",
    "text-color-internal": "#2A2C34",
  },
  {
    color: "#DA7194",
    "border-color": "#cc3c6c",
    "text-color-internal": "#FFFFFF",
  },
  {
    color: "#569480",
    "border-color": "#447666",
    "text-color-internal": "#FFFFFF",
  },
];

export class GraphStyleModel {
  rules: StyleRule[];
  constructor(private useGeneratedDefaultColors: boolean = false) {
    this.rules = [];
    try {
      this.loadRules();
    } catch (_error) {
      // intentionally left blank
    }
  }

  public parseSelector(key: string): Selector {
    const tokens = selectorStringToArray(key);
    return new Selector(tokens[0], tokens.slice(1));
  }

  public loadRules(data?: any): void {
    const localData = typeof data === "object" ? data : DEFAULT_STYLE;
    this.rules = [];
    for (const key in localData) {
      const props: Record<string, string> = localData[key];
      this.rules.push(new StyleRule(this.parseSelector(key), props));
    }
  }

  public nodeSelector(node: NodeModel): Selector {
    const classes = node.labels.length == 0 ? [] : node.labels;
    return new Selector("node", classes);
  }

  public relationshipSelector(rel: { type: string }): Selector {
    const classes = rel.type == undefined ? [] : [rel.type];
    return new Selector("relationship", classes);
  }

  public findRule(selector: Selector, rules: StyleRule[]): StyleRule | undefined {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (rule.matchesExact(selector)) {
        return rule;
      }
    }
    return undefined;
  }

  public findAvailableDefaultColor(rules: StyleRule[]): DefaultColorType {
    const usedColors = rules
      .filter((rule: StyleRule) => {
        return rule.props.color != null;
      })
      .map((rule: StyleRule) => {
        return rule.props.color;
      });
    const index = usedColors.length - 1;
    return DEFAULT_COLORS[index];
  }

  public getDefaultNodeCaption(item: NodeModel): { caption: string } | { defaultCaption: string } {
    if (
      !item ||
      // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
      !(item.propertyList != null ? item.propertyList.length : 0) > 0
    ) {
      return {
        defaultCaption: "<id>",
      };
    }
    const captionPrioOrder = [/^name$/i, /^title$/i, /^label$/i, /name$/i, /description$/i, /^.+/];

    let defaultCaption = captionPrioOrder.reduceRight((leading, current) => {
      const hits = item.propertyList.filter((prop: any) => current.test(prop.key));

      if (hits.length) {
        return `{${hits[0].key}}`;
      } else {
        return leading;
      }
    }, "");
    defaultCaption || (defaultCaption = "<id>");
    return {
      caption: defaultCaption,
    };
  }

  public calculateStyle(selector: Selector): StyleElement {
    return new StyleElement(selector).applyRules(this.rules);
  }

  public setDefaultNodeStyle(selector: Selector, item: NodeModel): void {
    let defaultColor = true;
    let defaultCaption = true;
    for (let i = 0; i < this.rules.length; i++) {
      const rule = this.rules[i];

      if (rule.selector.classes.length > 0 && rule.matches(selector)) {
        /* eslint-disable no-alert, no-prototype-builtins */
        if (rule.props.hasOwnProperty("color")) {
          defaultColor = false;
        }
        if (rule.props.hasOwnProperty("caption")) {
          defaultCaption = false;
        }
        /* eslint-enable no-alert, no-prototype-builtins */
      }
    }
    const minimalSelector = new Selector(selector.tag, selector.classes.sort().slice(0, 1));
    if (defaultColor) {
      const calcColor = (label: Selector): DefaultColorType => {
        const { backgroundColor, borderColor, textColor } = calculateDefaultNodeColors(label.classes[0]);

        return {
          "border-color": borderColor,
          "text-color-internal": textColor,
          color: backgroundColor,
        };
      };

      this.changeForSelector(
        minimalSelector,
        this.useGeneratedDefaultColors ? calcColor(minimalSelector) : this.findAvailableDefaultColor(this.rules)
      );
    }
    if (defaultCaption) {
      this.changeForSelector(minimalSelector, this.getDefaultNodeCaption(item));
    }
  }

  public changeForSelector(selector: Selector, props: any): StyleRule {
    let rule = this.findRule(selector, this.rules);
    if (rule == null) {
      rule = new StyleRule(selector, props);
      this.rules.push(rule);
    }
    rule.props = { ...rule.props, ...props };
    return rule;
  }

  public destroyRule(rule: StyleRule): void {
    const idx = this.rules.indexOf(rule);
    if (idx != null) {
      this.rules.splice(idx, 1);
    }
  }

  public resetToDefault(): void {
    this.loadRules();
  }

  public toSheet() {
    const sheet: any = {};
    this.rules.forEach((rule: StyleRule) => {
      sheet[rule.selector.toString()] = rule.props;
    });
    return sheet;
  }

  public toString() {
    let str = "";
    this.rules.forEach((rule: StyleRule) => {
      str += `${rule.selector.toString()} {\n`;
      for (const k in rule.props) {
        let v = rule.props[k];
        if (k === "caption") {
          v = `'${v}'`;
        }
        str += `  ${k}: ${v};\n`;
      }
      str += "}\n\n";
    });
    return str;
  }

  public defaultSizes(): DefaultSizeType[] {
    return DEFAULT_SIZES;
  }

  public defaultArrayWidths(): DefaultArrayWidthType[] {
    return DEFAULT_ARRAY_WIDTHS;
  }

  public defaultColors(): DefaultColorType[] {
    return DEFAULT_COLORS;
  }

  public interpolate(template: any, item: NodeModel | RelationshipModel) {
    let interpolatedString = template.replace(
      /\{([^{}]*)\}/g,
      (_match: any, firstMatchingGroup: string) => item.propertyMap[firstMatchingGroup] ?? ""
    );

    if (interpolatedString.length < 1 && template === "{type}" && item instanceof RelationshipModel) {
      interpolatedString = "<type>";
    }
    if (interpolatedString.length < 1 && template === "{id}" && item instanceof NodeModel) {
      interpolatedString = "<id>";
    }

    return interpolatedString.replace(/^<(id|type)>$/, (_match: any, firstMatchingGroup: string) => {
      const r = item[firstMatchingGroup as keyof typeof item];
      if (typeof r === "string") {
        return r;
      }
      return "";
    });
  }

  public forNode(node: any = {}): StyleElement {
    const selector = this.nodeSelector(node);
    if ((node.labels != null ? node.labels.length : 0) > 0) {
      this.setDefaultNodeStyle(selector, node);
    }
    return this.calculateStyle(selector);
  }

  public forRelationship(rel: any): StyleElement {
    const selector = this.relationshipSelector(rel);
    return this.calculateStyle(selector);
  }
}

function selectorArrayToString(selectors: any) {
  const escaped = selectors.map((r: any) => r.replace(/\./g, "\\."));
  return escaped.join(".");
}

function selectorStringToArray(selector: string) {
  // Negative lookbehind simulation since js support is very limited.
  // We want to match all . that are not preceded by \\
  // Instead we reverse and look
  // for . that are not followed by \\ (negative lookahead)
  const reverseSelector = selector.split("").reverse().join("");
  const re = /(.+?)(?!\.\\)(?:\.|$)/g;
  const out = [];
  let m;
  while ((m = re.exec(reverseSelector)) !== null) {
    const res = m[1].split("").reverse().join("");
    out.push(res);
  }

  return out
    .filter((r) => r)
    .reverse()
    .map((r) => r.replace(/\\./g, "."));
}
