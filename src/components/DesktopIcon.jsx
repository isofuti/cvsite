import React, { useState } from 'react';

export const DesktopIcon = ({ id, icon: Icon, label, isSelected, onClick, onDoubleClick, color }) => {
  return (
    <div 
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={(e) => { e.stopPropagation(); onClick(id); }}
      onDoubleClick={(e) => { e.stopPropagation(); onDoubleClick(id); }}
    >
      <div className="desktop-icon-img">
        <Icon size={32} color={color || '#007aff'} />
      </div>
      <span className="desktop-icon-label">{label}</span>
    </div>
  );
};
