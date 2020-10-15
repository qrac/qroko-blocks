import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import {
  InspectorControls,
  ColorPalette,
  InnerBlocks,
} from "@wordpress/block-editor"
import {
  PanelBody,
  BaseControl,
  RadioControl,
  RangeControl,
  ToggleControl,
  Button,
} from "@wordpress/components"
import classNames from "classnames"

import "./editor.css"

const positionList = [
  { label: __("Center", "qroko-blocks"), value: "center" },
  { label: __("Left", "qroko-blocks"), value: "left" },
  { label: __("Right", "qroko-blocks"), value: "right" },
]

const borderStyleList = [
  { label: __("Solid", "qroko-blocks"), value: "solid" },
  { label: __("Dashed", "qroko-blocks"), value: "dashed" },
  { label: __("Dotted", "qroko-blocks"), value: "dotted" },
  { label: __("Double", "qroko-blocks"), value: "double" },
]

registerBlockType("qroko-blocks/box", {
  title: __("Box", "qroko-blocks"),
  description: __(
    "You can set up decorative boxes and place content inside.",
    "qroko-blocks"
  ),
  category: "qroko",
  icon: (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
      />
    </svg>
  ),
  attributes: {
    maxWidthTrigger: {
      type: "boolean",
      default: false,
    },
    maxWidth: {
      type: "number",
      default: 1000,
    },
    position: {
      type: "string",
      default: "center",
    },
    radius: {
      type: "number",
      default: 4,
    },
    backgroundTrigger: {
      type: "boolean",
      default: true,
    },
    backgroundColor: {
      type: "string",
    },
    backgroundOpacity: {
      type: "number",
      default: 100,
    },
    borderTrigger: {
      type: "boolean",
      default: true,
    },
    borderWidth: {
      type: "number",
      default: 1,
    },
    borderStyle: {
      type: "string",
      default: "solid",
    },
    borderColor: {
      type: "string",
    },
    borderOpacity: {
      type: "number",
      default: 100,
    },
    innerPaddingTop: {
      type: "number",
      default: 16,
    },
    innerPaddingRight: {
      type: "number",
      default: 16,
    },
    innerPaddingBottom: {
      type: "number",
      default: 16,
    },
    innerPaddingLeft: {
      type: "number",
      default: 16,
    },
  },
  edit({ attributes, className, setAttributes }) {
    const calcMaxWidth = attributes.maxWidthTrigger
      ? attributes.maxWidth + "px"
      : "none"
    const calcOpacity = (value) => {
      return String(value / 100)
    }
    const calcMarginRight = () => {
      switch (attributes.position) {
        case "center":
          return "auto"
        case "left":
          return "auto"
        case "right":
          return "0"
        default:
          return "auto"
      }
    }
    const calcMarginLeft = () => {
      switch (attributes.position) {
        case "center":
          return "auto"
        case "left":
          return "0"
        case "right":
          return "auto"
        default:
          return "auto"
      }
    }
    const calcPadding = (value) => {
      const currentBorderWidth = attributes.borderTrigger
        ? attributes.borderWidth
        : 0
      return currentBorderWidth + value + "px"
    }
    const boxVariables = {
      "--qroko-blocks-box-max-width": calcMaxWidth,
      "--qroko-blocks-box-margin-right": calcMarginRight(),
      "--qroko-blocks-box-margin-left": calcMarginLeft(),
      "--qroko-blocks-box-radius": attributes.radius + "px",
      "--qroko-blocks-box-background-color": attributes.backgroundColor,
      "--qroko-blocks-box-background-opacity": calcOpacity(
        attributes.backgroundOpacity
      ),
      "--qroko-blocks-box-border-width": attributes.borderWidth + "px",
      "--qroko-blocks-box-border-style": attributes.borderStyle,
      "--qroko-blocks-box-border-color": attributes.borderColor,
      "--qroko-blocks-box-border-opacity": calcOpacity(
        attributes.borderOpacity
      ),
      "--qroko-blocks-box-inner-padding-top": calcPadding(
        attributes.innerPaddingTop
      ),
      "--qroko-blocks-box-inner-padding-right": calcPadding(
        attributes.innerPaddingRight
      ),
      "--qroko-blocks-box-inner-padding-bottom": calcPadding(
        attributes.innerPaddingBottom
      ),
      "--qroko-blocks-box-inner-padding-left": calcPadding(
        attributes.innerPaddingLeft
      ),
    }
    return (
      <div
        className={classNames(className, "qroko-blocks-box")}
        style={boxVariables}
      >
        <InspectorControls>
          <PanelBody title={__("Basic Settings", "qroko-blocks")}>
            <BaseControl>
              <ToggleControl
                label={__("Use the Max Width", "qroko-blocks")}
                onChange={() => {
                  setAttributes({
                    maxWidthTrigger: !attributes.maxWidthTrigger,
                  })
                }}
                checked={attributes.maxWidthTrigger}
              />
              <RangeControl
                value={attributes.maxWidth}
                label={__("Max Width (px)", "qroko-blocks")}
                min={100}
                max={1600}
                initialPosition={1000}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    maxWidth: !value ? 1000 : value,
                  })
                }}
              />
              <RadioControl
                label={__("Position", "qroko-blocks")}
                selected={attributes.position}
                options={positionList}
                onChange={(option) => {
                  setAttributes({
                    position: option,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
          <PanelBody title={__("Background", "qroko-blocks")}>
            <BaseControl>
              <ToggleControl
                label={__("Use the Background", "qroko-blocks")}
                onChange={() => {
                  setAttributes({
                    backgroundTrigger: !attributes.backgroundTrigger,
                  })
                }}
                checked={attributes.backgroundTrigger}
              />
            </BaseControl>
            <BaseControl label={__("Color", "qroko-blocks")}>
              <ColorPalette
                value={attributes.backgroundColor}
                onChange={(value) =>
                  setAttributes({
                    backgroundColor: value,
                  })
                }
              />
            </BaseControl>
            <BaseControl>
              <RangeControl
                value={attributes.backgroundOpacity}
                label={__("Opacity", "qroko-blocks")}
                min={0}
                max={100}
                initialPosition={100}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    backgroundOpacity: !value ? 100 : value,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
          <PanelBody title={__("Border", "qroko-blocks")}>
            <BaseControl>
              <ToggleControl
                label={__("Use the Border", "qroko-blocks")}
                onChange={() => {
                  setAttributes({
                    borderTrigger: !attributes.borderTrigger,
                  })
                }}
                checked={attributes.borderTrigger}
              />
            </BaseControl>
            <BaseControl>
              <RangeControl
                value={attributes.borderWidth}
                label={__("Width", "qroko-blocks")}
                min={0}
                max={40}
                initialPosition={1}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    borderWidth: !value ? 1 : value,
                  })
                }}
              />
              <RadioControl
                label={__("Style", "qroko-blocks")}
                selected={attributes.borderStyle}
                options={borderStyleList}
                onChange={(option) => {
                  setAttributes({
                    borderStyle: option,
                  })
                }}
              />
            </BaseControl>
            <BaseControl label={__("Color", "qroko-blocks")}>
              <ColorPalette
                value={attributes.borderColor}
                onChange={(value) =>
                  setAttributes({
                    borderColor: value,
                  })
                }
              />
            </BaseControl>
            <BaseControl>
              <RangeControl
                value={attributes.borderOpacity}
                label={__("Opacity", "qroko-blocks")}
                min={0}
                max={100}
                initialPosition={100}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    borderOpacity: !value ? 100 : value,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
          <PanelBody title={__("Inner", "qroko-blocks")}>
            <BaseControl>
              <RangeControl
                value={attributes.innerPaddingTop}
                label={__("Padding Top (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={16}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingTop: !value ? 16 : value,
                  })
                }}
              />
              <RangeControl
                value={attributes.innerPaddingRight}
                label={__("Padding Right (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={16}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingRight: !value ? 16 : value,
                  })
                }}
              />
              <RangeControl
                value={attributes.innerPaddingBottom}
                label={__("Padding Bottom (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={16}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingBottom: !value ? 16 : value,
                  })
                }}
              />
              <RangeControl
                value={attributes.innerPaddingLeft}
                label={__("Padding Left (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={16}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingLeft: !value ? 16 : value,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
        </InspectorControls>
        {attributes.backgroundTrigger && (
          <div className="qroko-blocks-box-background"></div>
        )}
        {attributes.borderTrigger && (
          <div className="qroko-blocks-box-border"></div>
        )}
        <div className="qroko-blocks-box-inner">
          <InnerBlocks />
        </div>
      </div>
    )
  },
  save({ attributes, className }) {
    const calcMaxWidth = attributes.maxWidthTrigger
      ? attributes.maxWidth + "px"
      : "none"
    const calcOpacity = (value) => {
      return String(value / 100)
    }
    const calcMarginRight = () => {
      switch (attributes.position) {
        case "center":
          return "auto"
        case "left":
          return "auto"
        case "right":
          return "0"
        default:
          return "auto"
      }
    }
    const calcMarginLeft = () => {
      switch (attributes.position) {
        case "center":
          return "auto"
        case "left":
          return "0"
        case "right":
          return "auto"
        default:
          return "auto"
      }
    }
    const calcPadding = (value) => {
      const currentBorderWidth = attributes.borderTrigger
        ? attributes.borderWidth
        : 0
      return currentBorderWidth + value + "px"
    }
    const boxVariables = {
      "--qroko-blocks-box-max-width": calcMaxWidth,
      "--qroko-blocks-box-margin-right": calcMarginRight(),
      "--qroko-blocks-box-margin-left": calcMarginLeft(),
      "--qroko-blocks-box-radius": attributes.radius + "px",
      "--qroko-blocks-box-background-color": attributes.backgroundColor,
      "--qroko-blocks-box-background-opacity": calcOpacity(
        attributes.backgroundOpacity
      ),
      "--qroko-blocks-box-border-width": attributes.borderWidth + "px",
      "--qroko-blocks-box-border-style": attributes.borderStyle,
      "--qroko-blocks-box-border-color": attributes.borderColor,
      "--qroko-blocks-box-border-opacity": calcOpacity(
        attributes.borderOpacity
      ),
      "--qroko-blocks-box-inner-padding-top": calcPadding(
        attributes.innerPaddingTop
      ),
      "--qroko-blocks-box-inner-padding-right": calcPadding(
        attributes.innerPaddingRight
      ),
      "--qroko-blocks-box-inner-padding-bottom": calcPadding(
        attributes.innerPaddingBottom
      ),
      "--qroko-blocks-box-inner-padding-left": calcPadding(
        attributes.innerPaddingLeft
      ),
    }
    return (
      <div
        className={classNames(className, "qroko-blocks-box")}
        style={boxVariables}
      >
        {attributes.backgroundTrigger && (
          <div className="qroko-blocks-box-background"></div>
        )}
        {attributes.borderTrigger && (
          <div className="qroko-blocks-box-border"></div>
        )}
        <div className="qroko-blocks-box-inner">
          <InnerBlocks.Content />
        </div>
      </div>
    )
  },
})
