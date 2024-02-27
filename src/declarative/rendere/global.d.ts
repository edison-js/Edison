import { type ReactNode, type Key, type LegacyRef } from 'react'
import { type DOMElement } from './dom.js'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'edison-box': Edison.Box
      'edison-text': Edison.Text
    }
  }
}

declare namespace Edison {
  type Box = {
    internal_static?: boolean
    children?: ReactNode
    key?: Key
    ref?: LegacyRef<DOMElement>
  }

  type Text = {
    children?: ReactNode
    key?: Key

    internal_transform?: (children: string, index: number) => string
  }
}
