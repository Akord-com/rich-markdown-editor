import {
  AkordBoldIcon,
  AkordHeading1Icon,
  AkordHeading2Icon,
  AkordHeading3Icon,
  AkordBulletListIcon,
  AkordNumberedListIcon,
  CodeIcon,
  BlockQuoteIcon,
  LinkIcon,
  StrikethroughIcon,
  TodoListIcon,
  InputIcon,
  HighlightIcon
} from '@akord/outline-icons'
import { isInTable } from 'prosemirror-tables'
import { EditorState } from 'prosemirror-state'
import isInList from '../queries/isInList'
import isMarkActive from '../queries/isMarkActive'
import isNodeActive from '../queries/isNodeActive'
import { MenuItem } from '../types'
import baseDictionary from '../dictionary'

export default function formattingMenuItems(
  state: EditorState,
  isTemplate: boolean,
  dictionary: typeof baseDictionary
): MenuItem[] {
  const { schema } = state
  const isTable = isInTable(state)
  const isList = isInList(state)
  const allowBlocks = !isTable && !isList

  return [
    {
      name: 'placeholder',
      tooltip: dictionary.placeholder,
      icon: InputIcon,
      active: isMarkActive(schema.marks.placeholder),
      visible: isTemplate
    },
    {
      name: 'separator',
      visible: isTemplate
    },
    {
      name: 'strong',
      tooltip: dictionary.strong,
      icon: AkordBoldIcon,
      active: isMarkActive(schema.marks.strong)
    },
    {
      name: 'strikethrough',
      tooltip: dictionary.strikethrough,
      icon: StrikethroughIcon,
      active: isMarkActive(schema.marks.strikethrough)
    },
    {
      name: 'highlight',
      tooltip: dictionary.mark,
      icon: HighlightIcon,
      active: isMarkActive(schema.marks.highlight),
      visible: !isTemplate
    },
    {
      name: 'code_inline',
      tooltip: dictionary.codeInline,
      icon: CodeIcon,
      active: isMarkActive(schema.marks.code_inline)
    },
    {
      name: 'separator',
      visible: allowBlocks
    },
    {
      name: 'heading',
      tooltip: dictionary.heading,
      icon: AkordHeading1Icon,
      active: isNodeActive(schema.nodes.heading, { level: 1 }),
      attrs: { level: 1 },
      visible: allowBlocks
    },
    {
      name: 'heading',
      tooltip: dictionary.subheading,
      icon: AkordHeading2Icon,
      active: isNodeActive(schema.nodes.heading, { level: 2 }),
      attrs: { level: 2 },
      visible: allowBlocks
    },
    {
      name: 'heading',
      tooltip: dictionary.subheading,
      icon: AkordHeading3Icon,
      active: isNodeActive(schema.nodes.heading, { level: 3 }),
      attrs: { level: 3 },
      visible: allowBlocks
    },
    {
      name: 'blockquote',
      tooltip: dictionary.quote,
      icon: BlockQuoteIcon,
      active: isNodeActive(schema.nodes.blockquote),
      attrs: { level: 2 },
      visible: allowBlocks
    },
    {
      name: 'separator',
      visible: allowBlocks || isList
    },
    {
      name: 'checkbox_list',
      tooltip: dictionary.checkboxList,
      icon: TodoListIcon,
      keywords: 'checklist checkbox task',
      active: isNodeActive(schema.nodes.checkbox_list),
      visible: allowBlocks || isList
    },
    {
      name: 'bullet_list',
      tooltip: dictionary.bulletList,
      icon: AkordBulletListIcon,
      active: isNodeActive(schema.nodes.bullet_list),
      visible: allowBlocks || isList
    },
    {
      name: 'ordered_list',
      tooltip: dictionary.orderedList,
      icon: AkordNumberedListIcon,
      active: isNodeActive(schema.nodes.ordered_list),
      visible: allowBlocks || isList
    },
    {
      name: 'separator'
    },
    {
      name: 'link',
      tooltip: dictionary.createLink,
      icon: LinkIcon,
      active: isMarkActive(schema.marks.link),
      attrs: { href: '' }
    }
  ]
}
