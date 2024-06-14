import { Children } from 'react'
import { FillButton, OutlineButton, FloatButton } from '../components/Buttons'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Buttons',
  ArgTypes: {
    onClick: { action: 'clicked' },
  },
}

const Template = (args) => <FillButton onClick={action('clicked')} {...args} />

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

const FloatingTemplate = (args) => (
  <FloatButton onClick={action('clicked')} {...args} />
)
export const FloatingButtons = FloatingTemplate.bind({})
FloatingButtons.args = {
  children: '질문 작성',
  isLink: false,
}
