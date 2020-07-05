import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { Button, TextControl } from "@wordpress/components"
//import { PlainText } from "@wordpress/block-editor"
import { MediaUpload, PlainText } from "@wordpress/editor"
import classNames from "classnames"

import "./editor.css"

registerBlockType("qroko-blocks/blog-card", {
  title: __("ブログカード", "qroko-blocks"),
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
    title: {
      type: "string",
      default: "",
    },
    description: {
      type: "string",
      default: "",
    },
  },
  edit({ attributes, className, setAttributes }) {
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
        .then((json) =>
          setAttributes({
            title: json[0].title,
            description: json[0].description,
          })
        )
        .catch((error) => {
          console.log(error)
        })
    }

    const getImageButton = (openEvent) => {
      if (attributes.imageURL) {
        return (
          <div className="qroko-blocks-blog-card-image-wrap">
            <img
              src={attributes.imageURL}
              onClick={openEvent}
              className="qroko-blocks-blog-card-image"
            />
          </div>
        )
      } else {
        return (
          <div className="qroko-blocks-blog-card-image-button-wrap">
            <Button onClick={openEvent} className="button">
              {__("画像を上書き", "qroko-blocks")}
            </Button>
          </div>
        )
      }
    }

    return (
      <div className={classNames(className, "qroko-blocks-blog-card")}>
        <div className="qroko-blocks-blog-card-columns is-padding is-gap is-bottom">
          <div className="qroko-blocks-blog-card-column is-flex-grow">
            <TextControl
              label={__("リンク先URL", "qroko-blocks")}
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
              {__("情報を取得", "qroko-blocks")}
            </Button>
          </div>
        </div>
        <div className="qroko-blocks-blog-card-columns">
          <div className="qroko-blocks-blog-card-column is-padding is-flex-none">
            {attributes.imageURL ? (
              <div className="qroko-blocks-blog-card-image-wrap">
                <img
                  src={attributes.imageURL}
                  className="qroko-blocks-blog-card-image"
                />
              </div>
            ) : (
              ""
            )}
            <div className="qroko-blocks-blog-card-columns is-padding is-gap">
              <div className="qroko-blocks-blog-card-column is-flex-none">
                <Button className="button is-small">
                  {__("画像上書き", "qroko-blocks")}
                </Button>
              </div>
              <div className="qroko-blocks-blog-card-column is-flex-none">
                <Button className="button is-small">
                  {__("画像クリア", "qroko-blocks")}
                </Button>
              </div>
            </div>
            {/*<div className="qroko-blocks-blog-card-column is-flex-none">
            <MediaUpload
              onSelect={(media) => {
                setAttributes({ imageAlt: media.alt, imageURL: media.url })
              }}
              type="image"
              value={attributes.imageID}
              render={({ open }) => getImageButton(open)}
            />
          </div>*/}
          </div>
          <div className="qroko-blocks-blog-card-column is-padding is-flex-grow">
            <div className="qroko-blocks-blog-card-heading">
              <PlainText
                onChange={(content) => setAttributes({ title: content })}
                value={attributes.title}
                placeholder={__("タイトル", "qroko-blocks")}
                className="qroko-blocks-blog-card-heading"
              />
            </div>
            <div className="qroko-blocks-blog-card-description">
              <PlainText
                onChange={(content) => setAttributes({ description: content })}
                value={attributes.description}
                placeholder={__("ディスクリプション", "qroko-blocks")}
              />
            </div>
            {attributes.url ? (
              <div className="qroko-blocks-blog-card-domain">
                {attributes.url}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    )
  },
  save({ attributes, className }) {
    return <div className={props.className}>test</div>
  },
})
