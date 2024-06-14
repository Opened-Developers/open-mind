import { InputText, Textarea } from '../components/Inputs'

export default {
  title: 'Inputs',
}

const Template = (args) => <InputText {...args} />

export const InputTexts = Template.bind({})
InputTexts.args = {
  name: 'input-name',
  id: 'input-id',
  placeholder: '이름을 입력해주세요',
  showIcon: true,
}

const TextareaTemplate = (args) => <Textarea {...args} />

export const Textareas = TextareaTemplate.bind({})
Textareas.args = {
  name: 'textarea-name',
  id: 'textarea-id',
  placeholder: '이름을 입력해주세요',
}
