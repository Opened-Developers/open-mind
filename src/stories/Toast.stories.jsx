import Toast from '../components/Toast'

export default {
  title: 'Toasts',
  argTypes: {
    status: { control: 'radio', options: ['default', 'error', 'success'] },
  },
}

const Template = (args) => <Toast {...args} />

export const Toasts = Template.bind({})
Toasts.args = {
  children: 'URL이 복사되었습니다',
  status: 'default',
}
