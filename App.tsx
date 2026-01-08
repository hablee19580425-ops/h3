
import React, { useState, useMemo } from 'react';
import { SLOT_GAMES, generateComplexLink } from './constants';
import SlotCard from './components/SlotCard';
import { getGameRecommendation } from './services/geminiService';
import { SlotGame } from './types';

const App: React.FC = () => {
  const [games, setGames] = useState<SlotGame[]>(SLOT_GAMES);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const filteredGames = useMemo(() => {
    return games.filter(game => 
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [games, searchQuery]);

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    const recommendation = await getGameRecommendation(aiInput);
    setAiResponse(recommendation);
    setIsAiLoading(false);
  };

  const handleMultipleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newGamesList: SlotGame[] = [];
    
    (Array.from(files) as File[]).forEach((file) => {
      const localImageUrl = URL.createObjectURL(file);
      const fileName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/-/g, " ");
      
      newGamesList.push({
        id: `local-${Date.now()}-${Math.random()}`,
        name: fileName,
        provider: 'Local Upload',
        thumbnail: localImageUrl,
        link: generateComplexLink(fileName),
        category: 'PS Folder',
        rating: 5.0
      });
    });

    setGames(prev => [...newGamesList, ...prev]);
  };

  const clearToDefault = () => {
    if (confirm('기본 60개 슬롯 리스트로 복구하시겠습니까?')) {
      setGames(SLOT_GAMES);
      setAiResponse(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 selection:bg-yellow-500/30 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)]">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <h1 className="text-xl font-black tracking-tight uppercase italic">SLOT<span className="text-yellow-500">BUFF</span></h1>
          </div>
          
          <div className="flex items-center gap-6">
            <input 
              type="text" 
              placeholder="슬롯 검색..." 
              className="hidden md:block bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs focus:border-yellow-500/50 outline-none w-48 transition-all focus:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              onClick={clearToDefault}
              className="text-slate-500 hover:text-yellow-500 text-[10px] font-black uppercase transition-colors tracking-widest"
            >
              Reset List
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-10">
        {/* 배너 영역 */}
        <section className="mb-12 p-10 bg-gradient-to-br from-[#111] to-[#050505] rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-inner">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
                <span className="text-yellow-500">60</span> 프리슬롯 <br/>
                <span className="opacity-50 text-3xl md:text-5xl">다이렉트 아카이브</span>
              </h2>
              <div className="flex flex-wrap gap-4 mb-8">
                <label className="inline-flex items-center gap-3 bg-yellow-500 text-black font-black px-8 py-4 rounded-2xl cursor-pointer transition-all hover:bg-yellow-400 active:scale-95 text-sm shadow-lg shadow-yellow-500/20">
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleMultipleFilesUpload} />
                  📁 이미지 일괄 동기화
                </label>
                <div className="bg-black/60 border border-white/10 rounded-2xl px-5 py-4 flex items-center shadow-xl">
                  <span className="text-yellow-500/60 font-mono text-xs tracking-wider">SLOTBUFF3.COM_READY</span>
                </div>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="w-full lg:w-96 bg-black/50 p-6 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-2xl">
              <h3 className="text-[11px] font-black text-yellow-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="animate-pulse">●</span> AI GAME FINDER
              </h3>
              <form onSubmit={handleAiAsk} className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="어떤 스타일의 슬롯을 찾으세요?" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-yellow-500 outline-none transition-all"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={isAiLoading}
                  className="w-full bg-slate-100 text-black font-black py-3 rounded-xl text-xs hover:bg-white transition-colors disabled:opacity-50"
                >
                  {isAiLoading ? 'SEARCHING...' : '추천 받기'}
                </button>
              </form>
              {aiResponse && (
                <div className="mt-4 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/10 text-[11px] text-slate-300 leading-relaxed italic">
                  "{aiResponse}"
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 140x140 순수 이미지 그리드 */}
        <section>
          <div className="flex items-center gap-5 mb-10">
            <h3 className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em]">Collections</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="text-xs font-mono text-yellow-500 font-bold">
               TOTAL {filteredGames.length}
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,140px)] justify-center gap-4">
            {/* 업로드 전용 카드 */}
            <label className="w-[140px] h-[140px] border-2 border-dashed border-white/10 bg-white/[0.02] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500/40 hover:bg-yellow-500/[0.03] transition-all group overflow-hidden relative">
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleMultipleFilesUpload} />
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-2 group-hover:bg-yellow-500 group-hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-slate-500 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-white transition-colors">Add New</span>
              <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </label>

            {filteredGames.map(game => (
              <SlotCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center opacity-30">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.6em]">
          Visual Slot Repository &copy; 2024
        </p>
      </footer>
    </div>
  );
};

export default App;
