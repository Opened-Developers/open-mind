import Badge from '../components/Badges'

export default {
  title: 'Badges',
  argTypes: {
    color: { control: 'radio', options: ['brown', 'gray'] },
  },
}

const Template = (args) => <Badge {...args} />

export const Badges = Template.bind({})
Badges.args = {
  children: '답변 완료',
  color: 'brown',
}
