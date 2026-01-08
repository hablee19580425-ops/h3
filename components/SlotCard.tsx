
import React from 'react';
import { SlotGame } from '../types';

interface SlotCardProps {
  game: SlotGame;
}

const SlotCard: React.FC<SlotCardProps> = ({ game }) => {
  return (
    <a 
      href={game.link} 
      target="_blank" 
      rel="noopener noreferrer"
      title={game.name} // 마우스 오버 시 툴팁으로 이름 표시
      className="group relative w-[140px] h-[140px] rounded-lg overflow-hidden bg-[#1a1a1a] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_8px_25px_rgba(0,0,0,0.7)] flex flex-col border border-white/5"
    >
      {/* 이미지 영역 (박스 전체 100% 채움) */}
      <div className="w-full h-full overflow-hidden relative">
        <img 
          src={game.thumbnail} 
          alt={game.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* 호버 시 오버레이 효과 */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>

      {/* 테두리 마감 */}
      <div className="absolute inset-0 border border-white/5 rounded-lg pointer-events-none group-hover:border-yellow-500/30 transition-colors"></div>
    </a>
  );
};

export default SlotCard;
