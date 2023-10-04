test('jest.fn()のサンプル', () => {
  const mockFn = jest.fn()
  mockFn()
  mockFn(1, 2, 3)

  // mockFnが2回呼ばれていること
  expect(mockFn).toHaveBeenCalledTimes(2)

  // mockFnの引数に1, 2, 3が渡されていること
  expect(mockFn).toHaveBeenCalledWith(1, 2, 3)

  // mockFnの引数に1, 2, 3, 4が渡されていないこと
  expect(mockFn).not.toHaveBeenCalledWith(1, 2, 3, 4)
})
