import jsPDF from 'jspdf';
import { Scholarship } from './types';

type RGB = [number, number, number];

const safe = (text: string): string =>
  text
    .replace(/₹/g, 'Rs.')
    .replace(/•/g, '-')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/\u2018/g, "'")
    .replace(/\u2019/g, "'")
    .replace(/\u201C/g, '"')
    .replace(/\u201D/g, '"')
    .replace(/\u2026/g, '...');

const C = {
  dk: [27, 94, 32] as RGB,
  md: [46, 125, 50] as RGB,
  lt: [200, 230, 201] as RGB,
  pl: [232, 245, 233] as RGB,
  gd: [218, 165, 32] as RGB,
  wh: [255, 255, 255] as RGB,
  bk: [40, 40, 40] as RGB,
  gy: [110, 110, 110] as RGB,
  lg: [246, 246, 246] as RGB,
  bl: [30, 80, 220] as RGB,
  ag: [0, 110, 0] as RGB,
  gv: [210, 105, 30] as RGB, gvB: [255, 240, 220] as RGB,
  co: [30, 80, 200] as RGB,  coB: [225, 240, 255] as RGB,
  ng: [50, 150, 60] as RGB,  ngB: [230, 248, 230] as RGB,
  sp: [200, 40, 40] as RGB,  spB: [255, 232, 232] as RGB,
};

const TCFG: Record<string, { c: RGB; bg: RGB; l: string }> = {
  government: { c: C.gv, bg: C.gvB, l: 'GOVERNMENT' },
  corporate:  { c: C.co, bg: C.coB, l: 'CORPORATE' },
  ngo:        { c: C.ng, bg: C.ngB, l: 'NGO / TRUST' },
  sports:     { c: C.sp, bg: C.spB, l: 'SPORTS' },
};

export const generateScholarshipPDF = (scholarships: Scholarship[]) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const L = 14;
  const R = W - 14;
  const CW = R - L;
  let y = 0;

  const tc = (c: RGB) => doc.setTextColor(c[0], c[1], c[2]);
  const fc = (c: RGB) => doc.setFillColor(c[0], c[1], c[2]);
  const dc = (c: RGB) => doc.setDrawColor(c[0], c[1], c[2]);
  const t = (s: string, x: number, yy: number, o?: any) => doc.text(safe(s), x, yy, o);
  const w = (s: string, mw: number, sz: number): string[] => { doc.setFontSize(sz); return doc.splitTextToSize(safe(s), mw); };
  const np = (sp: number) => { if (y + sp > H - 22) { doc.addPage(); y = 14; return true; } return false; };
  const hline = (x1: number, x2: number, yy: number, c: RGB) => { dc(c); doc.setLineWidth(0.3); doc.line(x1, yy, x2, yy); };
  const bold = (sz: number) => { doc.setFont('helvetica', 'bold'); doc.setFontSize(sz); };
  const norm = (sz: number) => { doc.setFont('helvetica', 'normal'); doc.setFontSize(sz); };

  // ═══════════════════════════════════════════════════════
  // COVER PAGE
  // ═══════════════════════════════════════════════════════
  fc(C.dk); doc.rect(0, 0, W, 105, 'F');
  fc(C.gd); doc.rect(0, 105, W, 3, 'F');

  tc(C.wh); bold(40); t('SCHOLARSHIP', W / 2, 40, { align: 'center' });
  tc(C.gd); bold(36); t('BROCHURE', W / 2, 58, { align: 'center' });
  tc(C.lt); norm(14); t('Complete Guide to Financial Aid for Students', W / 2, 74, { align: 'center' });
  tc(C.wh); bold(16); t('Tamil Nadu & India - 2025-26', W / 2, 90, { align: 'center' });
  tc(C.lt); norm(11); t('Powered by VAZHIKATTI - AI Career Guidance Platform', W / 2, 100, { align: 'center' });

  // Summary
  y = 120;
  const gN = scholarships.filter(s => s.type === 'government').length;
  const cN = scholarships.filter(s => s.type === 'corporate').length;
  const nN = scholarships.filter(s => s.type === 'ngo').length;
  const sN = scholarships.filter(s => s.type === 'sports').length;

  fc(C.pl); dc(C.lt); doc.roundedRect(L, y, CW, 22, 3, 3, 'FD');
  tc(C.dk); bold(18); t(`${scholarships.length} Scholarships`, L + 8, y + 10);
  tc(C.gy); norm(11); t(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), L + 8, y + 18);
  tc(C.md); bold(10); t(`Govt: ${gN}  |  Corporate: ${cN}  |  NGO: ${nN}  |  Sports: ${sN}`, R - 4, y + 13, { align: 'right' });
  y += 30;

  // Category cards
  const cWd = (CW - 9) / 4;
  [{ k: 'government', n: gN }, { k: 'corporate', n: cN }, { k: 'ngo', n: nN }, { k: 'sports', n: sN }].forEach((c, i) => {
    const cf = TCFG[c.k];
    const cx = L + i * (cWd + 3);
    fc(cf.bg); dc(cf.c); doc.roundedRect(cx, y, cWd, 24, 2, 2, 'FD');
    fc(cf.c); doc.rect(cx, y, cWd, 3.5, 'F');
    tc(cf.c); bold(9); t(cf.l, cx + cWd / 2, y + 12, { align: 'center' });
    bold(16); t(`${c.n}`, cx + cWd / 2, y + 21, { align: 'center' });
  });
  y += 34;

  // ─── TABLE OF CONTENTS ─────────────────────────────
  tc(C.dk); bold(18); t('TABLE OF CONTENTS', L, y);
  fc(C.gd); doc.rect(L, y + 2, 55, 2, 'F');
  y += 14;

  // TOC header
  fc(C.dk); doc.rect(L, y, CW, 8, 'F');
  tc(C.wh); bold(10);
  t('No.', L + 4, y + 5.5); t('Scholarship Name', L + 16, y + 5.5); t('Amount', R - 4, y + 5.5, { align: 'right' });
  y += 10;

  const grouped: Record<string, Scholarship[]> = {};
  scholarships.forEach(s => { if (!grouped[s.type]) grouped[s.type] = []; grouped[s.type].push(s); });

  let tocN = 1;
  Object.entries(grouped).forEach(([type, list]) => {
    const cf = TCFG[type] || TCFG.government;
    np(10 + list.length * 6.5);

    fc(cf.bg); doc.rect(L, y, CW, 7, 'F');
    tc(cf.c); bold(11); t(`${cf.l}  (${list.length})`, L + 5, y + 5);
    y += 9;

    list.forEach((s, i) => {
      np(6.5);
      if (i % 2 === 0) { fc([248, 248, 248] as RGB); doc.rect(L, y - 3.5, CW, 6.5, 'F'); }
      tc(C.bk); bold(10); t(`${tocN}`, L + 5, y);
      norm(10); t(s.name.length > 38 ? s.name.substring(0, 35) + '...' : s.name, L + 16, y);
      tc(C.ag); bold(9.5); t(s.amount, R - 4, y, { align: 'right' });
      y += 6.5;
      tocN++;
    });
    y += 5;
  });

  // ═══════════════════════════════════════════════════════
  // SCHOLARSHIP DETAILS
  // ═══════════════════════════════════════════════════════
  let gIdx = 0;

  Object.entries(grouped).forEach(([type, list]) => {
    const cf = TCFG[type] || TCFG.government;

    // Category divider
    doc.addPage(); y = 14;
    fc(cf.c); doc.rect(0, 0, W, 46, 'F');
    fc(C.gd); doc.rect(0, 46, W, 3, 'F');
    tc(C.wh); bold(32); t(cf.l, W / 2, 24, { align: 'center' });
    norm(14); t(`${list.length} Scholarships Available`, W / 2, 38, { align: 'center' });
    y = 60;

    list.forEach((s, idx) => {
      gIdx++;
      np(85);

      // ══ TITLE BAR ══════════════════════════════
      fc(cf.c); doc.rect(L, y, CW, 11, 'F');
      tc(C.wh); bold(12);
      const titleLines = w(`${gIdx}. ${s.name}`, CW - 50, 12);
      doc.text(titleLines[0], L + 5, y + 7.5);
      norm(9); t(cf.l, R - 5, y + 7.5, { align: 'right' });
      y += 13;

      if (titleLines.length > 1) {
        fc(cf.bg); doc.rect(L, y - 2, CW, 7, 'F');
        tc(cf.c); bold(11); doc.text(titleLines[1], L + 5, y + 3);
        y += 7;
      }

      // ══ KEY DETAILS TABLE ══════════════════════
      fc(C.pl); doc.rect(L, y, CW, 34, 'F');
      dc(C.lt); doc.rect(L, y, CW, 34);

      const tY = y + 1;
      const c1 = L + 6;        // label col left
      const c2 = L + 42;       // value col left
      const c3 = L + CW / 2 + 4; // label col right
      const c4 = L + CW / 2 + 38; // value col right

      // Row 1: Provider | Amount
      bold(10); tc(C.dk); t('Provider:', c1, tY + 6);
      norm(11); tc(C.bk); t(s.provider.length > 20 ? s.provider.substring(0, 17) + '...' : s.provider, c2, tY + 6);
      bold(10); tc(C.dk); t('Amount:', c3, tY + 6);
      bold(12); tc(C.ag);
      const amtL = w(s.amount, CW / 2 - 44, 12);
      doc.text(amtL[0], c4, tY + 6);
      if (amtL.length > 1) { norm(10); doc.text(amtL[1], c4, tY + 11); }

      hline(L + 4, R - 4, tY + 11.5, C.lt);

      // Row 2: Deadline | Category
      bold(10); tc(C.dk); t('Deadline:', c1, tY + 18);
      bold(12); tc(C.bk); t(s.deadline, c2, tY + 18);
      const st = s.deadlineStatus === 'always-open' ? '(Always Open)' :
        s.deadlineStatus === 'open' ? '(Open Now)' :
        s.deadlineStatus === 'closing-soon' ? '(Closing Soon!)' :
        s.deadlineStatus === 'one-month' ? '(< 1 Month)' : '(Coming Soon)';
      norm(9); tc(C.gy); t(st, c2 + doc.getTextWidth(safe(s.deadline)) + 2, tY + 18);
      bold(10); tc(C.dk); t('Category:', c3, tY + 18);
      fc(cf.c); doc.roundedRect(c4, tY + 14, 34, 8, 2, 2, 'F');
      tc(C.wh); bold(9); t(cf.l, c4 + 17, tY + 19.5, { align: 'center' });

      hline(L + 4, R - 4, tY + 23, C.lt);

      // Row 3: Income | Gender
      bold(10); tc(C.dk); t('Income Limit:', c1, tY + 29);
      norm(11); tc(C.bk); t(s.incomeLimit ? `Rs.${s.incomeLimit} Lakh` : 'No Limit', c2 + 4, tY + 29);
      bold(10); tc(C.dk); t('Gender:', c3, tY + 29);
      norm(11); tc(C.bk); t(s.gender === 'all' ? 'All' : s.gender === 'female' ? 'Female Only' : 'Male Only', c4, tY + 29);

      y += 37;

      // ══ DESCRIPTION ════════════════════════════
      np(18);
      fc(C.dk); doc.rect(L, y, CW, 7, 'F');
      tc(C.wh); bold(10); t('DESCRIPTION', L + 5, y + 5);
      y += 9;
      tc(C.bk); norm(11);
      const dL = w(s.description, CW - 10, 11);
      dL.slice(0, 6).forEach(line => { np(5); doc.text(line, L + 5, y); y += 5; });
      y += 3;

      // ══ ELIGIBILITY ════════════════════════════
      np(16);
      fc(C.dk); doc.rect(L, y, CW, 7, 'F');
      tc(C.wh); bold(10); t('ELIGIBILITY CRITERIA', L + 5, y + 5);
      y += 9;
      tc(C.bk); norm(10.5);
      s.eligibility.slice(0, 6).forEach((item, ei) => {
        np(6);
        const eL = w(`${ei + 1}.  ${item}`, CW - 16, 10.5);
        eL.forEach(line => { doc.text(line, L + 8, y); y += 4.8; });
      });
      y += 3;

      // ══ DOCUMENTS + HOW TO APPLY ═══════════════
      np(28);
      const halfW = CW / 2 - 2;

      // Left: Documents
      fc(C.lg); doc.rect(L, y, halfW, 7, 'F');
      dc(C.lt); doc.rect(L, y, halfW, 7);
      tc(C.dk); bold(10); t('DOCUMENTS REQUIRED', L + 4, y + 5);
      const docY0 = y + 9;
      let dy = docY0;
      tc(C.bk); norm(10);
      s.documents.slice(0, 6).forEach((d, di) => {
        if (dy + 5 > H - 22) return;
        const dLines = w(`${di + 1}. ${d}`, halfW - 12, 10);
        dLines.forEach(line => { doc.text(line, L + 6, dy); dy += 4.5; });
      });

      // Right: How to Apply
      const rX = L + halfW + 4;
      fc(C.lg); doc.rect(rX, y, halfW, 7, 'F');
      dc(C.lt); doc.rect(rX, y, halfW, 7);
      tc(C.dk); bold(10); t('HOW TO APPLY', rX + 4, y + 5);
      let hy = docY0;
      tc(C.bk); norm(10);
      s.howToApply.slice(0, 5).forEach((step, si) => {
        if (hy + 5 > H - 22) return;
        const sLines = w(`${si + 1}. ${step}`, halfW - 12, 10);
        sLines.forEach(line => { doc.text(line, rX + 6, hy); hy += 4.5; });
      });

      y = Math.max(dy, hy) + 4;

      // ══ BENEFITS ═══════════════════════════════
      if (s.benefits && s.benefits.length > 0) {
        np(18);
        fc(C.pl); dc(C.lt); doc.roundedRect(L, y, CW, 16, 2, 2, 'FD');
        const bCnt = Math.min(s.benefits.length, 4);
        const bw = CW / bCnt;
        s.benefits.slice(0, 4).forEach((b, bi) => {
          const bx = L + bi * bw;
          if (bi > 0) { dc(C.lt); doc.line(bx, y + 2, bx, y + 14); }
          tc(C.dk); bold(8.5); t(b.label.toUpperCase(), bx + bw / 2, y + 6.5, { align: 'center' });
          tc(C.bk); bold(10.5); t(b.value, bx + bw / 2, y + 12.5, { align: 'center' });
        });
        y += 19;
      }

      // ══ APPLY / HELPLINE ═══════════════════════
      np(14);
      fc(C.lg); dc(C.lt); doc.roundedRect(L, y, CW, 10, 2, 2, 'FD');
      bold(9.5); tc(C.dk); t('Apply:', L + 5, y + 6.5);
      norm(9.5); tc(C.bl);
      const urlT = s.applicationUrl.length > 36 ? s.applicationUrl.substring(0, 33) + '...' : s.applicationUrl;
      t(urlT, L + 22, y + 6.5);
      if (s.helpline) {
        bold(9.5); tc(C.dk); t('Helpline:', R - 52, y + 6.5);
        norm(9.5); tc(C.bk); t(s.helpline, R - 26, y + 6.5);
      }
      y += 14;

      // Bottom border
      dc(cf.c); doc.setLineWidth(1); doc.line(L, y, R, y); doc.setLineWidth(0.3);
      y += 9;

      if (idx < list.length - 1) { np(5); }
    });
  });

  // ═══════════════════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════════════════
  const total = doc.internal.pages.length - 1;
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    fc(C.dk); doc.rect(0, H - 10, W, 10, 'F');
    fc(C.gd); doc.rect(0, H - 10, W, 0.8, 'F');
    tc(C.wh); norm(8);
    doc.text('Powered by VAZHIKATTI  |  AI Career Guidance Platform', L, H - 3.5);
    doc.text(safe(`Page ${i} of ${total}`), R, H - 3.5, { align: 'right' });
  }

  doc.save(safe(`VAZHIKATTI_Scholarship_Brochure_${new Date().toISOString().split('T')[0]}.pdf`));
};
