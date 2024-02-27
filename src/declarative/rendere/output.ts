import { type OutputTransformer } from './render-node-to-output.js'

/**
 * "Virtual" output class
 *
 * Handles the positioning and saving of the output of each node in the tree.
 * Also responsible for applying transformations to each character of the output.
 *
 * Used to generate the final output of all nodes before writing it to actual output stream (e.g. stdout)
 */

type Operation = WriteOperation | ClipOperation | UnclipOperation

type WriteOperation = {
  type: 'write'
  x: number
  y: number
  text: string
  transformers: OutputTransformer[]
}

type ClipOperation = {
  type: 'clip'
  clip: Clip
}

type Clip = {
  x1: number | undefined
  x2: number | undefined
  y1: number | undefined
  y2: number | undefined
}

type UnclipOperation = {
  type: 'unclip'
}

export default class Output {
  private readonly operations: Operation[] = []

  write(
    x: number,
    y: number,
    text: string,
    options: { transformers: OutputTransformer[] },
  ): void {
    const { transformers } = options
    this.operations.push({
      type: 'write',
      x,
      y,
      text,
      transformers,
    })
  }

  clip(clip: Clip) {
    this.operations.push({
      type: 'clip',
      clip,
    })
  }

  unclip() {
    this.operations.push({
      type: 'unclip',
    })
  }

  get(): undefined {
    // Initialize output array with a specific set of rows, so that margin/padding at the bottom is preserved

    const clips: Clip[] = []

    for (const operation of this.operations) {
      if (operation.type === 'clip') {
        clips.push(operation.clip)
      }

      if (operation.type === 'unclip') {
        clips.pop()
      }

      if (operation.type === 'write') {
        const { text, transformers } = operation
        const lines = text.split('\n')

        // eslint-disable-next-line prefer-const
        for (let [index, line] of lines.entries()) {
          // Line can be missing if `text` is taller than height of pre-initialized `this.output`
          for (const transformer of transformers) {
            line = transformer(line, index)
          }
        }
      }
    }

    return
  }
}
