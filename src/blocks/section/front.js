import "./front.css"

const removeScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.body.clientWidth

  //console.log(scrollbarWidth)

  const css = `:root { --scrollbar-width: ${scrollbarWidth}px; }`
  const head = document.head || document.getElementsByTagName("head")[0]
  const style = document.createElement("style")

  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}

removeScrollbarWidth()
