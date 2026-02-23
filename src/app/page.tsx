'use client'

import { useRef, useState } from 'react'
import Canvas, { TemplateType, FormatType, CanvasContent } from '@/components/Canvas'
import { exportAsPNG, exportAsPDF } from '@/lib/export'
import styles from './page.module.css'

const PLATFORMS = ['LinkedIn', 'Instagram', 'Twitter/X', 'Facebook']
const FORMATS: { key: FormatType; label: string; size: string; icon: string }[] = [
  { key: 'square', label: 'Square', size: '1:1', icon: 'fa-square' },
  { key: 'landscape', label: 'Landscape', size: '16:9', icon: 'fa-rectangle-wide' },
  { key: 'story', label: 'Story', size: '9:16', icon: 'fa-mobile-screen' },
  { key: 'banner', label: 'Banner', size: '4:1', icon: 'fa-panorama' },
]
const TEMPLATES: { key: TemplateType; label: string; color: string }[] = [
  { key: 'navy', label: 'Navy Bold', color: 'linear-gradient(135deg,#003D7A,#0099FF)' },
  { key: 'white', label: 'Clean White', color: '#fff' },
  { key: 'grey', label: 'Grey Minimal', color: '#F5F7FA' },
  { key: 'dark', label: 'Dark Mode', color: '#011F40' },
]

const DEFAULT_CONTENT: CanvasContent = {
  tag: 'ALTYAPI TEKNOLOJİSİ',
  headline: 'Kurumsal Altyapınızı Bir Üst Seviyeye Taşıyın',
  body: 'Güvenli, ölçeklenebilir ve tam entegre B2B çözümler.',
  cta: 'Hemen Başlayın',
  logo: 'PMS',
}

export default function DesignerPage() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [platform, setPlatform] = useState('LinkedIn')
  const [format, setFormat] = useState<FormatType>('square')
  const [template, setTemplate] = useState<TemplateType>('navy')
  const [content, setContent] = useState<CanvasContent>(DEFAULT_CONTENT)
  const [aiTopic, setAiTopic] = useState('')
  const [aiTone, setAiTone] = useState('professional')
  const [aiLoading, setAiLoading] = useState(false)
  const [exportLoading, setExportLoading] = useState<'png' | 'pdf' | null>(null)
  const [notification, setNotification] = useState('')

  const updateContent = (field: keyof CanvasContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }))
  }

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(''), 3000)
  }

  const generateWithAI = async () => {
    if (!aiTopic.trim()) {
      showNotification('⚠️ Konu girin')
      return
    }
    setAiLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, platform, tone: aiTone, template }),
      })
      const data = await res.json()
      if (data.content) {
        setContent(prev => ({ ...prev, ...data.content }))
        showNotification('✅ AI içerik üretildi!')
      } else {
        showNotification('❌ Hata: ' + (data.error || 'Bilinmeyen hata'))
      }
    } catch {
      showNotification('❌ Bağlantı hatası')
    } finally {
      setAiLoading(false)
    }
  }

  const handleExportPNG = async () => {
    setExportLoading('png')
    try {
      await exportAsPNG('post-canvas', `pms-post-${template}-${format}.png`)
      showNotification('✅ PNG indirildi!')
    } catch {
      showNotification('❌ Export hatası')
    } finally {
      setExportLoading(null)
    }
  }

  const handleExportPDF = async () => {
    setExportLoading('pdf')
    try {
      await exportAsPDF('post-canvas', `pms-post-${template}-${format}.pdf`)
      showNotification('✅ PDF indirildi!')
    } catch {
      showNotification('❌ Export hatası')
    } finally {
      setExportLoading(null)
    }
  }

  return (
    <div className={styles.app}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logo}>PMS<span>+</span> Design</div>
        <div className={styles.headerCenter}>Social Media Post Designer</div>
        <div className={styles.headerBadge}>v1.0</div>
      </header>

      {/* NOTIFICATION */}
      {notification && (
        <div className={styles.notification}>{notification}</div>
      )}

      <div className={styles.layout}>
        {/* LEFT PANEL */}
        <aside className={styles.panel}>
          <div className={styles.panelTitle}>
            <i className="fas fa-sliders" /> Post Ayarları
          </div>

          {/* PLATFORM */}
          <div className={styles.sectionLabel}>Platform</div>
          <div className={styles.chipRow}>
            {PLATFORMS.map(p => (
              <button
                key={p}
                className={`${styles.chip} ${platform === p ? styles.chipActive : ''}`}
                onClick={() => setPlatform(p)}
              >
                {p}
              </button>
            ))}
          </div>

          {/* FORMAT */}
          <div className={styles.sectionLabel}>Format</div>
          <div className={styles.formatGrid}>
            {FORMATS.map(f => (
              <button
                key={f.key}
                className={`${styles.formatBtn} ${format === f.key ? styles.formatBtnActive : ''}`}
                onClick={() => setFormat(f.key)}
              >
                <i className={`fas ${f.icon}`} style={{ color: 'var(--accent)', fontSize: 18, marginBottom: 4 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--navy)', display: 'block' }}>{f.label}</span>
                <span style={{ fontSize: 10, color: 'var(--body-text)' }}>{f.size}</span>
              </button>
            ))}
          </div>

          {/* TEMPLATE */}
          <div className={styles.sectionLabel}>Şablon</div>
          <div className={styles.templateGrid}>
            {TEMPLATES.map(t => (
              <button
                key={t.key}
                className={`${styles.templateCard} ${template === t.key ? styles.templateCardActive : ''}`}
                onClick={() => setTemplate(t.key)}
              >
                <div className={styles.templatePreview} style={{ background: t.color }} />
                <div className={styles.templateLabel}>{t.label}</div>
              </button>
            ))}
          </div>

          {/* AI GENERATOR */}
          <div className={styles.sectionLabel}>AI İçerik Üret</div>
          <div className={styles.aiBox}>
            <textarea
              className={styles.inputField}
              placeholder="Konu yazın... (örn: Siber güvenlik çözümlerimiz, Yeni ürün lansmanı)"
              rows={3}
              value={aiTopic}
              onChange={e => setAiTopic(e.target.value)}
            />
            <select
              className={styles.inputField}
              value={aiTone}
              onChange={e => setAiTone(e.target.value)}
              style={{ marginTop: 6 }}
            >
              <option value="professional">Profesyonel & Kurumsal</option>
              <option value="bold">Cesur & İddialı</option>
              <option value="minimal">Minimal & Net</option>
            </select>
            <button
              className={styles.aiBtn}
              onClick={generateWithAI}
              disabled={aiLoading}
            >
              {aiLoading
                ? <><i className="fas fa-spinner fa-spin" /> Üretiliyor...</>
                : <><i className="fas fa-wand-magic-sparkles" /> AI ile Üret</>
              }
            </button>
          </div>
        </aside>

        {/* CANVAS */}
        <main className={styles.canvasArea}>
          <div className={styles.canvasToolbar}>
            <button className={styles.toolBtn} onClick={() => setContent(DEFAULT_CONTENT)}>
              <i className="fas fa-rotate-left" /> Sıfırla
            </button>
            <div className={styles.spacer} />
            <span className={styles.canvasHint}>
              <i className="fas fa-circle-info" /> Metne tıklayarak düzenle
            </span>
          </div>

          <div className={styles.canvasWrap}>
            <Canvas
              ref={canvasRef}
              template={template}
              format={format}
              content={content}
              onContentChange={updateContent}
            />
          </div>

          <div className={styles.canvasMeta}>
            {format === 'square' && '500 × 500 px'}
            {format === 'landscape' && '600 × 337 px'}
            {format === 'story' && '281 × 500 px'}
            {format === 'banner' && '600 × 160 px'}
            {' · '}{platform}
          </div>
        </main>

        {/* RIGHT PANEL */}
        <aside className={styles.panel}>
          <div className={styles.panelTitle}>
            <i className="fas fa-pen-to-square" /> İçerik & Dışa Aktar
          </div>

          {/* CONTENT FIELDS */}
          <div className={styles.sectionLabel}>Başlık</div>
          <textarea
            className={styles.inputField}
            rows={3}
            value={content.headline}
            onChange={e => updateContent('headline', e.target.value)}
            placeholder="Post başlığı..."
          />

          <div className={styles.sectionLabel} style={{ marginTop: 10 }}>Açıklama</div>
          <textarea
            className={styles.inputField}
            rows={3}
            value={content.body}
            onChange={e => updateContent('body', e.target.value)}
            placeholder="Kısa açıklama..."
          />

          <div className={styles.sectionLabel} style={{ marginTop: 10 }}>Etiket</div>
          <input
            className={styles.inputField}
            type="text"
            value={content.tag}
            onChange={e => updateContent('tag', e.target.value)}
            placeholder="ALTYAPI TEKNOLOJİSİ"
          />

          <div className={styles.sectionLabel} style={{ marginTop: 10 }}>CTA Metni</div>
          <input
            className={styles.inputField}
            type="text"
            value={content.cta}
            onChange={e => updateContent('cta', e.target.value)}
            placeholder="Hemen Başlayın"
          />

          <div className={styles.sectionLabel} style={{ marginTop: 10 }}>Logo</div>
          <input
            className={styles.inputField}
            type="text"
            value={content.logo}
            onChange={e => updateContent('logo', e.target.value)}
            placeholder="PMS"
          />

          {/* EXPORT */}
          <div className={styles.sectionLabel} style={{ marginTop: 20 }}>Dışa Aktar</div>
          <button
            className={styles.exportBtn}
            onClick={handleExportPNG}
            disabled={exportLoading !== null}
          >
            {exportLoading === 'png'
              ? <><i className="fas fa-spinner fa-spin" /> Hazırlanıyor...</>
              : <><i className="fas fa-image" /> PNG İndir (2x)</>
            }
          </button>
          <button
            className={`${styles.exportBtn} ${styles.exportBtnSecondary}`}
            onClick={handleExportPDF}
            disabled={exportLoading !== null}
          >
            {exportLoading === 'pdf'
              ? <><i className="fas fa-spinner fa-spin" /> Hazırlanıyor...</>
              : <><i className="fas fa-file-pdf" /> PDF İndir</>
            }
          </button>

          {/* COLOR PALETTE */}
          <div className={styles.sectionLabel} style={{ marginTop: 20 }}>Renk Paleti</div>
          <div className={styles.paletteRow}>
            {['#003D7A','#0099FF','#0052CC','#F5F7FA','#011F40','#FFFFFF'].map(c => (
              <div
                key={c}
                className={styles.colorDot}
                style={{ background: c, border: c === '#FFFFFF' ? '1px solid #ddd' : undefined }}
                title={c}
                onClick={() => {
                  navigator.clipboard.writeText(c)
                  showNotification(`📋 ${c} kopyalandı`)
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--body-text)', marginTop: 6 }}>
            Tıklayarak renk kodunu kopyala
          </p>

          {/* STATS */}
          <div className={styles.sectionLabel} style={{ marginTop: 20 }}>Tasarım Metrikleri</div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Başlık uzunluğu</span>
            <span className={styles.statValue}>{content.headline.length} kr</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Açıklama</span>
            <span className={styles.statValue}>{content.body.length} kr</span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Şablon</span>
            <span className={`${styles.statBadge} ${styles.badgeBlue}`}>
              {TEMPLATES.find(t => t.key === template)?.label}
            </span>
          </div>
          <div className={styles.statRow}>
            <span className={styles.statLabel}>Marka Uyumu</span>
            <span className={`${styles.statBadge} ${styles.badgeGreen}`}>PMS+ ✓</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
