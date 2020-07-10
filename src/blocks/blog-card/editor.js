import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { InspectorControls, MediaUpload } from "@wordpress/block-editor"
import {
  PanelBody,
  BaseControl,
  TextareaControl,
  RangeControl,
  RadioControl,
  TextControl,
  Button,
} from "@wordpress/components"
import classNames from "classnames"

import "./editor.css"

const imagePositionList = [
  { label: __("Left", "qroko-blocks"), value: "left" },
  { label: __("Right", "qroko-blocks"), value: "right" },
]

const imageFitList = [
  { label: __("Cover", "qroko-blocks"), value: "cover" },
  { label: __("Contain", "qroko-blocks"), value: "contain" },
]

registerBlockType("qroko-blocks/blog-card", {
  title: __("Blog Card", "qroko-blocks"),
  description: __(
    "Block to create a card link. You can also edit it after getting the Open Graph from the link URL.",
    "qroko-blocks"
  ),
  category: "qroko",
  icon: (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
      />
      <path
        fill-rule="evenodd"
        d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  ),
  attributes: {
    url: {
      type: "string",
      default: "",
    },
    title: {
      type: "string",
      default: "",
    },
    description: {
      type: "string",
      default: "",
    },
    imageID: {
      type: "number",
      default: 0,
    },
    imageURL: {
      type: "string",
      default: "",
    },
    imageAlt: {
      type: "string",
      default: "",
    },
    imagePosition: {
      type: "string",
      default: "left",
    },
    imageFit: {
      type: "string",
      default: "cover",
    },
    ogDomain: {
      type: "string",
      default: "",
    },
    ogTitleCharacterCount: {
      type: "number",
      default: 50,
    },
    ogDescriptionCharacterCount: {
      type: "number",
      default: 60,
    },
    ogImageURL: {
      type: "string",
      default: "",
    },
    externalLink: {
      type: "boolean",
      default: true,
    },
  },
  edit({ attributes, className, setAttributes, isSelected }) {
    const loadOpenGraph = (url) => {
      let forms = new FormData()
      forms.append("action", "open_graph")
      forms.append("target_url", url)

      fetch(ajaxurl, {
        method: "POST",
        body: forms,
        cache: "no-cache",
      })
        .then((res) => res.json())
        //.then((data) => console.log(data))
        .then((json) => {
          let cloneJson = json
          setOpenGraph(cloneJson[0])
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const setOpenGraph = (data) => {
      const openGraphUrl = new URL(data.url)
      const openGraphDomain = openGraphUrl.hostname
      const currentDomain = location.hostname

      const openGraphTitle = () => {
        const count = attributes.ogTitleCharacterCount
        const length = data.title ? data.title.length : 0
        if (length >= count) {
          return data.title.substr(0, count) + " ..."
        } else {
          return data.title
        }
      }

      const openGraphDescription = () => {
        const count = attributes.ogDescriptionCharacterCount
        const length = data.description ? data.description.length : 0
        if (length >= count) {
          return data.description.substr(0, count) + " ..."
        } else {
          return data.description
        }
      }

      const checkExternalLink = () => {
        if (openGraphDomain != currentDomain) {
          return true
        } else {
          return false
        }
      }

      setAttributes({
        title: openGraphTitle(),
        description: openGraphDescription(),
        imageID: 0,
        imageURL: "",
        imageAlt: openGraphTitle(),
        ogDomain: openGraphDomain,
        ogImageURL: data.image,
        externalLink: checkExternalLink(),
      })
    }

    const DeleteImageButton = () => {
      return (
        <button
          className="qroko-blocks-blog-card-delete-image-button"
          type="button"
          onClick={() =>
            setAttributes({
              imageID: 0,
              imageAlt: "",
              imageURL: "",
              ogImageURL: "",
            })
          }
        >
          <svg
            className="icon"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
            />
            <path
              fill-rule="evenodd"
              d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
            />
          </svg>
        </button>
      )
    }

    const mediaUploadRender = (openEvent) => {
      if (attributes.imageURL || attributes.ogImageURL) {
        return (
          <div>
            <Button
              onClick={openEvent}
              className="qroko-blocks-blog-card-image-preview"
            >
              <img
                src={
                  attributes.imageURL
                    ? attributes.imageURL
                    : attributes.ogImageURL
                    ? attributes.ogImageURL
                    : ""
                }
                alt={attributes.imageAlt}
              />
            </Button>
            <Button
              onClick={() => {
                setAttributes({
                  imageID: 0,
                  imageURL: "",
                  imageAlt: "",
                  ogImageURL: "",
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
      <div className={classNames(className, "qroko-blocks-blog-card")}>
        <InspectorControls>
          <PanelBody title={__("Title", "qroko-blocks")}>
            <BaseControl>
              <TextareaControl
                value={attributes.title}
                onChange={(value) => {
                  setAttributes({ title: value })
                }}
              />
              <RangeControl
                value={attributes.ogTitleCharacterCount}
                label={__("Number of characters", "qroko-blocks")}
                min={1}
                max={200}
                initialPosition={50}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    ogTitleCharacterCount: !value ? 50 : value,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
          <PanelBody title={__("Description", "qroko-blocks")}>
            <BaseControl>
              <TextareaControl
                value={attributes.description}
                onChange={(value) => {
                  setAttributes({ description: value })
                }}
              />
              <RangeControl
                value={attributes.ogDescriptionCharacterCount}
                label={__("Number of characters", "qroko-blocks")}
                min={1}
                max={200}
                initialPosition={60}
                allowReset
                onChange={(value) => {
                  setAttributes({
                    ogDescriptionCharacterCount: !value ? 60 : value,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
          <PanelBody title={__("Image", "qroko-blocks")}>
            <BaseControl>
              <MediaUpload
                onSelect={(media) => {
                  setAttributes({
                    imageID: media.id,
                    imageURL: media.url,
                    imageAlt: media.alt,
                  })
                }}
                type={"image"}
                value={attributes.imageID}
                render={({ open }) => mediaUploadRender(open)}
              />
            </BaseControl>
            <BaseControl>
              <RadioControl
                label={__("Image position", "qroko-blocks")}
                selected={attributes.imagePosition}
                options={imagePositionList}
                onChange={(option) => {
                  setAttributes({
                    imagePosition: option,
                  })
                }}
              />
            </BaseControl>
            <BaseControl>
              <RadioControl
                label={__("Image Fit", "qroko-blocks")}
                selected={attributes.imageFit}
                options={imageFitList}
                onChange={(option) => {
                  setAttributes({
                    imageFit: option,
                  })
                }}
              />
            </BaseControl>
          </PanelBody>
        </InspectorControls>
        {attributes.title && (
          <div
            className={classNames(
              "qroko-blocks-blog-card-columns",
              attributes.imagePosition === "right" ? "is-reverse" : ""
            )}
          >
            {(attributes.imageURL || attributes.ogImageURL) && (
              <div className="qroko-blocks-blog-card-column is-flex-none">
                <div className="qroko-blocks-blog-card-image-container">
                  {isSelected && <DeleteImageButton />}
                  <div className="qroko-blocks-blog-card-image-wrap">
                    <img
                      src={
                        attributes.imageURL
                          ? attributes.imageURL
                          : attributes.ogImageURL
                          ? attributes.ogImageURL
                          : ""
                      }
                      alt={attributes.imageAlt}
                      className={classNames(
                        "qroko-blocks-blog-card-image",
                        "is-" + attributes.imageFit
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="qroko-blocks-blog-card-column is-padding is-flex-grow">
              <div className="qroko-blocks-blog-card-meta">
                {attributes.title && (
                  <div className="qroko-blocks-blog-card-heading">
                    {attributes.title}
                  </div>
                )}
                {attributes.description && (
                  <div className="qroko-blocks-blog-card-description">
                    {attributes.description}
                  </div>
                )}
                {attributes.ogDomain && (
                  <div className="qroko-blocks-blog-card-domain">
                    {attributes.ogDomain}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {(isSelected || !attributes.title) && (
          <div className="qroko-blocks-blog-card-columns is-padding is-gap is-bottom">
            <div className="qroko-blocks-blog-card-column is-flex-grow">
              <TextControl
                label={__("Link URL", "qroko-blocks")}
                value={attributes.url}
                onChange={(content) => {
                  setAttributes({ url: content })
                }}
                className="is-margin-bottom-none"
              />
            </div>
            <div className="qroko-blocks-blog-card-column is-flex-none">
              <Button
                onClick={() => loadOpenGraph(attributes.url)}
                className="button is-small"
              >
                {__("Load", "qroko-blocks")}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  },
  save({ attributes, className }) {
    return (
      <div className={classNames(className, "qroko-blocks-blog-card")}>
        {attributes.externalLink ? (
          <a
            href={attributes.url}
            target="_blank"
            rel="noopener noreferrer"
            className="qroko-blocks-blog-card-link"
          ></a>
        ) : (
          <a href={attributes.url} className="qroko-blocks-blog-card-link"></a>
        )}
        <div
          className={classNames(
            "qroko-blocks-blog-card-columns",
            attributes.imagePosition === "right" ? "is-reverse" : ""
          )}
        >
          {(attributes.imageURL || attributes.ogImageURL) && (
            <div className="qroko-blocks-blog-card-column is-flex-none">
              <div className="qroko-blocks-blog-card-image-container">
                <div className="qroko-blocks-blog-card-image-wrap">
                  <img
                    src={
                      attributes.imageURL
                        ? attributes.imageURL
                        : attributes.ogImageURL
                        ? attributes.ogImageURL
                        : ""
                    }
                    alt={attributes.imageAlt}
                    className={classNames(
                      "qroko-blocks-blog-card-image",
                      "is-" + attributes.imageFit
                    )}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="qroko-blocks-blog-card-column is-padding is-flex-grow">
            <div className="qroko-blocks-blog-card-meta">
              {attributes.title && (
                <div className="qroko-blocks-blog-card-heading">
                  {attributes.title}
                </div>
              )}
              {attributes.description && (
                <div className="qroko-blocks-blog-card-description">
                  {attributes.description}
                </div>
              )}
              {attributes.ogDomain && (
                <div className="qroko-blocks-blog-card-domain">
                  {attributes.ogDomain}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
})
