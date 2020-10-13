import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import {
  InspectorControls,
  ColorPalette,
  MediaUpload,
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

const innerPositionList = [
  { label: __("Center", "qroko-blocks"), value: "center" },
  { label: __("Left", "qroko-blocks"), value: "left" },
  { label: __("Right", "qroko-blocks"), value: "right" },
]

registerBlockType("qroko-blocks/section", {
  title: __("Section", "qroko-blocks"),
  description: __(
    "You can set up full-width sections and place content inside.",
    "qroko-blocks"
  ),
  category: "qroko",
  icon: (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"
      />
    </svg>
  ),
  attributes: {
    backgroundColor: {
      type: "string",
    },
    backgroundImageID: {
      type: "number",
      default: 0,
    },
    backgroundImageURL: {
      type: "string",
      default: "",
    },
    backgroundSize: {
      type: "string",
      default: "cover",
    },
    backgroundPosition: {
      type: "string",
      default: "center",
    },
    backgroundOpacity: {
      type: "number",
      default: 100,
    },
    innerMaxWidthTrigger: {
      type: "boolean",
      default: false,
    },
    innerMaxWidth: {
      type: "number",
      default: 1000,
    },
    innerPosition: {
      type: "string",
      default: "center",
    },
    innerPaddingTop: {
      type: "number",
      default: 32,
    },
    innerPaddingRight: {
      type: "number",
      default: 0,
    },
    innerPaddingBottom: {
      type: "number",
      default: 32,
    },
    innerPaddingLeft: {
      type: "number",
      default: 0,
    },
  },
  edit({ attributes, className, setAttributes }) {
    const calcBackgroundImageURL = attributes.backgroundImageURL
      ? `url(${attributes.backgroundImageURL})`
      : ""
    const calcBackgroundOpacity = String(attributes.backgroundOpacity / 100)
    const calcInnerMaxWidth = attributes.innerMaxWidthTrigger
      ? attributes.innerMaxWidth + "px"
      : "none"
    const calcInnerMargin = () => {
      switch (attributes.innerPosition) {
        case "center":
          return "0 auto"
        case "left":
          return "0 auto 0 0"
        case "right":
          return "0 0 0 auto"
        default:
          return "0 auto"
      }
    }
    const sectionVariables = {
      "--qroko-blocks-section-background-color": attributes.backgroundColor,
      "--qroko-blocks-section-background-image": calcBackgroundImageURL,
      "--qroko-blocks-section-background-size": attributes.backgroundSize,
      "--qroko-blocks-section-background-position":
        attributes.backgroundPosition,
      "--qroko-blocks-section-background-opacity": calcBackgroundOpacity,
      "--qroko-blocks-section-inner-max-width": calcInnerMaxWidth,
      "--qroko-blocks-section-inner-margin": calcInnerMargin(),
      "--qroko-blocks-section-inner-padding-top":
        attributes.innerPaddingTop + "px",
      "--qroko-blocks-section-inner-padding-right":
        attributes.innerPaddingRight + "px",
      "--qroko-blocks-section-inner-padding-bottom":
        attributes.innerPaddingBottom + "px",
      "--qroko-blocks-section-inner-padding-left":
        attributes.innerPaddingLeft + "px",
    }

    const mediaUploadRender = (openEvent) => {
      if (attributes.backgroundImageURL) {
        return (
          <div>
            <Button
              onClick={openEvent}
              className="qroko-blocks-section-image-preview"
            >
              <img src={attributes.backgroundImageURL} alt={""} />
            </Button>
            <Button
              onClick={() => {
                setAttributes({
                  backgroundImageID: 0,
                  backgroundImageURL: "",
                })
              }}
              className="button"
            >
              {__("Delete image", "qroko-blocks")}
            </Button>
          </div>
        )
      } else {
        return (
          <Button onClick={openEvent} className="button">
            {__("Add Image", "qroko-blocks")}
          </Button>
        )
      }
    }

    return (
      <section
        className={classNames(className, "qroko-blocks-section")}
        style={sectionVariables}
      >
        <InspectorControls>
          <PanelBody title={__("Background", "qroko-blocks")}>
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
            <BaseControl label={__("Image", "qroko-blocks")}>
              <div>
                <MediaUpload
                  onSelect={(media) => {
                    setAttributes({
                      backgroundImageID: media.id,
                      backgroundImageURL: media.url,
                    })
                  }}
                  type={"image"}
                  value={attributes.backgroundImageID}
                  render={({ open }) => mediaUploadRender(open)}
                />
              </div>
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
          <PanelBody title={__("Inner", "qroko-blocks")}>
            <BaseControl>
              <ToggleControl
                label={__("Use the Max Width", "qroko-blocks")}
                onChange={() => {
                  setAttributes({
                    innerMaxWidthTrigger: !attributes.innerMaxWidthTrigger,
                  })
                }}
                checked={attributes.innerMaxWidthTrigger}
              />
              <RangeControl
                value={attributes.innerMaxWidth}
                label={__("Max Width (px)", "qroko-blocks")}
                min={100}
                max={1600}
                initialPosition={1000}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerMaxWidth: !value ? 1000 : value,
                  })
                }}
              />
              <RadioControl
                label={__("Position", "qroko-blocks")}
                selected={attributes.innerPosition}
                options={innerPositionList}
                onChange={(option) => {
                  setAttributes({
                    innerPosition: option,
                  })
                }}
              />
              <RangeControl
                value={attributes.innerPaddingTop}
                label={__("Padding Top (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={32}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingTop: !value ? 32 : value,
                  })
                }}
              />
              <RangeControl
                value={attributes.innerPaddingRight}
                label={__("Padding Right (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={0}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingRight: !value ? 0 : value,
                  })
                }}
              />
              <RangeControl
                value={attributes.innerPaddingBottom}
                label={__("Padding Bottom (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={32}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingBottom: !value ? 32 : value,
                  })
                }}
              />
              <RangeControl
                value={attributes.innerPaddingLeft}
                label={__("Padding Left (px)", "qroko-blocks")}
                min={0}
                max={200}
                initialPosition={0}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    innerPaddingLeft: !value ? 0 : value,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
        </InspectorControls>
        <div className="qroko-blocks-section-background"></div>
        <div className="qroko-blocks-section-inner">
          <InnerBlocks />
        </div>
      </section>
    )
  },
  save({ attributes, className }) {
    const calcBackgroundImageURL = attributes.backgroundImageURL
      ? `url(${attributes.backgroundImageURL})`
      : ""
    const calcBackgroundOpacity = String(attributes.backgroundOpacity / 100)
    const calcInnerMaxWidth = attributes.innerMaxWidthTrigger
      ? attributes.innerMaxWidth + "px"
      : "none"
    const calcInnerMargin = () => {
      switch (attributes.innerPosition) {
        case "center":
          return "0 auto"
        case "left":
          return "0 auto 0 0"
        case "right":
          return "0 0 0 auto"
        default:
          return "0 auto"
      }
    }
    const sectionVariables = {
      "--qroko-blocks-section-background-color": attributes.backgroundColor,
      "--qroko-blocks-section-background-image": calcBackgroundImageURL,
      "--qroko-blocks-section-background-size": attributes.backgroundSize,
      "--qroko-blocks-section-background-position":
        attributes.backgroundPosition,
      "--qroko-blocks-section-background-opacity": calcBackgroundOpacity,
      "--qroko-blocks-section-inner-max-width": calcInnerMaxWidth,
      "--qroko-blocks-section-inner-margin": calcInnerMargin(),
      "--qroko-blocks-section-inner-padding-top":
        attributes.innerPaddingTop + "px",
      "--qroko-blocks-section-inner-padding-right":
        attributes.innerPaddingRight + "px",
      "--qroko-blocks-section-inner-padding-bottom":
        attributes.innerPaddingBottom + "px",
      "--qroko-blocks-section-inner-padding-left":
        attributes.innerPaddingLeft + "px",
    }
    return (
      <section
        className={classNames(className, "qroko-blocks-section")}
        style={sectionVariables}
      >
        <div className="qroko-blocks-section-background"></div>
        <div className="qroko-blocks-section-inner">
          <InnerBlocks.Content />
        </div>
      </section>
    )
  },
})
