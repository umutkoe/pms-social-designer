import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { topic, platform, tone, template } = await req.json()

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const platformGuide: Record<string, string> = {
      LinkedIn: 'profesyonel, B2B odaklı, kurumsal dil, sektörel içgörü',
      Instagram: 'görsel, ilham verici, hashtag dostu, duygusal bağ kuran',
      'Twitter/X': 'kısa, etkili, dikkat çekici, maksimum 280 karakter başlık',
      Facebook: 'paylaşılabilir, hikaye anlatıcı, topluluk odaklı',
    }

    const toneGuide: Record<string, string> = {
      professional: 'resmi, güvenilir, kurumsal',
      bold: 'cesur, iddialı, güçlü',
      minimal: 'sade, net, az ama öz',
    }

    const prompt = `Sen PMS+ markası için sosyal medya içerik uzmanısın. PMS+ bir kurumsal B2B altyapı teknolojisi şirketidir.

Verilen konu için şablona uygun sosyal medya post içeriği üret.

Konu: ${topic}
Platform: ${platform} (${platformGuide[platform] || 'profesyonel'})
Ton: ${toneGuide[tone] || 'profesyonel, kurumsal'}
Şablon tipi: ${template}

JSON formatında yanıt ver, başka hiçbir şey yazma:
{
  "tag": "kısa kategori etiketi (max 3 kelime, büyük harf, örn: ALTYAPI TEKNOLOJİSİ)",
  "headline": "dikkat çekici başlık (max 10 kelime, Türkçe)",
  "body": "açıklama metni (max 20 kelime, Türkçe)",
  "cta": "eylem çağrısı (max 4 kelime)"
}`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic error:', err)
      return NextResponse.json({ error: 'AI API failed' }, { status: 500 })
    }

    const data = await response.json()
    const text = data.content[0]?.text || '{}'

    // Clean JSON from possible markdown fences
    const clean = text.replace(/```json|```/g, '').trim()
    const content = JSON.parse(clean)

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
