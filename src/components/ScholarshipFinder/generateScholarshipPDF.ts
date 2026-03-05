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
  const W = doc.internal.pageSize.getWidth();   // 210
  const H = doc.internal.pageSize.getHeight();  // 297
  const L = 16;       // left margin
  const R = W - 16;   // right edge
  const CW = R - L;   // content width
  let y = 0;

  const tc = (c: RGB) => doc.setTextColor(c[0], c[1], c[2]);
  const fc = (c: RGB) => doc.setFillColor(c[0], c[1], c[2]);
  const dc = (c: RGB) => doc.setDrawColor(c[0], c[1], c[2]);
  const t = (s: string, x: number, yy: number, o?: any) => doc.text(safe(s), x, yy, o);
  const w = (s: string, mw: number, sz: number): string[] => { doc.setFontSize(sz); return doc.splitTextToSize(safe(s), mw); };
  const np = (sp: number) => { if (y + sp > H - 22) { doc.addPage(); y = 16; return true; } return false; };
  const hline = (x1: number, x2: number, yy: number, c: RGB) => { dc(c); doc.setLineWidth(0.3); doc.line(x1, yy, x2, yy); };
  const bold = (sz: number) => { doc.setFont('helvetica', 'bold'); doc.setFontSize(sz); };
  const norm = (sz: number) => { doc.setFont('helvetica', 'normal'); doc.setFontSize(sz); };

  // Draw a label:value row (table-like)
  const labelRow = (label: string, value: string, yy: number, labelW: number = 40) => {
    bold(9); tc(C.dk); t(label, L + 6, yy);
    norm(9.5); tc(C.bk);
    const lines = w(value, CW - labelW - 10, 9.5);
    lines.slice(0, 2).forEach((line, i) => doc.text(line, L + labelW, yy + i * 4));
    return lines.length * 4;
  };

  // ═══════════════════════════════════════════════════════
  // ██ COVER PAGE
  // ═══════════════════════════════════════════════════════
  fc(C.dk); doc.rect(0, 0, W, 105, 'F');
  fc(C.gd); doc.rect(0, 105, W, 3, 'F');

  tc(C.wh); bold(38); t('SCHOLARSHIP', W / 2, 40, { align: 'center' });
  tc(C.gd); bold(34); t('BROCHURE', W / 2, 58, { align: 'center' });
  tc(C.lt); norm(12); t('Complete Guide to Financial Aid for Students', W / 2, 74, { align: 'center' });
  tc(C.wh); bold(14); t('Tamil Nadu & India - 2025-26', W / 2, 88, { align: 'center' });
  tc(C.lt); norm(10); t('Powered by VAZHIKATTI - AI Career Guidance Platform', W / 2, 98, { align: 'center' });

  // Summary
  y = 122;
  const gN = scholarships.filter(s => s.type === 'government').length;
  const cN = scholarships.filter(s => s.type === 'corporate').length;
  const nN = scholarships.filter(s => s.type === 'ngo').length;
  const sN = scholarships.filter(s => s.type === 'sports').length;

  fc(C.pl); dc(C.lt); doc.roundedRect(L, y, CW, 20, 3, 3, 'FD');
  tc(C.dk); bold(15); t(`${scholarships.length} Scholarships`, L + 8, y + 9);
  tc(C.gy); norm(9); t(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), L + 8, y + 16);
  tc(C.md); bold(9); t(`Government: ${gN}  |  Corporate: ${cN}  |  NGO: ${nN}  |  Sports: ${sN}`, R - 4, y + 12, { align: 'right' });
  y += 30;

  // Category cards
  const cWd = (CW - 9) / 4;
  [{ k: 'government', n: gN }, { k: 'corporate', n: cN }, { k: 'ngo', n: nN }, { k: 'sports', n: sN }].forEach((c, i) => {
    const cf = TCFG[c.k];
    const cx = L + i * (cWd + 3);
    fc(cf.bg); dc(cf.c); doc.roundedRect(cx, y, cWd, 22, 2, 2, 'FD');
    fc(cf.c); doc.rect(cx, y, cWd, 3, 'F');
    tc(cf.c); bold(8); t(cf.l, cx + cWd / 2, y + 11, { align: 'center' });
    bold(14); t(`${c.n}`, cx + cWd / 2, y + 19, { align: 'center' });
  });
  y += 32;

  // ─── TABLE OF CONTENTS ─────────────────────────────
  tc(C.dk); bold(15); t('TABLE OF CONTENTS', L, y);
  fc(C.gd); doc.rect(L, y + 2, 50, 1.5, 'F');
  y += 11;

  // TOC header row
  fc(C.dk); doc.rect(L, y, CW, 7, 'F');
  tc(C.wh); bold(8);
  t('No.', L + 3, y + 5); t('Scholarship Name', L + 14, y + 5); t('Amount', R - 2, y + 5, { align: 'right' });
  y += 9;

  const grouped: Record<string, Scholarship[]> = {};
  scholarships.forEach(s => { if (!grouped[s.type]) grouped[s.type] = []; grouped[s.type].push(s); });

  let tocN = 1;
  Object.entries(grouped).forEach(([type, list]) => {
    const cf = TCFG[type] || TCFG.government;
    np(8 + list.length * 5.5);

    // Category header in TOC
    fc(cf.bg); doc.rect(L, y, CW, 6, 'F');
    tc(cf.c); bold(9); t(`${cf.l}  (${list.length})`, L + 4, y + 4.5);
    y += 7.5;

    list.forEach((s, i) => {
      np(5.5);
      // Alternate row shading
      if (i % 2 === 0) { fc([250, 250, 250] as RGB); doc.rect(L, y - 3, CW, 5.5, 'F'); }
      tc(C.bk); bold(8.5); t(`${tocN}`, L + 4, y);
      norm(8.5); t(s.name.length > 42 ? s.name.substring(0, 39) + '...' : s.name, L + 14, y);
      tc(C.ag); bold(8); t(s.amount, R - 2, y, { align: 'right' });
      y += 5.5;
      tocN++;
    });
    y += 3;
  });

  // ═══════════════════════════════════════════════════════
  // ██ SCHOLARSHIP DETAIL PAGES
  // ═══════════════════════════════════════════════════════
  let gIdx = 0;

  Object.entries(grouped).forEach(([type, list]) => {
    const cf = TCFG[type] || TCFG.government;

    // Category divider
    doc.addPage(); y = 16;
    fc(cf.c); doc.rect(0, 0, W, 44, 'F');
    fc(C.gd); doc.rect(0, 44, W, 2.5, 'F');
    tc(C.wh); bold(30); t(cf.l, W / 2, 22, { align: 'center' });
    norm(13); t(`${list.length} Scholarships Available`, W / 2, 36, { align: 'center' });
    y = 58;

    list.forEach((s, idx) => {
      gIdx++;
      np(80);

      // ╔══ SCHOLARSHIP CARD BOX ══╗
      const cardStartY = y;

      // Title bar
      fc(cf.c); doc.rect(L, y, CW, 10, 'F');
      tc(C.wh); bold(11);
      const titleText = `${gIdx}. ${s.name}`;
      const titleLines = w(titleText, CW - 44, 11);
      doc.text(titleLines[0], L + 5, y + 7);
      // Type badge on right
      norm(8); t(cf.l, R - 5, y + 7, { align: 'right' });
      y += 12;

      // If title was too long, show 2nd line
      if (titleLines.length > 1) {
        fc(cf.bg); doc.rect(L, y - 2, CW, 6, 'F');
        tc(cf.c); bold(9.5); doc.text(titleLines[1], L + 5, y + 2);
        y += 6;
      }

      // ── KEY DETAILS TABLE ──────────────────────
      fc(C.pl); doc.rect(L, y, CW, 28, 'F');
      dc(C.lt); doc.rect(L, y, CW, 28);

      const tblY = y + 1;
      const col1 = L + 5;
      const col2 = L + 38;
      const col3 = L + CW / 2 + 5;
      const col4 = L + CW / 2 + 35;

      // Row 1: Provider + Amount
      bold(8); tc(C.dk); t('Provider:', col1, tblY + 5);
      norm(9); tc(C.bk); t(s.provider.length > 22 ? s.provider.substring(0, 19) + '...' : s.provider, col2, tblY + 5);
      bold(8); tc(C.dk); t('Amount:', col3, tblY + 5);
      bold(10); tc(C.ag);
      const amtL = w(s.amount, CW / 2 - 42, 10);
      doc.text(amtL[0], col4, tblY + 5);
      if (amtL.length > 1) { norm(8); doc.text(amtL[1], col4, tblY + 9.5); }

      // Divider line
      hline(L + 4, R - 4, tblY + 13, C.lt);

      // Row 2: Deadline + Category
      bold(8); tc(C.dk); t('Deadline:', col1, tblY + 18);
      bold(10); tc(C.bk); t(s.deadline, col2, tblY + 18);
      // Status
      norm(7.5); tc(C.gy);
      const st = s.deadlineStatus === 'always-open' ? 'Always Open' :
        s.deadlineStatus === 'open' ? 'Open Now' :
        s.deadlineStatus === 'closing-soon' ? 'Closing Soon!' :
        s.deadlineStatus === 'one-month' ? '< 1 Month' : 'Coming Soon';
      t(`(${st})`, col2 + doc.getTextWidth(safe(s.deadline)) + 2, tblY + 18);
      bold(8); tc(C.dk); t('Category:', col3, tblY + 18);
      // Colored badge
      fc(cf.c); doc.roundedRect(col4, tblY + 14, 30, 7, 2, 2, 'F');
      tc(C.wh); bold(7.5); t(cf.l, col4 + 15, tblY + 19, { align: 'center' });

      // Row 3: Income Limit + Gender
      hline(L + 4, R - 4, tblY + 22.5, C.lt);
      bold(8); tc(C.dk); t('Income Limit:', col1, tblY + 27);
      norm(9); tc(C.bk); t(s.incomeLimit ? `Rs.${s.incomeLimit} Lakh` : 'No Limit', col2 + 4, tblY + 27);
      bold(8); tc(C.dk); t('Gender:', col3, tblY + 27);
      norm(9); tc(C.bk); t(s.gender === 'all' ? 'All' : s.gender === 'female' ? 'Female Only' : 'Male Only', col4, tblY + 27);

      y += 31;

      // ── DESCRIPTION ────────────────────────────
      np(16);
      fc(C.dk); doc.rect(L, y, CW, 6, 'F');
      tc(C.wh); bold(8.5); t('DESCRIPTION', L + 5, y + 4.5);
      y += 8;
      tc(C.bk); norm(9.5);
      const dL = w(s.description, CW - 10, 9.5);
      dL.slice(0, 7).forEach(line => { np(4.5); doc.text(line, L + 5, y); y += 4.2; });
      y += 3;

      // ── ELIGIBILITY ────────────────────────────
      np(14);
      fc(C.dk); doc.rect(L, y, CW, 6, 'F');
      tc(C.wh); bold(8.5); t('ELIGIBILITY CRITERIA', L + 5, y + 4.5);
      y += 8;
      tc(C.bk); norm(9);
      s.eligibility.slice(0, 6).forEach((item, ei) => {
        np(5);
        const eL = w(`${ei + 1}.  ${item}`, CW - 14, 9);
        eL.forEach(line => { doc.text(line, L + 8, y); y += 4; });
      });
      y += 3;

      // ── DOCUMENTS + HOW TO APPLY (side by side) ─
      np(24);
      const halfW = CW / 2 - 2;

      // Left box: Documents
      fc(C.lg); doc.rect(L, y, halfW, 6, 'F');
      dc(C.lt); doc.rect(L, y, halfW, 6);
      tc(C.dk); bold(8); t('DOCUMENTS REQUIRED', L + 4, y + 4.5);
      const docStartY = y + 8;
      let dy = docStartY;
      tc(C.bk); norm(8.5);
      s.documents.slice(0, 6).forEach((d, di) => {
        if (dy + 4 > H - 22) return;
        const dLines = w(`${di + 1}. ${d}`, halfW - 10, 8.5);
        dLines.forEach(line => { doc.text(line, L + 6, dy); dy += 3.7; });
      });

      // Right box: How to Apply
      const rX2 = L + halfW + 4;
      fc(C.lg); doc.rect(rX2, y, halfW, 6, 'F');
      dc(C.lt); doc.rect(rX2, y, halfW, 6);
      tc(C.dk); bold(8); t('HOW TO APPLY', rX2 + 4, y + 4.5);
      let hy = docStartY;
      tc(C.bk); norm(8.5);
      s.howToApply.slice(0, 5).forEach((step, si) => {
        if (hy + 4 > H - 22) return;
        const sLines = w(`${si + 1}. ${step}`, halfW - 10, 8.5);
        sLines.forEach(line => { doc.text(line, rX2 + 6, hy); hy += 3.7; });
      });

      y = Math.max(dy, hy) + 4;

      // ── BENEFITS BAR ───────────────────────────
      if (s.benefits && s.benefits.length > 0) {
        np(16);
        fc(C.pl); dc(C.lt); doc.roundedRect(L, y, CW, 14, 2, 2, 'FD');
        const bCount = Math.min(s.benefits.length, 4);
        const bw = CW / bCount;
        s.benefits.slice(0, 4).forEach((b, bi) => {
          const bx = L + bi * bw;
          // Vertical divider between benefits
          if (bi > 0) { dc(C.lt); doc.line(bx, y + 2, bx, y + 12); }
          tc(C.dk); bold(7); t(b.label.toUpperCase(), bx + bw / 2, y + 5.5, { align: 'center' });
          tc(C.bk); bold(9); t(b.value, bx + bw / 2, y + 11, { align: 'center' });
        });
        y += 17;
      }

      // ── APPLY / HELPLINE BAR ───────────────────
      np(12);
      fc(C.lg); dc(C.lt); doc.roundedRect(L, y, CW, 9, 2, 2, 'FD');
      bold(8); tc(C.dk); t('Apply:', L + 5, y + 6);
      norm(8); tc(C.bl);
      const urlT = s.applicationUrl.length > 40 ? s.applicationUrl.substring(0, 37) + '...' : s.applicationUrl;
      t(urlT, L + 20, y + 6);
      if (s.helpline) {
        bold(8); tc(C.dk); t('Helpline:', R - 50, y + 6);
        norm(8); tc(C.bk); t(s.helpline, R - 25, y + 6);
      }
      y += 13;

      // Card bottom border
      dc(cf.c); doc.setLineWidth(0.8); doc.line(L, y, R, y); doc.setLineWidth(0.3);
      y += 8;

      // Separator
      if (idx < list.length - 1) { np(4); }
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
    tc(C.wh); norm(7.5);
    doc.text('Powered by VAZHIKATTI  |  AI Career Guidance Platform', L, H - 3.5);
    doc.text(safe(`Page ${i} of ${total}`), R, H - 3.5, { align: 'right' });
  }

  doc.save(safe(`VAZHIKATTI_Scholarship_Brochure_${new Date().toISOString().split('T')[0]}.pdf`));
};
