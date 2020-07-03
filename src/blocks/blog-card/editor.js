import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
//import { InnerBlocks } from "@wordpress/block-editor"
//import { TextControl } from "@wordpress/components"
//import classnames from "classnames"

import "./editor.css"

registerBlockType("qroko-blocks/blog-card", {
  title: __("ブログカード", "qroko-blocks"),
  category: "qroko",
  icon: "index-card",
  edit: (props) => {
    return <div className={props.className}>test</div>
  },
  save: (props) => {
    return <div className={props.className}>test</div>
  },
})
