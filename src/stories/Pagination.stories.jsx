import PagenationBar from '../pages/FeedListPage/components/Pagenation'

export default {
  title: 'Pagination',
}

const Template = (args) => <PagenationBar {...args} />

export const Pagination = Template.bind({})
Pagination.args = {
  currentPage: 1,
  countPerPage: 8,
  feedCount: 32,
  onClick: () => {
    console.log('test')
  },
}
