import { Children } from 'react'
import { FillButton, OutlineButton, FloatButton } from '../components/Buttons'

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

const FloatingTemplate = (args) => <FloatButton {...args} />
export const FloatingButtons = FloatingTemplate.bind({})
FloatingButtons.args = {
  children: '질문 작성',
  onClick: () => {
    console.log('link')
  },
  isLink: false,
}
