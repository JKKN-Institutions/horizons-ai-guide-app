import jsPDF from 'jspdf';
import { Scholarship } from './types';

/* ══════════════════════════════════════════════════════════════
   Scholarship Brochure PDF Generator
   Professional, colorful, well-structured design
   ══════════════════════════════════════════════════════════════ */

type RGB = [number, number, number];

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
  const M = 14;
  const CW = W - M * 2;
  let y = M;

  const tc = (c: RGB) => doc.setTextColor(c[0], c[1], c[2]);
  const fc = (c: RGB) => doc.setFillColor(c[0], c[1], c[2]);
  const dc = (c: RGB) => doc.setDrawColor(c[0], c[1], c[2]);
  const rr = (x: number, yy: number, w: number, h: number, r: number, fill: RGB, stroke?: RGB) => {
    fc(fill);
    if (stroke) { dc(stroke); doc.roundedRect(x, yy, w, h, r, r, 'FD'); }
    else doc.roundedRect(x, yy, w, h, r, r, 'F');
  };
  const wrap = (text: string, maxW: number, size: number): string[] => {
    doc.setFontSize(size);
    return doc.splitTextToSize(text, maxW);
  };
  const np = (space: number): boolean => {
    if (y + space > H - 18) { doc.addPage(); y = M; return true; }
    return false;
  };

  // ═══════════════════════════════════════════════════════
  // ██ COVER PAGE
  // ═══════════════════════════════════════════════════════

  // Dark green header block
  fc(C.dkGreen); doc.rect(0, 0, W, 100, 'F');
  // Gold accent line
  fc(C.gold); doc.rect(0, 100, W, 2.5, 'F');

  // Title
  tc(C.white);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(34);
  doc.text('SCHOLARSHIP', W / 2, 36, { align: 'center' });
  tc(C.gold); doc.setFontSize(30);
  doc.text('BROCHURE', W / 2, 52, { align: 'center' });

  // Subtitle
  tc(C.ltGreen); doc.setFontSize(11); doc.setFont('helvetica', 'normal');
  doc.text('Complete Guide to Financial Aid for Students', W / 2, 66, { align: 'center' });

  // Tagline - neutral
  tc(C.white); doc.setFontSize(13); doc.setFont('helvetica', 'bold');
  doc.text('Tamil Nadu & India — 2025–26', W / 2, 82, { align: 'center' });
  tc(C.ltGreen); doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.text('Powered by VAZHIKATTI — AI Career Guidance Platform', W / 2, 90, { align: 'center' });

  // ─── Summary Box ───────────────────────────────────────
  y = 115;
  const govtN = scholarships.filter(s => s.type === 'government').length;
  const corpN = scholarships.filter(s => s.type === 'corporate').length;
  const ngoN  = scholarships.filter(s => s.type === 'ngo').length;
  const sportN = scholarships.filter(s => s.type === 'sports').length;

  rr(M, y, CW, 22, 3, C.paleGrn, C.ltGreen);
  tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(15);
  doc.text(`${scholarships.length} Scholarships`, M + 8, y + 10);
  tc(C.grey); doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.text(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), M + 8, y + 18);
  tc(C.mdGreen); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.text(`Govt: ${govtN}  |  Corporate: ${corpN}  |  NGO: ${ngoN}  |  Sports: ${sportN}`, W - M - 6, y + 14, { align: 'right' });
  y += 30;

  // ─── 4 Category Cards ─────────────────────────────────
  const cW = (CW - 9) / 4;
  [
    { key: 'government', n: govtN },
    { key: 'corporate',  n: corpN },
    { key: 'ngo',        n: ngoN },
    { key: 'sports',     n: sportN },
  ].forEach((cat, i) => {
    const cfg = TYPE_CFG[cat.key];
    const cx = M + i * (cW + 3);
    rr(cx, y, cW, 20, 2, cfg.bg, cfg.color);
    fc(cfg.color); doc.rect(cx, y, cW, 2.5, 'F');
    tc(cfg.color); doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5);
    doc.text(cfg.label, cx + cW / 2, y + 10, { align: 'center' });
    doc.setFontSize(13);
    doc.text(`${cat.n}`, cx + cW / 2, y + 17.5, { align: 'center' });
  });
  y += 30;

  // ─── Table of Contents ─────────────────────────────────
  tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(15);
  doc.text('TABLE OF CONTENTS', M, y);
  fc(C.gold); doc.rect(M, y + 2, 48, 1.5, 'F');
  y += 10;

  const grouped: Record<string, Scholarship[]> = {};
  scholarships.forEach(s => { if (!grouped[s.type]) grouped[s.type] = []; grouped[s.type].push(s); });

  let tocNum = 1;
  Object.entries(grouped).forEach(([type, list]) => {
    const cfg = TYPE_CFG[type] || TYPE_CFG.government;
    np(8 + list.length * 5.5);

    tc(cfg.color); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
    doc.text(`${cfg.label}  (${list.length})`, M + 2, y);
    y += 5;

    list.forEach(s => {
      np(5.5);
      tc(C.black); doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5);
      doc.text(`${tocNum}.`, M + 4, y);
      doc.setFont('helvetica', 'normal');
      const nm = s.name.length > 45 ? s.name.substring(0, 42) + '...' : s.name;
      doc.text(nm, M + 12, y);
      tc(C.mdGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
      doc.text(s.amount, W - M, y, { align: 'right' });
      y += 5;
      tocNum++;
    });
    y += 4;
  });

  // ═══════════════════════════════════════════════════════
  // ██ SCHOLARSHIP DETAIL PAGES
  // ═══════════════════════════════════════════════════════
  let gIdx = 0;

  Object.entries(grouped).forEach(([type, list]) => {
    const cfg = TYPE_CFG[type] || TYPE_CFG.government;

    // ─── Category Divider Page ───────────────────────
    doc.addPage(); y = M;
    fc(cfg.color); doc.rect(0, 0, W, 42, 'F');
    fc(C.gold); doc.rect(0, 42, W, 2, 'F');
    tc(C.white); doc.setFont('helvetica', 'bold'); doc.setFontSize(28);
    doc.text(cfg.label, W / 2, 20, { align: 'center' });
    doc.setFontSize(12); doc.setFont('helvetica', 'normal');
    doc.text(`${list.length} Scholarships Available`, W / 2, 33, { align: 'center' });
    y = 55;

    // ─── Each Scholarship ────────────────────────────
    list.forEach((s, idx) => {
      gIdx++;
      np(70);

      // ▌ Left accent + Name
      fc(cfg.color); doc.rect(M, y, 2.5, 7, 'F');
      tc(cfg.color); doc.setFont('helvetica', 'bold'); doc.setFontSize(12);
      const nmLines = wrap(`${gIdx}. ${s.name}`, CW - 10, 12);
      nmLines.forEach((line, li) => { doc.text(line, M + 6, y + 5 + li * 5); });
      y += 5 + nmLines.length * 5 + 1;

      // Provider
      tc(C.grey); doc.setFont('helvetica', 'italic'); doc.setFontSize(8.5);
      doc.text(`by ${s.provider}`, M + 6, y);
      y += 6;

      // ── Info Bar (Amount | Deadline | Type) ────
      // Calculate how tall the bar needs to be
      doc.setFontSize(10);
      const amtLines = wrap(s.amount, CW * 0.36, 10);
      const barH = Math.max(26, 14 + amtLines.length * 4.5);
      rr(M, y, CW, barH, 2, cfg.bg);

      // Amount column — FULL text, no truncation, bold green
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
      doc.text('AMOUNT', M + 5, y + 5.5);
      tc([0, 100, 0] as RGB); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      amtLines.forEach((line, li) => {
        doc.text(line, M + 5, y + 12 + li * 4.5);
      });

      // Deadline column — FULL text, bold
      const c2 = M + CW * 0.42;
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
      doc.text('DEADLINE', c2, y + 5.5);
      tc(C.black); doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
      doc.text(s.deadline, c2, y + 12.5);
      // Deadline status label
      const statusLabel = s.deadlineStatus === 'always-open' ? '(Always Open)' :
        s.deadlineStatus === 'open' ? '(Open Now)' :
        s.deadlineStatus === 'closing-soon' ? '(Closing Soon!)' :
        s.deadlineStatus === 'one-month' ? '(< 1 Month Left)' : '(Coming Soon)';
      tc(C.grey); doc.setFont('helvetica', 'italic'); doc.setFontSize(8);
      doc.text(statusLabel, c2, y + 18.5);

      // Type badge — larger
      const c3 = M + CW * 0.74;
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
      doc.text('CATEGORY', c3, y + 5.5);
      rr(c3, y + 8, 34, 8, 2, cfg.color);
      tc(C.white); doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
      doc.text(cfg.label, c3 + 17, y + 13.5, { align: 'center' });

      y += barH + 4;

      // ── Description ────────────────────────────
      np(14);
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      doc.text('DESCRIPTION', M + 2, y);
      y += 5;
      tc(C.black); doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
      const dLines = wrap(s.description, CW - 4, 9);
      dLines.slice(0, 8).forEach(line => { np(4.2); doc.text(line, M + 2, y); y += 4; });
      y += 3;

      // ── Eligibility ────────────────────────────
      np(12);
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      doc.text('ELIGIBILITY', M + 2, y);
      y += 5;
      tc(C.black); doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5);
      s.eligibility.slice(0, 6).forEach(item => {
        np(4.5);
        const iLines = wrap(`•  ${item}`, CW - 8, 8.5);
        iLines.forEach(line => { doc.text(line, M + 4, y); y += 3.8; });
      });
      y += 3;

      // ── Documents + How to Apply (2 columns) ──
      np(22);
      const lW = CW * 0.47;
      const rX = M + CW * 0.53;
      const rW = CW * 0.47;
      const colStartY = y;

      // LEFT: Documents
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      doc.text('DOCUMENTS REQUIRED', M + 2, y);
      y += 5;
      tc(C.black); doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
      s.documents.slice(0, 6).forEach(d => {
        np(4);
        const dL = wrap(`•  ${d}`, lW - 6, 8);
        dL.forEach(line => { doc.text(line, M + 4, y); y += 3.5; });
      });
      const leftEnd = y;

      // RIGHT: How to Apply
      y = colStartY;
      tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      doc.text('HOW TO APPLY', rX, y);
      y += 5;
      tc(C.black); doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
      s.howToApply.slice(0, 5).forEach((step, si) => {
        const sL = wrap(`${si + 1}. ${step}`, rW - 4, 8);
        sL.forEach(line => { doc.text(line, rX + 2, y); y += 3.5; });
      });
      y = Math.max(y, leftEnd) + 3;

      // ── Benefits Row ───────────────────────────
      if (s.benefits && s.benefits.length > 0) {
        np(15);
        rr(M, y, CW, 13, 2, C.paleGrn, C.ltGreen);
        const bw = CW / Math.min(s.benefits.length, 4);
        s.benefits.slice(0, 4).forEach((b, bi) => {
          const bx = M + bi * bw;
          tc(C.dkGreen); doc.setFont('helvetica', 'bold'); doc.setFontSize(7);
          doc.text(b.label.toUpperCase(), bx + bw / 2, y + 5, { align: 'center' });
          tc(C.black); doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
          doc.text(b.value, bx + bw / 2, y + 10, { align: 'center' });
        });
        y += 16;
      }

      // ── Contact Bar ────────────────────────────
      np(10);
      rr(M, y, CW, 9, 2, C.ltGrey);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold'); tc(C.grey);
      doc.text('APPLY:', M + 4, y + 5.5);
      doc.setFont('helvetica', 'normal'); tc(C.blue);
      const urlTxt = s.applicationUrl.length > 40 ? s.applicationUrl.substring(0, 37) + '...' : s.applicationUrl;
      doc.text(urlTxt, M + 18, y + 5.5);
      if (s.helpline) {
        tc(C.grey); doc.setFont('helvetica', 'bold');
        doc.text('HELPLINE:', W - M - 44, y + 5.5);
        doc.setFont('helvetica', 'normal'); tc(C.black);
        doc.text(s.helpline, W - M - 22, y + 5.5);
      }
      y += 13;

      // ── Separator ──────────────────────────────
      if (idx < list.length - 1) {
        np(5);
        dc(C.ltGreen);
        doc.setLineDashPattern([2, 2], 0);
        doc.line(M + 20, y, W - M - 20, y);
        doc.setLineDashPattern([], 0);
        y += 6;
      }
    });
  });

  // ═══════════════════════════════════════════════════════
  // ██ FOOTER ON ALL PAGES
  // ═══════════════════════════════════════════════════════
  const total = doc.internal.pages.length - 1;
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    fc(C.dkGreen); doc.rect(0, H - 9, W, 9, 'F');
    fc(C.gold); doc.rect(0, H - 9, W, 0.7, 'F');
    tc(C.white); doc.setFontSize(7); doc.setFont('helvetica', 'normal');
    doc.text('Powered by VAZHIKATTI  |  AI Career Guidance Platform', M, H - 3.5);
    doc.text(`Page ${i} of ${total}`, W - M, H - 3.5, { align: 'right' });
  }

  // ─── Save ──────────────────────────────────────────────
  doc.save(`VAZHIKATTI_Scholarship_Brochure_${new Date().toISOString().split('T')[0]}.pdf`);
};
