import { Children } from 'react'
import { FillButton, OutlineButton } from '../components/Buttons'

export default {
  component: FillButton,
  title: 'Buttons/fill',
}

const Template = (args) => <FillButton {...args} />

export const FillDefault = Template.bind({})
FillDefault.args = {
  children: '질문 받기',
  size: 'medium',
  disabled: false,
  iconLeft: false,
  iconRight: false,
}

const OutlineTemplate = (args) => <OutlineButton {...args} />

export const OutlineDefault = OutlineTemplate.bind({})
OutlineDefault.args = {
  children: '질문 받기',
  size: 'medium',
  disabled: false,
  iconLeft: false,
  iconRight: false,
}
