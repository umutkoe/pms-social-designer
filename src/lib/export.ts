export async function exportAsPNG(elementId: string, filename = 'pms-post.png') {
  const { default: html2canvas } = await import('html2canvas')
  const el = document.getElementById(elementId)
  if (!el) return

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: null,
  })

  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export async function exportAsPDF(elementId: string, filename = 'pms-post.pdf') {
  const { default: html2canvas } = await import('html2canvas')
  const { default: jsPDF } = await import('jspdf')
  const el = document.getElementById(elementId)
  if (!el) return

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: null,
  })

  const imgData = canvas.toDataURL('image/png')
  const width = canvas.width / 2
  const height = canvas.height / 2

  const pdf = new jsPDF({
    orientation: width > height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [width, height],
  })

  pdf.addImage(imgData, 'PNG', 0, 0, width, height)
  pdf.save(filename)
}
