import React from 'react';
import { X, CheckCircle, Upload, Settings, ShieldCheck, Download } from 'lucide-react';

interface ThemeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeGuideModal: React.FC<ThemeGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-70 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#100e0e] border border-[rgba(232,224,212,0.2)] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 flex flex-col gap-6 relative shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close guide"
          className="absolute top-5 right-6 text-2xl text-[#e8e0d4] hover:text-white"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div>
          <div className="text-[11px] tracking-[0.3em] uppercase text-[#b3262b] font-medium mb-1.5">
            Deployment &amp; Merchant Guide
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-[#e8e0d4] m-0">
            Installing &amp; Configuring Your A&amp;O Theme
          </h2>
        </div>

        {/* Action Button */}
        <div className="bg-[#161413] border border-[rgba(232,224,212,0.12)] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-sm text-[#e8e0d4] font-medium">Ready-To-Upload Theme Package</div>
            <div className="text-xs text-[#9a928a]">Includes all 71 theme files and original assets (5.8 MB)</div>
          </div>
          <a
            href="/a-and-o-shopify-theme.zip"
            download="a-and-o-shopify-theme.zip"
            className="ao-btn ao-btn-primary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download ZIP</span>
          </a>
        </div>

        {/* Section 1: Upload Instructions */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-base font-serif text-[#e8e0d4] border-b border-[rgba(232,224,212,0.12)] pb-2">
            <Upload className="w-4 h-4 text-[#b3262b]" />
            <span>1. Uploading to Shopify</span>
          </div>
          <ol className="list-decimal list-inside text-sm text-[#d6cdc1] flex flex-col gap-2 leading-relaxed font-light pl-1">
            <li>Log into your <strong>Shopify Admin</strong> dashboard.</li>
            <li>Go to <strong>Online Store &rarr; Themes</strong> in the left sidebar.</li>
            <li>Scroll down to the <strong>Theme library</strong> section and click <strong>Add theme &rarr; Upload zip file</strong>.</li>
            <li>Choose the downloaded file: <code className="text-xs bg-black/60 px-1.5 py-0.5 rounded text-[#e8e0d4]">a-and-o-shopify-theme.zip</code>.</li>
            <li>Click <strong>Upload file</strong>. Shopify will validate and unpack the theme within seconds.</li>
            <li>Click <strong>Customize</strong> to open the native Shopify Theme Editor, or click <strong>Publish</strong> when ready.</li>
          </ol>
        </div>

        {/* Section 2: Configuring in Theme Editor */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-base font-serif text-[#e8e0d4] border-b border-[rgba(232,224,212,0.12)] pb-2">
            <Settings className="w-4 h-4 text-[#b3262b]" />
            <span>2. Theme Editor Configuration</span>
          </div>
          <ul className="text-sm text-[#d6cdc1] flex flex-col gap-2.5 leading-relaxed font-light">
            <li className="flex gap-2">
              <span className="text-[#b3262b]">&bull;</span>
              <div><strong>Bestsellers Collection:</strong> In Theme Editor, click on the <em>Featured collection</em> section and pick your catalog collection.</div>
            </li>
            <li className="flex gap-2">
              <span className="text-[#b3262b]">&bull;</span>
              <div><strong>Customer Reviews Marquee:</strong> Click on <em>Customer reviews marquee</em>. You can reorder, edit quotes, toggle Verified Buyer badges, assign to Row 1 or Row 2, and tune animation speeds (e.g., 42s vs 48s).</div>
            </li>
            <li className="flex gap-2">
              <span className="text-[#b3262b]">&bull;</span>
              <div><strong>Collections Grid:</strong> Assign custom links to each collection card (Men, Women, Unisex) or upload updated campaign banners.</div>
            </li>
            <li className="flex gap-2">
              <span className="text-[#b3262b]">&bull;</span>
              <div><strong>The Seven Symbols:</strong> Pre-populated with the authentic lore for Pomegranate, Thorns, Ash, Obsidian, Crown, Cerberus, and Kingdom.</div>
            </li>
          </ul>
        </div>

        {/* Section 3: Testing Checklist */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-base font-serif text-[#e8e0d4] border-b border-[rgba(232,224,212,0.12)] pb-2">
            <ShieldCheck className="w-4 h-4 text-[#b3262b]" />
            <span>3. Testing &amp; Verification Checklist</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#b7aea3]">
            <div className="flex items-center gap-2 bg-[#090808] p-2 border border-[rgba(232,224,212,0.08)]">
              <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>Full mobile responsiveness (320px to 1440px+)</span>
            </div>
            <div className="flex items-center gap-2 bg-[#090808] p-2 border border-[rgba(232,224,212,0.08)]">
              <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>Two independent continuous marquee rows</span>
            </div>
            <div className="flex items-center gap-2 bg-[#090808] p-2 border border-[rgba(232,224,212,0.08)]">
              <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>Smooth custom cursor with hover state</span>
            </div>
            <div className="flex items-center gap-2 bg-[#090808] p-2 border border-[rgba(232,224,212,0.08)]">
              <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>Cart drawer with $100 free shipping bar</span>
            </div>
            <div className="flex items-center gap-2 bg-[#090808] p-2 border border-[rgba(232,224,212,0.08)]">
              <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>Real-time color swatch filter preview</span>
            </div>
            <div className="flex items-center gap-2 bg-[#090808] p-2 border border-[rgba(232,224,212,0.08)]">
              <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>Shopify Online Store 2.0 JSON schemas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
