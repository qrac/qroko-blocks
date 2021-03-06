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

const formatTriggerSize = ({ trigger, size }) => {
  return trigger ? size + "px" : "none"
}

const formatPositionMarginRight = ({ position }) => {
  return position === "right" ? "0" : "auto"
}

const formatPositionMarginLeft = ({ position }) => {
  return position === "left" ? "0" : "auto"
}

const formatHexToRgb = ({ hex }) => {
  if (hex === undefined || hex === null) hex = "#ffffff"
  if (hex.slice(0, 1) == "#") hex = hex.slice(1)
  if (hex.length == 3)
    hex =
      hex.slice(0, 1) +
      hex.slice(0, 1) +
      hex.slice(1, 2) +
      hex.slice(1, 2) +
      hex.slice(2, 3) +
      hex.slice(2, 3)
  return {
    red: parseInt(hex.slice(0, 2), 16),
    green: parseInt(hex.slice(2, 4), 16),
    blue: parseInt(hex.slice(4, 6), 16),
  }
}

const formatRgbWithAlpha = ({ rgb, alpha }) => {
  return `rgb(${rgb.red} ${rgb.green} ${rgb.blue} / ${alpha}%)`
}

const formatBackground = ({ trigger, color, opacity }) => {
  if (trigger) {
    const rgba = formatRgbWithAlpha({
      rgb: formatHexToRgb({ hex: color }),
      alpha: opacity,
    })
    return `${rgba}`
  } else {
    return "none"
  }
}

const formatBorder = ({ trigger, color, opacity, size, style }) => {
  if (trigger) {
    const rgba = formatRgbWithAlpha({
      rgb: formatHexToRgb({ hex: color }),
      alpha: opacity,
    })
    return `${size}px ${style} ${rgba}`
  } else {
    return "none"
  }
}

const formatShadow = ({
  trigger,
  color,
  opacity,
  shadowX,
  shadowY,
  shadowBlur,
  shadowSpread,
}) => {
  if (trigger) {
    const rgba = formatRgbWithAlpha({
      rgb: formatHexToRgb({ hex: color }),
      alpha: opacity,
    })
    return `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${rgba}`
  } else {
    return "none"
  }
}

const formatSquareSize = ({ top, right, bottom, left }) => {
  return `${top}px ${right}px ${bottom}px ${left}px`
}

const boxVariables = ({ attributes }) => ({
  "--qroko-blocks-box-max-width": formatTriggerSize({
    trigger: attributes.maxWidthTrigger,
    size: attributes.maxWidth,
  }),
  "--qroko-blocks-box-margin-right": formatPositionMarginRight({
    position: attributes.position,
  }),
  "--qroko-blocks-box-margin-left": formatPositionMarginLeft({
    position: attributes.position,
  }),
  "--qroko-blocks-box-radius": attributes.radius + "px",
  "--qroko-blocks-box-background": formatBackground({
    trigger: attributes.backgroundTrigger,
    color: attributes.backgroundColor,
    opacity: attributes.backgroundOpacity,
  }),
  "--qroko-blocks-box-border": formatBorder({
    trigger: attributes.borderTrigger,
    color: attributes.borderColor,
    opacity: attributes.borderOpacity,
    size: attributes.borderWidth,
    style: attributes.borderStyle,
  }),
  "--qroko-blocks-box-shadow": formatShadow({
    trigger: attributes.shadowTrigger,
    color: attributes.shadowColor,
    opacity: attributes.shadowOpacity,
    shadowX: attributes.shadowX,
    shadowY: attributes.shadowY,
    shadowBlur: attributes.shadowBlur,
    shadowSpread: attributes.shadowSpread,
  }),
  "--qroko-blocks-box-padding": formatSquareSize({
    top: attributes.innerPaddingTop,
    right: attributes.innerPaddingRight,
    bottom: attributes.innerPaddingBottom,
    left: attributes.innerPaddingLeft,
  }),
})

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
  supports: {
    anchor: true,
    className: true,
    customClassName: true,
  },
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
      default: "#f2f2f2",
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
      default: "#e4e4e4",
    },
    borderOpacity: {
      type: "number",
      default: 100,
    },
    shadowTrigger: {
      type: "boolean",
      default: false,
    },
    shadowX: {
      type: "number",
      default: 0,
    },
    shadowY: {
      type: "number",
      default: 8,
    },
    shadowBlur: {
      type: "number",
      default: 8,
    },
    shadowSpread: {
      type: "number",
      default: -4,
    },
    shadowColor: {
      type: "string",
      default: "#000000",
    },
    shadowOpacity: {
      type: "number",
      default: 12,
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
    return (
      <div
        className={classNames(className, "qroko-blocks-box")}
        style={boxVariables({ attributes: attributes })}
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
                resetFallbackValue={1000}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    maxWidth: value,
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
              <RangeControl
                value={attributes.radius}
                label={__("Round Shape (px)", "qroko-blocks")}
                min={0}
                max={40}
                initialPosition={4}
                resetFallbackValue={4}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    radius: value,
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
                resetFallbackValue={100}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    backgroundOpacity: value,
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
                resetFallbackValue={1}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    borderWidth: value,
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
                resetFallbackValue={100}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    borderOpacity: value,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
          <PanelBody title={__("Shadow", "qroko-blocks")}>
            <BaseControl>
              <ToggleControl
                label={__("Use the Shadow", "qroko-blocks")}
                onChange={() => {
                  setAttributes({
                    shadowTrigger: !attributes.shadowTrigger,
                  })
                }}
                checked={attributes.shadowTrigger}
              />
            </BaseControl>
            <BaseControl>
              <RangeControl
                value={attributes.shadowX}
                label={__("X Offset (px)", "qroko-blocks")}
                min={-40}
                max={40}
                initialPosition={0}
                resetFallbackValue={0}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    shadowX: value,
                  })
                }}
              />
              <RangeControl
                value={attributes.shadowY}
                label={__("Y Offset (px)", "qroko-blocks")}
                min={-40}
                max={40}
                initialPosition={8}
                resetFallbackValue={8}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    shadowY: value,
                  })
                }}
              />
              <RangeControl
                value={attributes.shadowBlur}
                label={__("Blur (px)", "qroko-blocks")}
                min={0}
                max={40}
                initialPosition={8}
                resetFallbackValue={8}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    shadowBlur: value,
                  })
                }}
              />
              <RangeControl
                value={attributes.shadowSpread}
                label={__("Spread (px)", "qroko-blocks")}
                min={-40}
                max={40}
                initialPosition={-4}
                resetFallbackValue={-4}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    shadowSpread: value,
                  })
                }}
              />
            </BaseControl>
            <BaseControl label={__("Color", "qroko-blocks")}>
              <ColorPalette
                value={attributes.shadowColor}
                onChange={(value) =>
                  setAttributes({
                    shadowColor: value,
                  })
                }
              />
            </BaseControl>
            <BaseControl>
              <RangeControl
                value={attributes.shadowOpacity}
                label={__("Opacity", "qroko-blocks")}
                min={0}
                max={100}
                initialPosition={12}
                resetFallbackValue={12}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    shadowOpacity: value,
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
                resetFallbackValue={16}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingTop: value,
                  })
                }}
              />
              <RangeControl
                value={attributes.innerPaddingRight}
                label={__("Padding Right (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={16}
                resetFallbackValue={16}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingRight: value,
                  })
                }}
              />
              <RangeControl
                value={attributes.innerPaddingBottom}
                label={__("Padding Bottom (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={16}
                resetFallbackValue={16}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingBottom: value,
                  })
                }}
              />
              <RangeControl
                value={attributes.innerPaddingLeft}
                label={__("Padding Left (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={16}
                resetFallbackValue={16}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingLeft: value,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
        </InspectorControls>
        <InnerBlocks />
      </div>
    )
  },
  save({ attributes, className }) {
    return (
      <div
        className={classNames(className, "qroko-blocks-box")}
        style={boxVariables({ attributes: attributes })}
      >
        <InnerBlocks.Content />
      </div>
    )
  },
})
