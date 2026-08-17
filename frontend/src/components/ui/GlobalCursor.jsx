import React from 'react';
import UserCursor from './UserCursor';
import { FaHandPointer } from 'react-icons/fa';
import { useCursor } from '../../contexts/CursorContext';

export default function GlobalCursor() {
  const { cursorState } = useCursor();

  if (!cursorState.active) {
    return null;
  }

  const isDefault = !cursorState.name;

  return (
    <UserCursor
      fullScreen={true}
      showLabel={!isDefault}
      name={cursorState.name}
      color={cursorState.color}
      stroke={cursorState.stroke}
      textColor="#000000"
      size={cursorState.size}
      style={{
        fontSize: 14,
      }}
      arrowContent={({ isHoveringClickable }) => 
        isDefault ? (
          isHoveringClickable ? (
            <div className="w-full h-full text-white drop-shadow-md flex items-center justify-center -translate-y-1 -translate-x-1">
              <FaHandPointer size={20} />
            </div>
          ) : (
            <div className="w-full h-full bg-white rounded-full shadow-sm" />
          )
        ) : null
      }
    />
  );
}
