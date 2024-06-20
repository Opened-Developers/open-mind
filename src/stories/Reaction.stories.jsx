import { Like, Dislike } from '../components/Reaction'

export default {
  title: 'Reaction',
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

const LikeTemplate = (args) => <Like {...args} />
export const Likes = LikeTemplate.bind({})
Likes.args = {
  counter: 12,
  isSelected: false,
  onClick: () => {
    console.log('좋아요 누르기')
  },
}

const DislikeTemplate = (args) => <Dislike {...args} />
export const Dislikes = DislikeTemplate.bind({})
Dislikes.args = {
  onClick: () => {
    console.log('싫어요 누르기')
  },
  isSelected: false,
}
