import { Children } from 'react'
import { FillButton, OutlineButton } from '../components/Buttons'

export default {
  title: 'Buttons',
}

const Template = (args) => <FillButton {...args} />

export const FillButtons = Template.bind({})
FillButtons.args = {
  children: '질문 받기',
  size: 'medium',
  disabled: false,
  iconLeft: false,
  iconRight: false,
}

const OutlineTemplate = (args) => <OutlineButton {...args} />

export const OutlineButtons = OutlineTemplate.bind({})
OutlineButtons.args = {
  children: '질문 받기',
  size: 'medium',
  disabled: false,
  iconLeft: false,
  iconRight: false,
}
