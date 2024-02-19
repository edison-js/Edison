import Yoga from 'yoga-wasm-web/auto'
import { type DOMElement } from './dom'
import type Output from './output'

// If parent container is `<Box>`, text nodes will be treated as separate nodes in
// the tree and will have their own coordinates in the layout.
// To ensure text nodes are aligned correctly, take X and Y of the first text node
// and use it as offset for the rest of the nodes
// Only first node is taken into account, because other text nodes can't have margin or padding,
// so their coordinates will be relative to the first node anyway

export type OutputTransformer = (s: string, index: number) => string

// After nodes are laid out, render each to output object, which later gets rendered to terminal
const renderNodeToOutput = (
  node: DOMElement,
  output: Output,
  options: {
    offsetX?: number
    offsetY?: number
    transformers?: OutputTransformer[]
    skipStaticElements: boolean
  },
) => {
  const {
    offsetX = 0,
    offsetY = 0,
    transformers = [],
    skipStaticElements,
  } = options

  if (skipStaticElements && node.internal_static) {
    return
  }

  const { yogaNode } = node

  if (yogaNode) {
    if (yogaNode.getDisplay() === Yoga.DISPLAY_NONE) {
      return
    }

    // Left and top positions in Yoga are relative to their parent node
    const x = offsetX + yogaNode.getComputedLeft()
    const y = offsetY + yogaNode.getComputedTop()

    // Transformers are functions that transform final text output of each component
    // See Output class for logic that applies transformers
    let newTransformers = transformers

    if (typeof node.internal_transform === 'function') {
      newTransformers = [node.internal_transform, ...transformers]
    }

    const clipped = false

    if (node.nodeName === 'edison-root' || node.nodeName === 'edison-box') {
      for (const childNode of node.childNodes) {
        renderNodeToOutput(childNode as DOMElement, output, {
          offsetX: x,
          offsetY: y,
          transformers: newTransformers,
          skipStaticElements,
        })
      }

      if (clipped) {
        output.unclip()
      }
    }
  }
}

export default renderNodeToOutput
