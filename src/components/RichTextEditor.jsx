import { useEffect, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyleKit } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import { uploadImage } from '../lib/uploadImage'

const fonts = [
  { label: 'Font', value: '' },
  { label: 'Cormorant', value: 'Cormorant Garamond, serif' },
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier', value: 'Courier New, monospace' },
]

const sizes = ['14px', '16px', '18px', '20px', '24px', '32px']

function Btn({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={
        'min-w-9 px-2 py-1.5 text-sm transition-colors ' +
        (active ? 'bg-ink text-paper' : 'hover:bg-sand')
      }
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({ value, onChange }) {
  const fileRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleKit,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
    ],
    content: value || '',
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: 'article-content min-h-[360px] px-5 py-4 outline-none',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  // When an existing article is opened, its text arrives after the page loads
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
  }, [value, editor])

  if (!editor) return null

  function setLink() {
    const previous = editor.getAttributes('link').href || ''
    const url = window.prompt('Link address', previous)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  async function handleImage(e) {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return
    try {
      const url = await uploadImage(file)
      editor.chain().focus().setImage({ src: url }).run()
    } catch (err) {
      window.alert('Image upload failed: ' + err.message)
    }
  }

  const textStyle = editor.getAttributes('textStyle')

  return (
    <div className="border border-ink/20 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-ink/15 p-2">
        <select
          title="Font"
          value={textStyle.fontFamily || ''}
          onChange={(e) => {
            const v = e.target.value
            if (v) editor.chain().focus().setFontFamily(v).run()
            else editor.chain().focus().unsetFontFamily().run()
          }}
          className="border border-ink/20 bg-white px-2 py-1.5 text-sm"
        >
          {fonts.map((f) => (
            <option key={f.label} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <select
          title="Size"
          value={textStyle.fontSize || ''}
          onChange={(e) => {
            const v = e.target.value
            if (v) editor.chain().focus().setFontSize(v).run()
            else editor.chain().focus().unsetFontSize().run()
          }}
          className="border border-ink/20 bg-white px-2 py-1.5 text-sm"
        >
          <option value="">Size</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
<input
          type="color"
          title="Text color"
          value={textStyle.color || '#0a1f44'}
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="h-8 w-9 cursor-pointer border border-ink/20 bg-white p-0.5"
        />

        <Btn title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <span className="font-bold">B</span>
        </Btn>
        <Btn title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <span className="italic">I</span>
        </Btn>
        <Btn title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <span className="underline">U</span>
        </Btn>
        <Btn title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <span className="line-through">S</span>
        </Btn>
        <Btn title="Highlight" active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()}>
          Highlight
        </Btn>

        <span className="mx-1 h-6 w-px bg-ink/15" />

        <Btn title="Big heading" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </Btn>
        <Btn title="Small heading" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </Btn>
        <Btn title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          List
        </Btn>
        <Btn title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1.
        </Btn>
        <Btn title="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          Quote
        </Btn>

        <span className="mx-1 h-6 w-px bg-ink/15" />

        <Btn title="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          Left
        </Btn>
        <Btn title="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          Center
        </Btn>
        <Btn title="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          Right
        </Btn>

        <span className="mx-1 h-6 w-px bg-ink/15" />

        <Btn title="Add link" active={editor.isActive('link')} onClick={setLink}>
          Link
        </Btn>
        <Btn title="Add photo" onClick={() => fileRef.current.click()}>
          Photo
        </Btn>
        <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </Btn>
        <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </Btn>
      </div>

      <EditorContent editor={editor} />

      <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
    </div>
  )
}