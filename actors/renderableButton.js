import { Utils } from "../utils.js";
import { RenderObject } from "./renderObject.js";

export class RenderableButton extends RenderObject {
  glib;

  label;

  proposedLabel;

  color;

  proposedColor;

  font;

  fontFamily;

  proposedFontFamily;

  fontSize;

  proposedFontSize;

  fontSizeUnit;

  proposedFontSizeUnit;

  propertiesHaveChanged;

  dimensionsHaveChanged;

  internalPadding;

  borderSize;

  constructor(pGLib, pLabel) {
    super();

    if (Utils.isUndefined(pGLib)) {
      reportUsageError("Button requires a graphics library");

      return;
    }

    this.glib = pGLib;
    this.label = pLabel;
    // This extends from renderobject...
    // self = RenderObject.create();

    this.internalPadding = 3;
    this.borderSize = 1;

    if (Utils.isDefined(pLabel)) {
      this.setLabel(pLabel);
    }

    this.setColor("rgba(200, 100, 0, 1.0)");
    this.setFontSize(30);
    this.setFontSizeUnit("px");
    this.setFontFamily("arial");
  }

  getLabel() {
    return this.label;
  }

  setLabel(pLabel) {
    if (!Utils.isString(pLabel)) {
      Utils.reportUsageError("Button label must be a string");

      return;
    }

    this.proprosed_label = pLabel;
    this.propertiesHaveChanged = true;
    this.dimensionsHaveChanged = true;
  }

  getColor() {
    return this.color;
  }

  setColor(pColor) {
    if (!Utils.isString(pColor)) {
      Utils.reportUsageError("Color must be string");

      return;
    }

    this.proposedColor = pColor;

    this.propertiesHaveChanged = true;
    this.dimensionsHaveChanged = true;
  }

  getFontFamily() {
    return this.fontFamily;
  }

  setFontFamily(pFontFamily) {
    if (!Utils.isString(pFontFamily)) {
      reportUsageError("Label font family must be string");

      return;
    }

    // ToDo: Check string to match enum?
    this.proposedFontFamily = pFontFamily;

    this.propertiesHaveChanged = true;
    this.dimensionsHaveChanged = true;
  }

  getFontSize() {
    return fontSize;
  }

  setFontSize(pFontSize) {
    if (!Utils.isInteger(pFontSize)) {
      Utils.reportUsageError("Label font size must be interger");

      return;
    }

    // ToDo: Check string to match enum?
    this.proposedFontSize = pFontSize;

    this.propertiesHaveChanged = true;
    this.dimensionsHaveChanged = true;
  }

  getFontSizeUnit() {
    return fontSizeUnit;
  }

  setFontSizeUnit(pFontSizeUnit) {
    // ToDo: Check string to match enum?
    if (!Utils.isString(pFontSizeUnit)) {
      reportUsageError("Label font size unit must be string");

      return;
    }

    this.proposedFontSizeUnit = pFontSizeUnit;

    this.propertiesHaveChanged = true;
    this.dimensionsHaveChanged = true;
  }

  update() {
    // Update is called if properties have changed.
    this.label = this.proposedLabel;
    this.color = this.proposedColor;
    this.fontSize = this.proposedFontSize;
    this.fontSizeUnit = this.proposedFontSizeUnit;
    this.fontFamily = this.proposedFontFamily;
    this.font = Utils.formatise(
      "{@1:i}{@2:s} {@3:s}",
      this.fontSize,
      this.fontSizeUnit,
      this.fontFamily
    );

    super.update()
  }

  measure() {
    // Measure is called if dimensions have changed.
    this.w = this.fontSize + this.glib.measureTextWidth(this.label, this.font);
    this.h = this.fontSize + this.internalPadding + this.borderSize;

    super.measure()
  }

  draw() {
    this.glib.drawRect(this.x, this.y, this.w, this.h, this.color);

    this.glib.clearRect(
      this.x + this.borderSize,
      this.y + this.borderSize,
      this.w - this.borderSize * 2,
      this.h - this.borderSize * 2
    );

    this.glib.text(
      this.x + this.fontSize / 2,
      this.y + this.fontSize - this.borderSize,
      this.label,
      this.color,
      this.font
    );
  }
}
