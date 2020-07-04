import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
//import { InnerBlocks } from "@wordpress/block-editor"
//import { TextControl } from "@wordpress/components"
//import apiFetch from "@wordpress/api-fetch"
import { CreditCard } from "react-feather"
//import classnames from "classnames"

import "./editor.css"

registerBlockType("qroko-blocks/blog-card", {
  title: __("ブログカード", "qroko-blocks"),
  category: "qroko",
  icon: <CreditCard stroke={"#555d66"} style={{ fill: "none" }} />,
  edit: (props) => {
    let forms = new FormData()
    forms.append("action", "open_graph")
    forms.append("target_url", "https://qranoko.jp")

    fetch(ajaxurl, {
      method: "POST",
      body: forms,
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
    return <div className={props.className}>test</div>
  },
  save: (props) => {
    return <div className={props.className}>test</div>
  },
})
