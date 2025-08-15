// src/Tiptap.tsx
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder';

import { useEffect } from 'react';

import { EditorIconButtons } from './components/EditorIconButtons';
import BoldIcon from './assets/icons/editor/bold.svg?react';
import ItalicIcon from './assets/icons/editor/italic.svg?react';
import StrikeIcon from './assets/icons/editor/strikethrough.svg?react';
import ParagraphIcon from './assets/icons/editor/paragraph.svg?react';import H2Icon from './assets/icons/editor/h-2.svg?react';
import H3Icon from './assets/icons/editor/h-3.svg?react';
import H4Icon from './assets/icons/editor/h-4.svg?react';
import BulletListIcon from './assets/icons/editor/list-unordered.svg?react';
import OrderedListIcon from './assets/icons/editor/list-ordered.svg?react';
import BlockquoteIcon from './assets/icons/editor/align-justify.svg?react';
import UndoIcon from './assets/icons/editor/arrow-go-back-line.svg?react';
import RedoIcon from './assets/icons/editor/arrow-go-forward-line.svg?react';
import HorizontalRuleIcon from './assets/icons/editor/separator.svg?react';
import NoTextFormatIcon from './assets/icons/editor/format-clear.svg?react';
import NoStructuralFormatIcon from './assets/icons/editor/close-line.svg?react';


type TiptapProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

const extensions = [
  TextStyle,
  StarterKit,
  Placeholder.configure({ placeholder: 'Write here…' }),
];

function MenuBar({ editor }: { editor: Editor }) {
  
  const editorState = useEditorState({
    editor,
    selector: ctx => ({
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,

        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,

        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,

        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,

        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
    }),
  });

  return (
    <div className="control-group">
      <div className="button-group">
        <EditorIconButtons
          label='bold'
          active={editor.isActive('bold')}
          disabled={!editorState.canBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon className='w-5 h-5' />
        </EditorIconButtons>

        <EditorIconButtons
          label='italic'
          active={editor.isActive('italic')}
          disabled={!editorState.canItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className='w-5 h-5' />
        </EditorIconButtons>

        <EditorIconButtons
          label='strike'
          active={editor.isActive('strike')}
          disabled={!editorState.canStrike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikeIcon className='w-5 h-5' />
        </EditorIconButtons>
        
        <EditorIconButtons
          label='paragraph'
          active={editor.isActive('paragraph')}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <ParagraphIcon className='w-5 h-5'/>
        </EditorIconButtons>

        <EditorIconButtons
          label="Heading 2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <H2Icon className="w-5 h-5" />
        </EditorIconButtons>

        <EditorIconButtons
          label="Heading 3"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <H3Icon className="w-5 h-5" />
        </EditorIconButtons>

        <EditorIconButtons
          label="Heading 4"
          active={editor.isActive('heading', { level: 4 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        >
          <H4Icon className="w-5 h-5" />
        </EditorIconButtons>

        <EditorIconButtons
          label="Bullet List"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <BulletListIcon className="w-5 h-5" />
        </EditorIconButtons>

        <EditorIconButtons
          label="Ordered List"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <OrderedListIcon className="w-5 h-5" />
        </EditorIconButtons>

        <EditorIconButtons
          label="Blockquote"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <BlockquoteIcon className="w-5 h-5" />
        </EditorIconButtons>
        
        <EditorIconButtons
          label="Remove Text Formatting"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <NoTextFormatIcon className="w-5 h-5" />
        </EditorIconButtons>

        <EditorIconButtons
          label="Remove Structural Formatting"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <NoStructuralFormatIcon className="w-5 h-5" />
        </EditorIconButtons>

        <EditorIconButtons
          label="Horizontal Rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <HorizontalRuleIcon className="w-5 h-5" />
        </EditorIconButtons>

        <EditorIconButtons
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon className="w-5 h-5" />
        </EditorIconButtons>

        <EditorIconButtons
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon className="w-5 h-5" />
        </EditorIconButtons>
      </div>
    </div>
  );
}

const Tiptap: React.FC<TiptapProps> = ({value, onChange, placeholder, className}) => {

  const editor = useEditor({
    extensions: [
        ...extensions.map((ext: any) =>
            ext.name === 'placeholder' && placeholder
                ? (ext as any).configure({placeholder})
                : ext
        ),
    ],
    content: value ||'',
    onUpdate: ({editor}) => onChange(editor.getHTML()),
    editorProps: {
        attributes: {
            class:
            'tiptap-content max-w-none min-h-[144px] p-4 rounded-xl bg-gray-200 ' +
            (className || ''),
        },
    },
  });

  useEffect(() => {
    if(!editor) return;
    const html = editor.getHTML();
    if ((value || '') !== html) {
        editor.commands.setContent(value || '', {emitUpdate: false});
    }
  }, [value, editor]);

  if(!editor) return null;

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap