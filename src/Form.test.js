import React from 'react'
import Form from './Form'
import renderer from 'react-test-renderer'

test('Form renders correctly', () => {
  const component = renderer.create(<Form />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
