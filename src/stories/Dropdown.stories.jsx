import {
  SortDropdown,
  SortDropdownItem,
  MenuDropdown,
  MenuDropdownItem,
} from '../components/Dropdown'

import { ReactComponent as IcEdit } from '../assets/icons/ic_edit.svg'
import { ReactComponent as IcClose } from '../assets/icons/ic_close.svg'

export default {
  title: 'Dropdown',
}

const SortTemplate = (args) => (
  <SortDropdown
    onChange={(selected = '인기순') => {
      console.log(`${selected} 정렬`)
    }}
  >
    <SortDropdownItem>인기순</SortDropdownItem>
    <SortDropdownItem>최신순</SortDropdownItem>
  </SortDropdown>
)

export const SortDropdowns = SortTemplate.bind({})
SortDropdowns.args = {
  onChange: (selected = '인기순') => {
    console.log(`${selected} 정렬`)
  },
}

const MenuTemplate = (args) => (
  <MenuDropdown {...args}>
    <MenuDropdownItem
      onClick={() => {
        console.log('수정하기')
      }}
    >
      <IcEdit />
      수정하기
    </MenuDropdownItem>
    <MenuDropdownItem
      onClick={() => {
        console.log('삭제하기')
      }}
    >
      <IcClose />
      삭제하기
    </MenuDropdownItem>
  </MenuDropdown>
)

export const MenuDropdowns = MenuTemplate.bind({})
MenuDropdowns.args = {}
