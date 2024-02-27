type Result = {
  output: string
  outputHeight: number
  staticOutput: string
}

const renderer = (): Result => {
  return {
    output: '',
    outputHeight: 0,
    staticOutput: '',
  }
}

export default renderer
