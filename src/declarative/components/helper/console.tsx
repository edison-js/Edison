import type React from 'react'

type ValueProps = {
  value: number
}

export const ConsoleLog: React.FC<ValueProps> = (props) => {
  console.log(props)
  return null
}
