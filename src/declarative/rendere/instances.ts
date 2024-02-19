// Store all instances of Edison (instance.js) to ensure that consecutive render() calls
// use the same instance of Edison and don't create a new one
//
// This map has to be stored in a separate file, because render.js creates instances,
// but instance.js should delete itself from the map on unmount

import type Edison from './edison'

const instances = new WeakMap<NodeJS.WriteStream, Edison>()
export default instances
