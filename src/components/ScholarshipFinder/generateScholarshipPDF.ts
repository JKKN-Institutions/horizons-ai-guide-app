import jsPDF from 'jspdf';
import { Scholarship } from './types';

/* ══════════════════════════════════════════════════════════════
   Scholarship Brochure PDF Generator
   Fixed: All characters render correctly (₹ → Rs., • → -, etc.)
   ══════════════════════════════════════════════════════════════ */

type RGB = [number, number, number];

// jsPDF Helvetica does NOT support: ₹ • — – ' ' " "
// This function replaces them with safe ASCII equivalents
const safe = (text: string): string =>
  text
    .replace(/₹/g, 'Rs.')
    .replace(/•/g, '-')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/\u2018/g, "'")  // '
    .replace(/\u2019/g, "'")  // '
    .replace(/\u201C/g, '"')  // "
    .replace(/\u201D/g, '"')  // "
    .replace(/\u2026/g, '...'); // …

const C = {
  dkGreen: [27, 94, 32] as RGB,
  mdGreen: [46, 125, 50] as RGB,
  ltGreen: [200, 230, 201] as RGB,
  paleGrn: [232, 245, 233] as RGB,
  gold:    [218, 165, 32] as RGB,
  white:   [255, 255, 255] as RGB,
  black:   [33, 33, 33] as RGB,
  grey:    [120, 120, 120] as RGB,
  ltGrey:  [245, 245, 245] as RGB,
  blue:    [41, 98, 255] as RGB,
  amtGrn:  [0, 100, 0] as RGB,
  govt:    [230, 126, 34] as RGB,
  govtBg:  [255, 243, 224] as RGB,
  corp:    [41, 98, 255] as RGB,
  corpBg:  [227, 242, 253] as RGB,
  ngo:     [76, 175, 80] as RGB,
  ngoBg:   [232, 245, 233] as RGB,
  sport:   [229, 57, 53] as RGB,
  sportBg: [255, 235, 238] as RGB,
};

const TYPE_CFG: Record<string, { color: RGB; bg: RGB; label: string }> = {
  government: { color: C.govt, bg: C.govtBg, label: 'GOVERNMENT' },
  corporate:  { color: C.corp, bg: C.corpBg, label: 'CORPORATE' },
  ngo:        { color: C.ngo,  bg: C.ngoBg,  label: 'NGO / TRUST' },
  sports:     { color: C.sport, bg: C.sportBg, label: 'SPORTS' },
};

export const generateScholarshipPDF = (scholarships: Scholarship[]) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 15;
  const CW = W - M * 2;
  let y = M;

  // Helpers
  const tc = (c: RGB) => doc.setTextColor(c[0], c[1], c[2]);
  const fc = (c: RGB) => doc.setFillColor(c[0], c[1], c[2]);
  const dc = (c: RGB) => doc.setDrawColor(c[0], c[1], c[2]);
  const rr = (x: number, yy: number, w: number, h: number, r: number, fill: RGB, stroke?: RGB) => {
    fc(fill);
    if (stroke) { dc(stroke); doc.roundedRect(x, yy, w, h, r, r, 'FD'); }
    else doc.roundedRect(x, yy, w, h, r, r, 'F');
  };
  const txt = (text: string, x: number, yy: number, opts?: object) => {
    doc.text(safe(text), x, yy, opts);
  };
  const wrap = (text: string, maxW: number, size: number): string[] => {
    doc.setFontSize(size);
    return doc.splitTextToSize(safe(text), maxW);
  };
  const np = (space: number): boolean => {
    if (y + space > H - 20) { doc.addPage(); y = M; return true; }
    return false;
  };

  // ═══════════════════════════════════════════════════════
  // COVER PAGE
  // ═══════════════════════════════════════════════════════
  fc(C.dkGreen); doc.rect(0, 0, W, 100, 'F');
  fc(C.gold); doc.rect(0, 100, W, 3, 'F');

  tc(C.white); doc.setFont('helvetica', 'bold'); doc.setFontSize(36);
  txt('SCHOLARSHIP', W / 2, 38, { align: 'center' });
  tc(C.gold); doc.setFontSize(32);
  txt('BROCHURE', W / 2, 54, { align: 'center' });

  tc(C.ltGreen); doc.setFontSize(12); doc.setFont('helvetica', 'normal');
  txt('Complete Guide to Financial Aid for Students', W / 2, 70, { align: 'center' });

  tc(C.white); doc.setFontSize(14); doc.setFont('helvetica', 'bold');
  txt('Tamil Nadu & India - 2025-26', W / 2, 84, { align: 'center' });
  tc(C.ltGreen); doc.setFontSize(10); doc.setFont('helvetica', 'normal');
  txt('Powered by VAZHIKATTI - AI Career Guidance Platform', W / 2, 93, { align: 'center' });

  // Summary
  y = 118;
  const govtN = scholarships.filter(s => s.type === 'government').length;
  const corpN = scholarships.filter(s => s.type === 'corporate').length;
  const ngoN  = scholarships.filter(s => s.type === 'ngo').length;
  const sportN = scholarships.filter(s => s.type === 'sports').length;

  rr(M, y, CW, 24, 3, C.paleGrn, C.ltGreen);
  tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
  txt(`${scholarships.length} Scholarships Included`, M + 8, y + 11);
  tc(C.grey); doc.setFontSize(10); doc.setFont('helvetica', 'normal');
  txt(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), M + 8, y + 19);
  tc(C.mdGreen); doc.setFontSize(10); doc.setFont('helvetica', 'bold');
  txt(`Govt: ${govtN}  |  Corporate: ${corpN}  |  NGO: ${ngoN}  |  Sports: ${sportN}`, W - M - 6, y + 15, { align: 'right' });
  y += 34;

  // 4 Category Cards
  const cW = (CW - 9) / 4;
  [
    { key: 'government', n: govtN },
    { key: 'corporate',  n: corpN },
    { key: 'ngo',        n: ngoN },
    { key: 'sports',     n: sportN },
  ].forEach((cat, i) => {
    const cfg = TYPE_CFG[cat.key];
    const cx = M + i * (cW + 3);
    rr(cx, y, cW, 22, 2, cfg.bg, cfg.color);
    fc(cfg.color); doc.rect(cx, y, cW, 3, 'F');
    tc(cfg.color); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
    txt(cfg.label, cx + cW / 2, y + 11, { align: 'center' });
    doc.setFontSize(14);
    txt(`${cat.n}`, cx + cW / 2, y + 19, { align: 'center' });
  });
  y += 32;

  // Table of Contents
  tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
  txt('TABLE OF CONTENTS', M, y);
  fc(C.gold); doc.rect(M, y + 2, 50, 2, 'F');
  y += 12;

  const grouped: Record<string, Scholarship[]> = {};
  scholarships.forEach(s => { if (!grouped[s.type]) grouped[s.type] = []; grouped[s.type].push(s); });

  let tocNum = 1;
  Object.entries(grouped).forEach(([type, list]) => {
    const cfg = TYPE_CFG[type] || TYPE_CFG.government;
    np(8 + list.length * 6);

    tc(cfg.color); doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
    txt(`${cfg.label}  (${list.length})`, M + 2, y);
    y += 6;

    list.forEach(s => {
      np(6);
      tc(C.black); doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
      txt(`${tocNum}.`, M + 5, y);
      doc.setFont('helvetica', 'normal');
      const nm = s.name.length > 42 ? s.name.substring(0, 39) + '...' : s.name;
      txt(nm, M + 13, y);
      tc(C.amtGrn); doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5);
      txt(s.amount, W - M, y, { align: 'right' });
      y += 5.5;
      tocNum++;
    });
    y += 5;
  });

  // ═══════════════════════════════════════════════════════
  // SCHOLARSHIP DETAILS
  // ═══════════════════════════════════════════════════════
  let gIdx = 0;

  Object.entries(grouped).forEach(([type, list]) => {
    const cfg = TYPE_CFG[type] || TYPE_CFG.government;

    // Category Divider
    doc.addPage(); y = M;
    fc(cfg.color); doc.rect(0, 0, W, 44, 'F');
    fc(C.gold); doc.rect(0, 44, W, 2.5, 'F');
    tc(C.white); doc.setFont('helvetica', 'bold'); doc.setFontSize(30);
    txt(cfg.label, W / 2, 22, { align: 'center' });
    doc.setFontSize(13); doc.setFont('helvetica', 'normal');
    txt(`${list.length} Scholarships Available`, W / 2, 36, { align: 'center' });
    y = 58;

    list.forEach((s, idx) => {
      gIdx++;
      np(75);

      // ── Scholarship Name ───────────────────────
      fc(cfg.color); doc.rect(M, y, 3, 8, 'F');
      tc(cfg.color); doc.setFont('helvetica', 'bold'); doc.setFontSize(13);
      const nmLines = wrap(`${gIdx}. ${s.name}`, CW - 12, 13);
      nmLines.forEach((line, li) => { doc.text(line, M + 7, y + 6 + li * 5.5); });
      y += 6 + nmLines.length * 5.5 + 2;

      // Provider
      tc(C.grey); doc.setFont('helvetica', 'italic'); doc.setFontSize(9);
      txt(`by ${s.provider}`, M + 7, y);
      y += 7;

      // ── Info Bar ───────────────────────────────
      const amtLines = wrap(s.amount, CW * 0.35, 11);
      const barH = Math.max(28, 16 + amtLines.length * 5);
      rr(M, y, CW, barH, 3, cfg.bg);

      // AMOUNT
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
      txt('AMOUNT', M + 6, y + 6);
      tc(C.amtGrn); doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
      amtLines.forEach((line, li) => {
        doc.text(line, M + 6, y + 13 + li * 5);
      });

      // DEADLINE
      const c2 = M + CW * 0.42;
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
      txt('DEADLINE', c2, y + 6);
      tc(C.black); doc.setFont('helvetica', 'bold'); doc.setFontSize(12);
      txt(s.deadline, c2, y + 13.5);
      const statusTxt = s.deadlineStatus === 'always-open' ? '(Always Open)' :
        s.deadlineStatus === 'open' ? '(Open Now)' :
        s.deadlineStatus === 'closing-soon' ? '(Closing Soon!)' :
        s.deadlineStatus === 'one-month' ? '(< 1 Month Left)' : '(Coming Soon)';
      tc(C.grey); doc.setFont('helvetica', 'italic'); doc.setFontSize(8);
      txt(statusTxt, c2, y + 20);

      // CATEGORY BADGE
      const c3 = M + CW * 0.74;
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
      txt('CATEGORY', c3, y + 6);
      rr(c3, y + 9, 36, 9, 2.5, cfg.color);
      tc(C.white); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
      txt(cfg.label, c3 + 18, y + 15, { align: 'center' });

      y += barH + 5;

      // ── Description ────────────────────────────
      np(16);
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      txt('DESCRIPTION', M + 2, y);
      y += 5.5;
      tc(C.black); doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5);
      const dLines = wrap(s.description, CW - 4, 9.5);
      dLines.slice(0, 8).forEach(line => {
        np(4.5);
        doc.text(line, M + 2, y);
        y += 4.2;
      });
      y += 3;

      // ── Eligibility ────────────────────────────
      np(14);
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      txt('ELIGIBILITY', M + 2, y);
      y += 5.5;
      tc(C.black); doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
      s.eligibility.slice(0, 6).forEach(item => {
        np(5);
        const iLines = wrap(`-  ${item}`, CW - 8, 9);
        iLines.forEach(line => { doc.text(line, M + 5, y); y += 4; });
      });
      y += 3;

      // ── Documents + How to Apply ───────────────
      np(24);
      const lW = CW * 0.47;
      const rX = M + CW * 0.53;
      const rW = CW * 0.47;
      const colY = y;

      // LEFT: Documents
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      txt('DOCUMENTS REQUIRED', M + 2, y);
      y += 5.5;
      tc(C.black); doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5);
      s.documents.slice(0, 6).forEach(d => {
        np(4.5);
        const dL = wrap(`-  ${d}`, lW - 6, 8.5);
        dL.forEach(line => { doc.text(line, M + 5, y); y += 3.8; });
      });
      const leftEnd = y;

      // RIGHT: How to Apply
      y = colY;
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      txt('HOW TO APPLY', rX, y);
      y += 5.5;
      tc(C.black); doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5);
      s.howToApply.slice(0, 5).forEach((step, si) => {
        const sL = wrap(`${si + 1}. ${step}`, rW - 4, 8.5);
        sL.forEach(line => { doc.text(line, rX + 2, y); y += 3.8; });
      });
      y = Math.max(y, leftEnd) + 4;

      // ── Benefits ───────────────────────────────
      if (s.benefits && s.benefits.length > 0) {
        np(16);
        rr(M, y, CW, 14, 2, C.paleGrn, C.ltGreen);
        const bw = CW / Math.min(s.benefits.length, 4);
        s.benefits.slice(0, 4).forEach((b, bi) => {
          const bx = M + bi * bw;
          tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5);
          txt(b.label.toUpperCase(), bx + bw / 2, y + 5.5, { align: 'center' });
          tc(C.black); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
          txt(b.value, bx + bw / 2, y + 11, { align: 'center' });
        });
        y += 17;
      }

      // ── Contact ────────────────────────────────
      np(12);
      rr(M, y, CW, 10, 2, C.ltGrey);
      doc.setFontSize(8.5); doc.setFont('helvetica', 'bold'); tc(C.grey);
      txt('APPLY:', M + 5, y + 6);
      doc.setFont('helvetica', 'normal'); tc(C.blue);
      const urlTxt = s.applicationUrl.length > 38 ? s.applicationUrl.substring(0, 35) + '...' : s.applicationUrl;
      txt(urlTxt, M + 19, y + 6);
      if (s.helpline) {
        tc(C.grey); doc.setFont('helvetica', 'bold');
        txt('HELPLINE:', W - M - 46, y + 6);
        doc.setFont('helvetica', 'normal'); tc(C.black);
        txt(s.helpline, W - M - 22, y + 6);
      }
      y += 14;

      // Separator
      if (idx < list.length - 1) {
        np(6);
        dc(C.ltGreen);
        doc.setLineDashPattern([2, 2], 0);
        doc.line(M + 25, y, W - M - 25, y);
        doc.setLineDashPattern([], 0);
        y += 7;
      }
    });
  });

  // ═══════════════════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════════════════
  const total = doc.internal.pages.length - 1;
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    fc(C.dkGreen); doc.rect(0, H - 10, W, 10, 'F');
    fc(C.gold); doc.rect(0, H - 10, W, 0.8, 'F');
    tc(C.white); doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
    doc.text('Powered by VAZHIKATTI  |  AI Career Guidance Platform', M, H - 3.5);
    doc.text(safe(`Page ${i} of ${total}`), W - M, H - 3.5, { align: 'right' });
  }

  doc.save(safe(`VAZHIKATTI_Scholarship_Brochure_${new Date().toISOString().split('T')[0]}.pdf`));
};
