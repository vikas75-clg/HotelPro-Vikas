import React from 'react';

export const AuthIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center p-6 ${className}`}>
      <svg
        viewBox="0 0 540 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[480px] drop-shadow-xl select-none"
      >
        {/* Soft background glow blobs */}
        <ellipse cx="270" cy="230" rx="200" ry="160" fill="#EEF2FF" />
        <circle cx="110" cy="180" r="45" fill="#E0E7FF" opacity="0.6" />
        <circle cx="430" cy="160" r="38" fill="#DBEAFE" opacity="0.7" />

        {/* Decorative floating dots and polygons */}
        <circle cx="90" cy="90" r="6" fill="#3B82F6" />
        <circle cx="120" cy="115" r="3.5" fill="#93C5FD" />
        <circle cx="450" cy="110" r="5" fill="#2563EB" />
        <circle cx="475" cy="135" r="3" fill="#60A5FA" />
        <polygon points="75,260 85,275 65,275" fill="#3B82F6" opacity="0.7" />
        <polygon points="450,290 465,305 440,310" fill="#60A5FA" opacity="0.8" />
        <rect x="100" y="320" width="16" height="16" rx="3" fill="#93C5FD" opacity="0.5" transform="rotate(25 100 320)" />

        {/* Large Computer Monitor Base & Stand */}
        <path d="M230 380 L310 380 L300 340 L240 340 Z" fill="#94A3B8" />
        <ellipse cx="270" cy="385" rx="65" ry="8" fill="#CBD5E1" />
        <ellipse cx="270" cy="390" rx="90" ry="10" fill="#64748B" opacity="0.3" />

        {/* Monitor Frame */}
        <rect x="95" y="80" width="350" height="255" rx="14" fill="#1E293B" />
        <rect x="105" y="90" width="330" height="235" rx="8" fill="#F8FAFC" />

        {/* Monitor camera */}
        <circle cx="270" cy="85" r="2.5" fill="#64748B" />

        {/* On-screen app wireframe / interface */}
        {/* Top app bar inside screen */}
        <rect x="105" y="90" width="330" height="24" rx="8" fill="#2563EB" />
        <circle cx="120" cy="102" r="3.5" fill="#F87171" />
        <circle cx="132" cy="102" r="3.5" fill="#FBBF24" />
        <circle cx="144" cy="102" r="3.5" fill="#34D399" />
        <rect x="165" y="98" width="80" height="8" rx="4" fill="#DBEAFE" />

        {/* Screen layout sections */}
        <rect x="120" y="126" width="90" height="145" rx="6" fill="#EFF6FF" />
        <rect x="130" y="136" width="70" height="8" rx="3" fill="#BFDBFE" />
        <rect x="130" y="150" width="50" height="6" rx="3" fill="#DBEAFE" />
        <rect x="130" y="162" width="60" height="6" rx="3" fill="#DBEAFE" />
        <rect x="130" y="174" width="45" height="6" rx="3" fill="#DBEAFE" />

        {/* Screen main content dashboard cards */}
        <rect x="220" y="126" width="200" height="55" rx="6" fill="#1E40AF" />
        <rect x="235" y="138" width="90" height="8" rx="3" fill="#FFFFFF" opacity="0.9" />
        <rect x="235" y="152" width="140" height="6" rx="3" fill="#93C5FD" />
        <circle cx="395" cy="153" r="14" fill="#3B82F6" />

        {/* Chart bars on screen */}
        <rect x="220" y="190" width="200" height="80" rx="6" fill="#F1F5F9" />
        <rect x="240" y="235" width="16" height="25" rx="3" fill="#3B82F6" />
        <rect x="268" y="215" width="16" height="45" rx="3" fill="#2563EB" />
        <rect x="296" y="225" width="16" height="35" rx="3" fill="#60A5FA" />
        <rect x="324" y="205" width="16" height="55" rx="3" fill="#1D4ED8" />
        <rect x="352" y="230" width="16" height="30" rx="3" fill="#93C5FD" />
        <rect x="380" y="218" width="16" height="42" rx="3" fill="#3B82F6" />

        {/* Floating Paper Sheets in foreground */}
        <g transform="rotate(-10 160 270)">
          <rect x="120" y="215" width="95" height="120" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))" />
          <rect x="132" y="230" width="70" height="7" rx="3.5" fill="#3B82F6" />
          <rect x="132" y="245" width="55" height="5" rx="2.5" fill="#CBD5E1" />
          <rect x="132" y="256" width="65" height="5" rx="2.5" fill="#E2E8F0" />
          <rect x="132" y="267" width="40" height="5" rx="2.5" fill="#E2E8F0" />
          <circle cx="145" cy="295" r="10" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
          <polyline points="140,295 144,299 151,291" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="162" y="292" width="40" height="6" rx="3" fill="#64748B" />
        </g>

        {/* Coffee cup on desk */}
        <g transform="translate(70, 275)">
          <path d="M15 25 L18 55 C18 58 22 60 28 60 L38 60 C44 60 48 58 48 55 L51 25 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="14" y="22" width="38" height="6" rx="3" fill="#E2E8F0" />
          {/* Handle */}
          <path d="M48 30 C56 30 57 45 47 48" stroke="#CBD5E1" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Steam */}
          <path d="M26 16 Q30 11 26 6" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M34 18 Q38 13 34 8" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
          <ellipse cx="33" cy="62" rx="24" ry="4" fill="#CBD5E1" opacity="0.5" />
        </g>

        {/* Creative Hands with Pencil/Stylus */}
        {/* Left hand holding note */}
        <g>
          {/* Left sleeve */}
          <path d="M110 320 C125 300 145 285 160 275 L180 300 C165 315 140 335 125 345 Z" fill="#2563EB" />
          {/* Hand/fingers */}
          <ellipse cx="178" cy="285" rx="14" ry="9" fill="#FCD34D" transform="rotate(30 178 285)" />
          <ellipse cx="188" cy="275" rx="10" ry="6" fill="#FCD34D" transform="rotate(20 188 275)" />
        </g>

        {/* Right arm and hand drawing */}
        <g>
          {/* Right sleeve */}
          <path d="M360 350 C340 320 315 285 295 260 L320 240 C345 268 375 305 390 335 Z" fill="#1D4ED8" />
          {/* Cuff */}
          <polygon points="295,260 320,240 326,247 301,267" fill="#DBEAFE" />
          {/* Hand */}
          <path d="M285 245 C275 240 260 245 255 255 C250 265 262 275 272 272 C280 270 290 260 285 245 Z" fill="#FCD34D" />
          {/* Big Stylus / Red Pencil */}
          <g transform="rotate(-35 270 250)">
            <rect x="250" y="160" width="14" height="100" rx="3" fill="#EF4444" />
            <polygon points="250,260 264,260 257,278" fill="#FDE68A" />
            <polygon points="255,272 259,272 257,278" fill="#1E293B" />
            {/* Eraser */}
            <rect x="250" y="152" width="14" height="12" rx="3" fill="#F472B6" />
            <rect x="249" y="162" width="16" height="5" fill="#CBD5E1" />
          </g>
        </g>
      </svg>
    </div>
  );
};
