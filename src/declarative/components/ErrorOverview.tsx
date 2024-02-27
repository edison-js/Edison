import * as fs from 'node:fs'
import { cwd } from 'node:process'
import React from 'react'
import StackUtils from 'stack-utils'
import codeExcerpt, { type CodeExcerpt } from 'code-excerpt'
import Box from './Box'
import Text from './Text'

// Error's source file is reported as file:///home/user/file.js
// This function removes the file://[cwd] part
const cleanupPath = (path: string | undefined): string | undefined => {
  return path?.replace(`file://${cwd()}/`, '')
}

const stackUtils = new StackUtils({
  cwd: cwd(),
  internals: StackUtils.nodeInternals(),
})

type Props = {
  readonly error: Error
}

export default function ErrorOverview({ error }: Props) {
  const stack = error.stack ? error.stack.split('\n').slice(1) : undefined
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const origin = stack ? stackUtils.parseLine(stack[0]!) : undefined
  const filePath = cleanupPath(origin?.file)
  let excerpt: CodeExcerpt[] | undefined
  let lineWidth = 0

  if (filePath && origin?.line && fs.existsSync(filePath)) {
    const sourceCode = fs.readFileSync(filePath, 'utf8')
    excerpt = codeExcerpt(sourceCode, origin.line)

    if (excerpt) {
      for (const { line } of excerpt) {
        lineWidth = Math.max(lineWidth, String(line).length)
      }
    }
  }

  return (
    <Box>
      <Box>
        <Text> ERROR </Text>

        <Text> {error.message}</Text>
      </Box>

      {origin && filePath && (
        <Box>
          <Text>
            {filePath}:{origin.line}:{origin.column}
          </Text>
        </Box>
      )}

      {origin && excerpt && (
        <Box>
          {excerpt.map(({ line, value }) => (
            <Box key={line}>
              <Box>
                <Text>{String(line).padStart(lineWidth, ' ')}:</Text>
              </Box>

              <Text>{` ${value}`}</Text>
            </Box>
          ))}
        </Box>
      )}

      {error.stack && (
        <Box>
          {error.stack
            .split('\n')
            .slice(1)
            .map((line) => {
              const parsedLine = stackUtils.parseLine(line)

              // If the line from the stack cannot be parsed, we print out the unparsed line.
              if (!parsedLine) {
                return (
                  <Box key={line}>
                    <Text>- </Text>
                    <Text>{line}</Text>
                  </Box>
                )
              }

              return (
                <Box key={line}>
                  <Text>- </Text>
                  <Text>{parsedLine.function}</Text>
                  <Text>
                    {' '}
                    ({cleanupPath(parsedLine.file) ?? ''}:{parsedLine.line}:
                    {parsedLine.column})
                  </Text>
                </Box>
              )
            })}
        </Box>
      )}
    </Box>
  )
}
