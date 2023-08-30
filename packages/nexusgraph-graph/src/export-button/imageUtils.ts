// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/browser";
import { Canvg } from "canvg";
import FileSaver from "file-saver";

import { prepareForExport } from "./svgUtils";

/**
 * Download file
 *
 * [FileSaver](https://www.npmjs.com/package/file-saver) is a solution for saving files on the client side
 *
 * @param filename The optional name of the file to be downloaded.
 * @param mime File type
 * @param data SVG data
 *
 * @returns FileSaver
 */
const download = (filename: any, mime: any, data: any) => {
  const blob = new Blob([data], { type: mime });
  return FileSaver.saveAs(blob, filename);
};

/**
 * Serialize the SVG to a string
 *
 * The [XMLSerializer](https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer) interface provides the
 * serializeToString() method to construct an XML string representing a DOM tree.
 *
 * @param node The node to use as the root of the DOM tree or subtree for which to construct an XML representation.
 *
 * @returns SVG
 */
const htmlCharacterRefToNumericalRef = (node: any) =>
  new window.XMLSerializer().serializeToString(node).replace(/&nbsp;/g, "&#160;");

/**
 * Download SVG file
 *
 * @param svg SvgElement of visElement
 * @param graph GraphElement of visElement
 * @param type Type of visElement
 *
 * @returns Function for download svg
 */
export const downloadSVG = (svg: any, graph: any, type: any) => {
  const svgObj = prepareForExport(svg, graph, type);
  const svgData = htmlCharacterRefToNumericalRef(svgObj.node());

  return download(`${type}.svg`, "image/svg+xml;charset=utf-8", svgData);
};

/**
 * Download images in PNG format
 *
 * To make the downloaded picture clearer, we made the png a little larger than the default zoom (lose less quality when
 * resizing)Also adjust the screen resolution (to avoid blurring the text)
 *
 * The Canvg package parses the svg and renders the result on the Canvas
 *
 * @param svg SvgElement of visElement
 * @param graph GraphElement of visElement
 * @param type Type of visElement
 */
export const downloadPNGFromSVG = (svg: any, graph: any, type: any) => {
  const svgObj = prepareForExport(svg, graph, type);
  const svgDefaultWidth = parseInt(svgObj.attr("width"), 10);
  const svgDefaultHeight = parseInt(svgObj.attr("height"), 10);

  const EXTRA_SIZE = 1.5;
  svgObj.attr("width", svgDefaultWidth * window.devicePixelRatio * EXTRA_SIZE);
  svgObj.attr("height", svgDefaultHeight * window.devicePixelRatio * EXTRA_SIZE);
  const svgData = htmlCharacterRefToNumericalRef(svgObj.node());

  const canvas = document.createElement("canvas");
  canvas.width = parseInt(svgObj.attr("width"), 10);
  canvas.height = parseInt(svgObj.attr("height"), 10);
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const v = Canvg.fromString(ctx, svgData);
    v.resize(canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);
    v.render()
      .then(() => downloadWithDataURI(`${type}.png`, canvas.toDataURL("image/png")))
      .catch(() => {
        Sentry.captureMessage('Error: "Failed to download PNG"');
      });
  }
};

/**
 * Download the file through the url
 *
 * This function decodes a string of data encoded using Base64atob() encoding, each character is then indexed as a
 * UTF-16 code unit sequence, get an svg data
 *
 * @param filename The optional name of the file to be downloaded.
 *
 * @param dataURI Data url
 *
 * @returns Download file
 */
const downloadWithDataURI = (filename: any, dataURI: any) => {
  let byteString, i, j, ref;
  byteString = null;
  if (dataURI.split(",")[0].indexOf("base64") >= 0) {
    byteString = window.atob(dataURI.split(",")[1]);
  } else {
    byteString = decodeURI(dataURI.split(",")[1]);
  }
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (i = j = 0, ref = byteString.length; ref >= 0 ? j <= ref : j >= ref; i = ref >= 0 ? ++j : --j) {
    ia[i] = byteString.charCodeAt(i);
  }
  return download(filename, mimeString, ia);
};

/**
 * Export PNG
 *
 * @param visElement
 */
export const exportPNG = (visElement: any): void => {
  if (visElement) {
    const { svgElement, graphElement, type } = visElement;
    downloadPNGFromSVG(svgElement, graphElement, type);
  }
};

/**
 * Export SVG
 *
 * @param visElement
 */
export const exportSVG = (visElement: any): void => {
  if (visElement) {
    const { svgElement, graphElement, type } = visElement;
    downloadSVG(svgElement, graphElement, type);
  }
};
