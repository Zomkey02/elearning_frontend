// src/Tiptap.tsx
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder';

import { useEffect } from 'react';

import { EditorIconButtons } from './components/EditorIconButtons';
import { RiAlignJustify, RiAlignTop, RiArrowGoBackLine, RiArrowGoForwardLine, RiBold, RiCornerDownLeftFill, RiDeleteBin6Line, RiFormatClear, RiH2, RiH3, RiH4, RiItalic, RiListOrdered, RiListUnordered, RiParagraph, RiStrikethrough } from 'react-icons/ri';
import { IconContext } from 'react-icons';


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
    <div className="mb-1 control-group">
      <div className='flex justify-between'>
        <EditorIconButtons
          label='bold'
          active={editor.isActive('bold')}
          disabled={!editorState.canBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <IconContext value={{ size:'1.2em'}}><RiBold /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label='italic'
          active={editor.isActive('italic')}
          disabled={!editorState.canItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiItalic /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label='strike'
          active={editor.isActive('strike')}
          disabled={!editorState.canStrike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiStrikethrough /></IconContext>
        </EditorIconButtons>
        
        <EditorIconButtons
          label='paragraph'
          active={editor.isActive('paragraph')}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiParagraph /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label="Heading 2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiH2 /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label="Heading 3"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiH3 /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label="Heading 4"
          active={editor.isActive('heading', { level: 4 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiH4 /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label="Bullet List"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiListUnordered /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label="Ordered List"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiListOrdered /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label="Blockquote"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiAlignJustify /></IconContext>
        </EditorIconButtons>
        
        <EditorIconButtons
          label="Remove Text Formatting"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiFormatClear /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label="Remove Structural Formatting"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiDeleteBin6Line /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label="Hard break"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiCornerDownLeftFill /></IconContext>
        </EditorIconButtons>
        
        <EditorIconButtons
          label="Horizontal Rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiAlignTop /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiArrowGoBackLine /></IconContext>
        </EditorIconButtons>

        <EditorIconButtons
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <IconContext value={{ size:'1.2em' }}><RiArrowGoForwardLine /></IconContext>
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