/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Copy, 
  Download, 
  Instagram, 
  Phone, 
  MessageCircle, 
  Check, 
  Menu, 
  X,
  Gamepad2,
  HelpCircle,
  Mail
} from "lucide-react";
import { SKINS, Skin } from "./constants";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ["All", "Classic", "Fantasy", "Sci-Fi", "Modern"];

  const filteredSkins = useMemo(() => {
    return SKINS.filter((skin) => {
      const matchesSearch = skin.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || skin.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase italic">
                Skin<span className="text-emerald-500">Hub</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
              <a href="#skins" className="hover:text-emerald-500 transition-colors">Skins</a>
              <a href="#help" className="hover:text-emerald-500 transition-colors">Yardım</a>
              <a href="#contact" className="hover:text-emerald-500 transition-colors">İletişim</a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-white/60 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#111] border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4 text-center uppercase tracking-widest font-bold">
                <a href="#skins" onClick={() => setIsMenuOpen(false)}>Skins</a>
                <a href="#help" onClick={() => setIsMenuOpen(false)}>Yardım</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>İletişim</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6"
          >
            Karakterini <br />
            <span className="text-emerald-500">Yenile</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-light"
          >
            60'tan fazla profesyonel Minecraft skin koleksiyonu. 
            Tek tıkla kopyala veya indir.
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main id="skins" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                    ? "bg-emerald-500 text-black" 
                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              placeholder="Skin ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkins.map((skin, index) => (
              <motion.div
                layout
                key={skin.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/[0.08] hover:border-emerald-500/30 transition-all"
              >
                <div className="aspect-[3/4] bg-[#1a1a1a] rounded-xl mb-4 overflow-hidden relative flex items-center justify-center p-4">
                  <img
                    src={`https://minotar.net/armor/body/${skin.username}/100.png`}
                    alt={skin.name}
                    className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-tighter text-emerald-500">
                    {skin.category}
                  </div>
                </div>

                <h3 className="font-bold text-sm mb-4 truncate">{skin.name}</h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(skin.id, skin.username)}
                    className="flex-1 bg-white/5 hover:bg-emerald-500 hover:text-black p-2 rounded-lg transition-all flex items-center justify-center gap-2 group/btn"
                    title="Kullanıcı Adını Kopyala"
                  >
                    {copiedId === skin.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="text-[10px] font-bold uppercase">Kopyala</span>
                  </button>
                  <a
                    href={`https://minotar.net/download/${skin.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-all"
                    title="İndir"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredSkins.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/20 font-bold uppercase tracking-widest">Sonuç bulunamadı.</p>
          </div>
        )}
      </main>

      {/* Help Section */}
      <section id="help" className="bg-[#0f0f0f] py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <HelpCircle className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black uppercase italic mb-6">Nasıl Kullanılır?</h2>
          <div className="grid gap-8 text-left">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold">1</div>
              <p className="text-white/60">Beğendiğiniz bir skinin altındaki <span className="text-white font-bold">"Kopyala"</span> butonuna basarak kullanıcı adını kopyalayın.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold">2</div>
              <p className="text-white/60">Minecraft launcher'ınızda veya oyun içi skin ayarlarında bu ismi kullanarak skini aktif edebilirsiniz.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold">3</div>
              <p className="text-white/60">Dilerseniz <span className="text-white font-bold">İndir</span> ikonuna tıklayarak skin dosyasını (.png) bilgisayarınıza kaydedebilirsiniz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-black py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-emerald-500 p-1.5 rounded-lg">
                  <Gamepad2 className="w-6 h-6 text-black" />
                </div>
                <span className="text-xl font-bold tracking-tighter uppercase italic">
                  Skin<span className="text-emerald-500">Hub</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Minecraft dünyasında tarzınızı yansıtın. En güncel ve popüler skinler burada.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">İletişim Bilgileri</h4>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/905051438633" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40">WhatsApp</p>
                    <p className="text-sm font-medium">0505 143 86 33</p>
                  </div>
                </a>

                <a 
                  href="https://instagram.com/depul_so" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40">Instagram</p>
                    <p className="text-sm font-medium">@depul_so</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40">Telefon</p>
                    <p className="text-sm font-medium">505 143 86 33</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">Hızlı Destek</h4>
              <p className="text-sm text-white/40">Herhangi bir sorun yaşarsanız veya özel skin talepleriniz olursa bizimle iletişime geçmekten çekinmeyin.</p>
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">destek@skinhub.com</span>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <p>© 2026 SkinHub. Tüm Hakları Saklıdır.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
