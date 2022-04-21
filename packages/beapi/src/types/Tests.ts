// Import types.
import type { Test } from 'mojang-gametest'

export interface RegisteredTest {
  class: string
  name: string
  callback: (data: Test) => void
}
