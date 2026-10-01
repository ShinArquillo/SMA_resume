/*
 * Visual + accessibility QA against a running build.
 *
 *   npm run build && npx next start -p 3100
 *   node scripts/qa-screenshots.js            # writes qa-output/<tag>-*.png + report.json
 *
 * Env: QA_BASE (default http://localhost:3100), QA_TAG (default "run"),
 *      QA_OUT (default ./qa-output), QA_CHROME (path to chrome.exe / msedge.exe).
 *
 * For each viewport x theme it captures the hero, the proof stage, every
 * section, the footer, the mobile menu and the chat, then runs axe-core and a
 * few layout checks: horizontal overflow, text under 11px, tap targets under
 * 40px, console errors and failed requests.
 */
const path = require('path')
const fs = require('fs')
const puppeteer = require('puppeteer-core')

const BASE = process.env.QA_BASE || 'http://localhost:3100'
const OUT = process.env.QA_OUT || path.join(process.cwd(), 'qa-output')
const TAG = process.env.QA_TAG || 'run'
const CHROME =
  process.env.QA_CHROME ||
  [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].find((p) => fs.existsSync(p))
const AXE = require.resolve('axe-core/axe.min.js')

if (!CHROME) {
  console.error('No Chrome/Edge found. Set QA_CHROME to the browser executable.')
  process.exit(1)
}
fs.mkdirSync(OUT, { recursive: true })

const viewports = [
  { name: 'mobile', width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
]
const themes = ['light', 'dark']
const sections = ['experience', 'projects', 'skills', 'about', 'education']
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function layoutChecks(page) {
  return page.evaluate(() => {
    const out = { hOverflow: document.documentElement.scrollWidth - window.innerWidth }
    const small = []
    const seen = new Set()
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
    let el
    while ((el = walker.nextNode())) {
      if (!el.innerText || !el.innerText.trim()) continue
      const cs = getComputedStyle(el)
      const fs = parseFloat(cs.fontSize)
      if (fs >= 11 || cs.visibility === 'hidden' || cs.display === 'none') continue
      if (![...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) continue
      const key = el.innerText.trim().slice(0, 40)
      if (seen.has(key)) continue
      seen.add(key)
      small.push({ fs: +fs.toFixed(1), text: key })
    }
    out.smallText = small
    const targets = []
    document.querySelectorAll('a, button, [role=button], input').forEach((t) => {
      const r = t.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      if (r.width < 40 || r.height < 40) {
        targets.push({
          w: Math.round(r.width),
          h: Math.round(r.height),
          text: (t.getAttribute('aria-label') || t.innerText || t.tagName).trim().slice(0, 30),
        })
      }
    })
    out.smallTargets = targets
    return out
  })
}

async function axe(page) {
  await page.addScriptTag({ path: AXE })
  return page.evaluate(async () => {
    const r = await window.axe.run(document, {
      runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
    })
    return r.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      count: v.nodes.length,
      sample: v.nodes.slice(0, 3).map((n) => ({
        target: n.target.join(' '),
        summary: (n.failureSummary || '').split('\n').slice(1, 3).join(' | ').slice(0, 220),
      })),
    }))
  })
}

async function scrollToSection(page, id) {
  await page.evaluate((id) => {
    const el = document.getElementById(id)
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80)
  }, id)
  await sleep(900)
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
  })
  const report = { tag: TAG, base: BASE, when: new Date().toISOString(), runs: [] }

  for (const vp of viewports) {
    for (const theme of themes) {
      const page = await browser.newPage()
      await page.setViewport(vp)
      const logs = { console: [], failed: [] }
      page.on('console', (m) => {
        if (['error', 'warning'].includes(m.type())) logs.console.push(`${m.type()}: ${m.text().slice(0, 200)}`)
      })
      page.on('pageerror', (e) => logs.console.push(`pageerror: ${String(e).slice(0, 200)}`))
      page.on('requestfailed', (r) => logs.failed.push(`${r.failure()?.errorText} ${r.url().slice(0, 120)}`))
      page.on('response', (r) => r.status() >= 400 && logs.failed.push(`${r.status()} ${r.url().slice(0, 120)}`))
      await page.evaluateOnNewDocument((t) => localStorage.setItem('theme', t), theme)

      const prefix = `${TAG}-${vp.name}-${theme}`
      const t0 = Date.now()
      await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 120000 })
      const loadMs = Date.now() - t0
      await sleep(1200)
      await page.screenshot({ path: path.join(OUT, `${prefix}-hero.png`) })

      // End of the hero's sticky travel: the "proof" stage is fully in.
      await page.evaluate(() => {
        const hero = document.querySelector('#home')
        window.scrollTo(0, Math.max(0, hero.offsetHeight - window.innerHeight))
      })
      await sleep(1200)
      await page.screenshot({ path: path.join(OUT, `${prefix}-hero-proof.png`) })

      for (const id of sections) {
        await scrollToSection(page, id)
        await page.screenshot({ path: path.join(OUT, `${prefix}-${id}.png`) })
      }
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await sleep(900)
      await page.screenshot({ path: path.join(OUT, `${prefix}-footer.png`) })

      if (vp.name === 'mobile') {
        await page.evaluate(() => window.scrollTo(0, 0))
        await sleep(600)
        await page.click('button[aria-label="Open menu"]').catch(() => {})
        await sleep(600)
        await page.screenshot({ path: path.join(OUT, `${prefix}-menu.png`) })
        await page.click('button[aria-label="Close menu"]').catch(() => {})
        await sleep(400)
      }
      await page.click('button[aria-label="Open chat"]').catch(() => {})
      await sleep(600)
      await page.screenshot({ path: path.join(OUT, `${prefix}-chat.png`) })
      await page.click('button[aria-label="Close chat"]').catch(() => {})
      await sleep(300)

      await page.evaluate(() => window.scrollTo(0, 0))
      await sleep(600)
      const layout = await layoutChecks(page)
      const a11y = await axe(page)
      const resourceKB = await page.evaluate(() =>
        Math.round(
          performance.getEntriesByType('resource').reduce((a, r) => a + (r.transferSize || 0), 0) / 1024
        )
      )
      report.runs.push({ viewport: vp.name, theme, loadMs, resourceKB, layout, a11y, logs })
      await page.close()
    }
  }

  const page = await browser.newPage()
  await page.setViewport(viewports[1])
  await page.goto(BASE + '/resume', { waitUntil: 'networkidle0' })
  await sleep(600)
  await page.screenshot({ path: path.join(OUT, `${TAG}-resume.png`), fullPage: true })
  await page.setViewport(viewports[0])
  await sleep(400)
  await page.screenshot({ path: path.join(OUT, `${TAG}-resume-mobile.png`) })
  await page.close()
  await browser.close()

  fs.writeFileSync(path.join(OUT, `${TAG}-report.json`), JSON.stringify(report, null, 2))
  for (const r of report.runs) {
    const contrast = r.a11y.find((v) => v.id === 'color-contrast')
    console.log(
      `${r.viewport}/${r.theme}: ${r.resourceKB} KB, axe ${r.a11y.length} rule(s)` +
        (contrast ? ` (${contrast.count} contrast nodes)` : '') +
        `, ${r.layout.smallText.length} tiny text, ${r.layout.smallTargets.length} small targets, overflow ${r.layout.hOverflow}px`
    )
  }
  console.log('report:', path.join(OUT, `${TAG}-report.json`))
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
