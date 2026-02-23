'use client'

import { forwardRef } from 'react'
import styles from './Canvas.module.css'

export type TemplateType = 'navy' | 'white' | 'grey' | 'dark'
export type FormatType = 'square' | 'landscape' | 'story' | 'banner'

export interface CanvasContent {
  tag: string
  headline: string
  body: string
  cta: string
  logo: string
}

interface CanvasProps {
  template: TemplateType
  format: FormatType
  content: CanvasContent
  onContentChange: (field: keyof CanvasContent, value: string) => void
}

const formatDimensions: Record<FormatType, { width: number; height: number }> = {
  square: { width: 500, height: 500 },
  landscape: { width: 600, height: 337 },
  story: { width: 281, height: 500 },
  banner: { width: 600, height: 160 },
}

const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({ template, format, content, onContentChange }, ref) => {
    const dims = formatDimensions[format]

    const handleEdit = (field: keyof CanvasContent) => (e: React.FormEvent<HTMLDivElement>) => {
      onContentChange(field, (e.target as HTMLDivElement).innerText)
    }

    return (
      <div
        ref={ref}
        className={`${styles.canvas} ${styles[`tpl_${template}`]} ${styles[`fmt_${format}`]}`}
        style={{ width: dims.width, height: dims.height }}
        id="post-canvas"
      >
        {template === 'navy' && <NavyTemplate content={content} onEdit={handleEdit} />}
        {template === 'white' && <WhiteTemplate content={content} onEdit={handleEdit} />}
        {template === 'grey' && <GreyTemplate content={content} onEdit={handleEdit} />}
        {template === 'dark' && <DarkTemplate content={content} onEdit={handleEdit} />}
      </div>
    )
  }
)

Canvas.displayName = 'Canvas'
export default Canvas

// ─── NAVY TEMPLATE ────────────────────────────────────────────────────────────
function NavyTemplate({ content, onEdit }: {
  content: CanvasContent
  onEdit: (f: keyof CanvasContent) => (e: React.FormEvent<HTMLDivElement>) => void
}) {
  return (
    <>
      <div className={styles.navyBg} />
      <div className={styles.navyGrid} />
      <div className={styles.navyAccentLine} />
      <div
        className={styles.navyLogo}
        contentEditable
        suppressContentEditableWarning
        onInput={onEdit('logo')}
      >
        {content.logo}<span style={{ color: 'var(--accent)' }}>+</span>
      </div>
      <div className={styles.navyContent}>
        <div
          className={styles.navyTag}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('tag')}
        >
          {content.tag}
        </div>
        <div
          className={styles.navyHeadline}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('headline')}
        >
          {content.headline}
        </div>
        <div
          className={styles.navyBody}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('body')}
        >
          {content.body}
        </div>
        <div
          className={styles.navyCta}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('cta')}
        >
          → {content.cta}
        </div>
      </div>
    </>
  )
}

// ─── WHITE TEMPLATE ───────────────────────────────────────────────────────────
function WhiteTemplate({ content, onEdit }: {
  content: CanvasContent
  onEdit: (f: keyof CanvasContent) => (e: React.FormEvent<HTMLDivElement>) => void
}) {
  return (
    <>
      <div className={styles.whiteTopBar} />
      <div className={styles.whiteIconBg}><i className="fas fa-server" /></div>
      <div
        className={styles.whiteLogo}
        contentEditable
        suppressContentEditableWarning
        onInput={onEdit('logo')}
      >
        {content.logo}<span style={{ color: 'var(--accent)' }}>+</span>
      </div>
      <div className={styles.whiteContent}>
        <div
          className={styles.whiteTag}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('tag')}
        >
          {content.tag}
        </div>
        <div
          className={styles.whiteHeadline}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('headline')}
        >
          {content.headline}
        </div>
        <div
          className={styles.whiteBody}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('body')}
        >
          {content.body}
        </div>
        <div
          className={styles.whiteCta}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('cta')}
        >
          → {content.cta}
        </div>
      </div>
    </>
  )
}

// ─── GREY TEMPLATE ────────────────────────────────────────────────────────────
function GreyTemplate({ content, onEdit }: {
  content: CanvasContent
  onEdit: (f: keyof CanvasContent) => (e: React.FormEvent<HTMLDivElement>) => void
}) {
  return (
    <>
      <div className={styles.greyLeftBar} />
      <div className={styles.greyContent}>
        <div
          className={styles.greyTag}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('tag')}
        >
          {content.tag}
        </div>
        <div
          className={styles.greyHeadline}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('headline')}
        >
          {content.headline}
        </div>
        <div
          className={styles.greyBody}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('body')}
        >
          {content.body}
        </div>
        <div className={styles.greyFooter}>
          <div
            className={styles.greyLogo}
            contentEditable
            suppressContentEditableWarning
            onInput={onEdit('logo')}
          >
            {content.logo}<span style={{ color: 'var(--accent)' }}>+</span>
          </div>
          <div
            className={styles.greyCta}
            contentEditable
            suppressContentEditableWarning
            onInput={onEdit('cta')}
          >
            → {content.cta}
          </div>
        </div>
      </div>
    </>
  )
}

// ─── DARK TEMPLATE ────────────────────────────────────────────────────────────
function DarkTemplate({ content, onEdit }: {
  content: CanvasContent
  onEdit: (f: keyof CanvasContent) => (e: React.FormEvent<HTMLDivElement>) => void
}) {
  return (
    <>
      <div
        className={styles.darkLogo}
        contentEditable
        suppressContentEditableWarning
        onInput={onEdit('logo')}
      >
        {content.logo}<span style={{ color: 'var(--accent)' }}>+</span>
      </div>
      <div className={styles.darkDot} />
      <div className={styles.darkContent}>
        <div
          className={styles.darkTag}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('tag')}
        >
          {content.tag}
        </div>
        <div
          className={styles.darkHeadline}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('headline')}
        >
          {content.headline}
        </div>
        <div
          className={styles.darkBody}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('body')}
        >
          {content.body}
        </div>
        <div
          className={styles.darkCta}
          contentEditable
          suppressContentEditableWarning
          onInput={onEdit('cta')}
        >
          → {content.cta}
        </div>
      </div>
    </>
  )
}
