import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import {
  InspectorControls,
  PanelColorSettings,
  InnerBlocks,
} from "@wordpress/block-editor"
import {
  PanelBody,
  BaseControl,
  RadioControl,
  RangeControl,
  ToggleControl,
  TextControl,
} from "@wordpress/components"
import classNames from "classnames"

import "./editor.css"

const anglePositionList = [
  { label: __("Left", "qroko-blocks"), value: "left" },
  { label: __("Right", "qroko-blocks"), value: "right" },
]

registerBlockType("qroko-blocks/compact-box", {
  title: __("Compact Box", "qroko-blocks"),
  description: __(
    "It can be folded up to hold content. I recommend using it for storing spoilers and long asides.",
    "qroko-blocks"
  ),
  category: "qroko",
  icon: (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        d="M2 5v7.5c0 .864.642 1.5 1.357 1.5h9.286c.715 0 1.357-.636 1.357-1.5V5h1v7.5c0 1.345-1.021 2.5-2.357 2.5H3.357C2.021 15 1 13.845 1 12.5V5h1z"
      />
      <path
        fill-rule="evenodd"
        d="M5.5 7.5A.5.5 0 0 1 6 7h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5zM15 2H1v2h14V2zM1 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1z"
      />
    </svg>
  ),
  supports: {
    anchor: true,
    className: true,
    customClassName: true,
  },
  attributes: {
    title: {
      type: "string",
      default: "",
    },
    badgeActive: {
      type: "boolean",
      default: false,
    },
    badgeText: {
      type: "string",
      default: "",
    },
    angleActive: {
      type: "boolean",
      default: true,
    },
    anglePosition: {
      type: "string",
      default: "left",
    },
    open: {
      type: "boolean",
      default: false,
    },
  },
  edit({ attributes, className, setAttributes }) {
    return (
      <div className={classNames(className, "qroko-blocks-compact-box")}>
        <InspectorControls>
          <PanelBody title={__("Title", "qroko-blocks")}>
            <BaseControl>
              <TextControl
                value={attributes.title}
                onChange={(value) => {
                  setAttributes({ title: value })
                }}
              />
            </BaseControl>
          </PanelBody>
          <PanelBody title={__("Angle", "qroko-blocks")}>
            <BaseControl>
              <RadioControl
                label={__("Angle Position", "qroko-blocks")}
                selected={attributes.anglePosition}
                options={anglePositionList}
                onChange={(option) => {
                  setAttributes({
                    anglePosition: option,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
        </InspectorControls>
        <div className="qroko-blocks-compact-box-details">
          <div className="qroko-blocks-compact-box-summary">
            <TextControl
              value={attributes.title}
              onChange={(value) => {
                setAttributes({ title: value })
              }}
            />
          </div>
          <div className="qroko-blocks-compact-box-body">
            <InnerBlocks />
          </div>
        </div>
      </div>
    )
  },
  save({ attributes, className }) {
    return (
      <div className={classNames(className, "qroko-blocks-compact-box")}>
        <details className="qroko-blocks-compact-box-details">
          <summary className="qroko-blocks-compact-box-summary">
            {attributes.title}
          </summary>
          <div className="qroko-blocks-compact-box-body">
            <InnerBlocks.Content />
          </div>
        </details>
      </div>
    )
  },
})
