import React, { forwardRef, type PropsWithChildren } from 'react'
import { type DOMElement } from '../rendere/dom'

/**
 * `<Box>` is an essential Edison component to build. It's like `<div style="display: flex">` in the browser.
 */
const Box = forwardRef<DOMElement, PropsWithChildren>(({ children }, ref) => {
  return <edison-box ref={ref}>{children}</edison-box>
})

Box.displayName = 'Box'

export default Box
