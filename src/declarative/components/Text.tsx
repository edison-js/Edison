import React, { type ReactNode } from 'react'

export type Props = {
  /**
   * This property tells Edison to wrap or truncate text if its width is larger than container.
   * If `wrap` is passed (by default), Edison will wrap text and split it into multiple lines.
   * If `truncate-*` is passed, Edison will truncate text instead, which will result in one line of text with the rest cut off.
   */

  readonly children?: ReactNode
}

/**
 * This component can display text, and change its style to make it colorful, bold, underline, italic or strikethrough.
 */
export default function Text({ children }: Props) {
  if (children === undefined || children === null) {
    return null
  }

  return <edison-text>{children}</edison-text>
}
