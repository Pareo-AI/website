'use client';

import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

const CELL_PX = 40;
const MINE_DENSITY = 0.16;

const REGULATIONS = [
  { abbr: 'REACH',  flag: '🇪🇺', color: '#a78bfa' },
  { abbr: 'RoHS',   flag: '🇪🇺', color: '#818cf8' },
  { abbr: 'PFAS',   flag: '🇪🇺', color: '#f87171' },
  { abbr: 'SCIP',   flag: '🇪🇺', color: '#fb923c' },
  { abbr: 'TSCA',   flag: '🇺🇸', color: '#4ade80' },
  { abbr: 'P.65',   flag: '🇺🇸', color: '#facc15' },
  { abbr: 'ConMin', flag: '🌐',   color: '#f472b6' },
  { abbr: 'Eco',    flag: '🇪🇺', color: '#22d3ee' },
  { abbr: 'CSRD',   flag: '🇪🇺', color: '#c084fc' },
  { abbr: 'EUBat',  flag: '🇪🇺', color: '#34d399' },
  { abbr: 'IPC',    flag: '🌐',   color: '#fb923c' },
  { abbr: 'OSHA',   flag: '🇺🇸', color: '#60a5fa' },
  { abbr: 'DPP',    flag: '🇪🇺', color: '#e879f9' },
] as const;

type Regulation = typeof REGULATIONS[number];

const NUM_COLORS: Record<number, string> = {
  1: '#7B5CF5',
  2: '#4ade80',
  3: '#f87171',
  4: '#60a5fa',
  5: '#fb923c',
  6: '#22d3ee',
  7: '#f472b6',
  8: '#a78bfa',
};

// ─── Types ────────────────────────────────────────────────────────────────────

type CellStatus = 'hidden' | 'revealed' | 'flagged' | 'exploded' | 'mine-shown';
type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

interface Cell {
  status: CellStatus;
  isMine: boolean;
  reg: Regulation | null;
  n: number; // neighbour mine count
}

interface GameState {
  grid: Cell[][];
  gameStatus: GameStatus;
  rows: number;
  cols: number;
  totalMines: number;
  flagCount: number;
  revealCount: number;
  startTime: number | null;
  elapsed: number;
}

type Action =
  | { type: 'RESIZE'; rows: number; cols: number }
  | { type: 'REVEAL'; r: number; c: number }
  | { type: 'FLAG'; r: number; c: number }
  | { type: 'CHORD'; r: number; c: number }
  | { type: 'TICK' }
  | { type: 'RESET' };

// ─── Pure helpers ─────────────────────────────────────────────────────────────

function makeEmpty(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, (): Cell => ({
      status: 'hidden',
      isMine: false,
      reg: null,
      n: 0,
    }))
  );
}

function plantMines(
  base: Cell[][],
  rows: number,
  cols: number,
  total: number,
  safeR: number,
  safeC: number
): Cell[][] {
  const grid = base.map(row => row.map(c => ({ ...c })));

  const safe = new Set<number>();
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const r = safeR + dr, c = safeC + dc;
      if (r >= 0 && r < rows && c >= 0 && c < cols) safe.add(r * cols + c);
    }
  }

  let placed = 0;
  while (placed < total) {
    const idx = Math.floor(Math.random() * rows * cols);
    if (!safe.has(idx) && !grid[Math.floor(idx / cols)][idx % cols].isMine) {
      const r = Math.floor(idx / cols), c = idx % cols;
      grid[r][c].isMine = true;
      grid[r][c].reg = REGULATIONS[Math.floor(Math.random() * REGULATIONS.length)];
      placed++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].isMine) count++;
        }
      }
      grid[r][c].n = count;
    }
  }

  return grid;
}

function bfsReveal(
  grid: Cell[][],
  rows: number,
  cols: number,
  startR: number,
  startC: number
): { grid: Cell[][]; count: number } {
  const cell = grid[startR][startC];
  if (cell.status !== 'hidden' || cell.isMine) return { grid, count: 0 };

  const toReveal = new Set<number>();
  const queue: [number, number][] = [[startR, startC]];
  const visited = new Set<number>();

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const key = r * cols + c;
    if (visited.has(key)) continue;
    visited.add(key);

    const cur = grid[r][c];
    if (cur.status === 'flagged' || cur.isMine || cur.status === 'revealed') continue;

    toReveal.add(key);

    if (cur.n === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited.has(nr * cols + nc)) {
            queue.push([nr, nc]);
          }
        }
      }
    }
  }

  if (toReveal.size === 0) return { grid, count: 0 };

  const changedRows = new Set<number>();
  for (const key of toReveal) changedRows.add(Math.floor(key / cols));

  const newGrid = grid.map((row, ri) => {
    if (!changedRows.has(ri)) return row;
    return row.map((cell, ci) =>
      toReveal.has(ri * cols + ci) ? { ...cell, status: 'revealed' as CellStatus } : cell
    );
  });

  return { grid: newGrid, count: toReveal.size };
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function initState(rows: number, cols: number): GameState {
  return {
    grid: makeEmpty(rows, cols),
    gameStatus: 'idle',
    rows,
    cols,
    totalMines: Math.floor(rows * cols * MINE_DENSITY),
    flagCount: 0,
    revealCount: 0,
    startTime: null,
    elapsed: 0,
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'RESIZE':
      return initState(action.rows, action.cols);

    case 'RESET':
      return initState(state.rows, state.cols);

    case 'REVEAL': {
      const { r, c } = action;
      if (state.gameStatus === 'won' || state.gameStatus === 'lost') return state;

      const cell = state.grid[r][c];
      if (cell.status !== 'hidden') return state;

      let grid = state.grid;
      let gameStatus = state.gameStatus;
      let startTime = state.startTime;

      if (gameStatus === 'idle') {
        grid = plantMines(grid, state.rows, state.cols, state.totalMines, r, c);
        startTime = Date.now();
        gameStatus = 'playing';
      }

      if (grid[r][c].isMine) {
        const newGrid = grid.map((row, ri) =>
          row.map((cell, ci): Cell => {
            if (ri === r && ci === c) return { ...cell, status: 'exploded' };
            if (cell.isMine && cell.status !== 'flagged') return { ...cell, status: 'mine-shown' };
            return cell;
          })
        );
        return { ...state, grid: newGrid, gameStatus: 'lost', startTime };
      }

      const { grid: newGrid, count } = bfsReveal(grid, state.rows, state.cols, r, c);
      const revealCount = state.revealCount + count;
      const nonMine = state.rows * state.cols - state.totalMines;

      if (revealCount >= nonMine) {
        const wonGrid = newGrid.map(row =>
          row.map((cell): Cell => cell.isMine ? { ...cell, status: 'flagged' } : cell)
        );
        return { ...state, grid: wonGrid, gameStatus: 'won', startTime, revealCount };
      }

      return { ...state, grid: newGrid, gameStatus, startTime, revealCount };
    }

    case 'FLAG': {
      const { r, c } = action;
      if (state.gameStatus === 'won' || state.gameStatus === 'lost' || state.gameStatus === 'idle') return state;

      const cell = state.grid[r][c];
      if (cell.status === 'revealed') return state;

      const newStatus: CellStatus = cell.status === 'flagged' ? 'hidden' : 'flagged';
      const delta = newStatus === 'flagged' ? 1 : -1;

      const newGrid = state.grid.map((row, ri) =>
        ri === r
          ? row.map((cell, ci) => ci === c ? { ...cell, status: newStatus } : cell)
          : row
      );

      return { ...state, grid: newGrid, flagCount: state.flagCount + delta };
    }

    case 'CHORD': {
      const { r, c } = action;
      if (state.gameStatus !== 'playing') return state;

      const cell = state.grid[r][c];
      if (cell.status !== 'revealed' || cell.n === 0) return state;

      let adjFlags = 0;
      const hidden: [number, number][] = [];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;
          const nr = r + dr, nc = c + dc;
          if (nr < 0 || nr >= state.rows || nc < 0 || nc >= state.cols) continue;
          const nb = state.grid[nr][nc];
          if (nb.status === 'flagged') adjFlags++;
          else if (nb.status === 'hidden') hidden.push([nr, nc]);
        }
      }

      if (adjFlags !== cell.n) return state;

      const mineHit = hidden.find(([nr, nc]) => state.grid[nr][nc].isMine);
      if (mineHit) {
        const [mr, mc] = mineHit;
        const newGrid = state.grid.map((row, ri) =>
          row.map((cell, ci): Cell => {
            if (ri === mr && ci === mc) return { ...cell, status: 'exploded' };
            if (cell.isMine && cell.status !== 'flagged') return { ...cell, status: 'mine-shown' };
            return cell;
          })
        );
        return { ...state, grid: newGrid, gameStatus: 'lost' };
      }

      let grid = state.grid;
      let revealCount = state.revealCount;
      for (const [nr, nc] of hidden) {
        const result = bfsReveal(grid, state.rows, state.cols, nr, nc);
        grid = result.grid;
        revealCount += result.count;
      }

      const nonMine = state.rows * state.cols - state.totalMines;
      if (revealCount >= nonMine) {
        const wonGrid = grid.map(row =>
          row.map((cell): Cell => cell.isMine ? { ...cell, status: 'flagged' } : cell)
        );
        return { ...state, grid: wonGrid, gameStatus: 'won', revealCount };
      }

      return { ...state, grid, revealCount };
    }

    case 'TICK': {
      if (state.gameStatus !== 'playing' || !state.startTime) return state;
      const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
      return elapsed === state.elapsed ? state : { ...state, elapsed };
    }

    default:
      return state;
  }
}

// ─── Cell component ───────────────────────────────────────────────────────────

interface CellProps {
  cell: Cell;
  onReveal: () => void;
  onFlag: (e: React.MouseEvent) => void;
  onChord: () => void;
}

const GameCell = React.memo(function GameCell({ cell, onReveal, onFlag, onChord }: CellProps) {
  const handleClick = () => {
    if (cell.status === 'revealed') onChord();
    else onReveal();
  };

  const bg = {
    hidden: '#12121E',
    revealed: '#08080F',
    flagged: '#12121E',
    exploded: 'rgba(239,68,68,0.2)',
    'mine-shown': '#0E0E1A',
  }[cell.status];

  const shadow =
    cell.status === 'hidden'
      ? 'inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.4)'
      : cell.status === 'revealed'
      ? 'inset 1px 1px 0 rgba(0,0,0,0.5), inset -1px -1px 0 rgba(255,255,255,0.02)'
      : undefined;

  const content = (() => {
    switch (cell.status) {
      case 'revealed':
        return cell.n > 0 ? (
          <span style={{
            color: NUM_COLORS[cell.n] ?? '#fff',
            fontSize: '13px',
            fontWeight: 800,
            fontFamily: 'monospace',
            lineHeight: 1,
            userSelect: 'none',
            textShadow: `0 0 8px ${NUM_COLORS[cell.n] ?? '#fff'}55`,
          }}>
            {cell.n}
          </span>
        ) : null;

      case 'flagged':
        return (
          <span style={{ fontSize: '13px', userSelect: 'none', color: '#7B5CF5' }}>⚑</span>
        );

      case 'exploded':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
            <span style={{ fontSize: '11px', lineHeight: 1 }}>{cell.reg?.flag}</span>
            <span style={{
              fontSize: '7px', color: '#f87171', fontWeight: 800, lineHeight: 1,
              fontFamily: 'var(--font-ibm)', letterSpacing: '-0.02em',
            }}>
              {cell.reg?.abbr}
            </span>
          </div>
        );

      case 'mine-shown':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', opacity: 0.8 }}>
            <span style={{ fontSize: '11px', lineHeight: 1 }}>{cell.reg?.flag}</span>
            <span style={{
              fontSize: '7px', color: cell.reg?.color, fontWeight: 700, lineHeight: 1,
              fontFamily: 'var(--font-ibm)', letterSpacing: '-0.02em',
            }}>
              {cell.reg?.abbr}
            </span>
          </div>
        );

      default:
        return null;
    }
  })();

  return (
    <div
      role="button"
      tabIndex={-1}
      onClick={handleClick}
      onContextMenu={e => { e.preventDefault(); onFlag(e); }}
      style={{
        width: CELL_PX,
        height: CELL_PX,
        background: bg,
        boxShadow: shadow,
        border: '1px solid rgba(123,92,245,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: cell.status === 'revealed' && cell.n === 0 ? 'default' : 'pointer',
        transition: 'background 0.1s ease',
        userSelect: 'none',
        position: 'relative',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        if (cell.status === 'hidden') (e.currentTarget as HTMLDivElement).style.background = '#1E1E35';
      }}
      onMouseLeave={e => {
        if (cell.status === 'hidden') (e.currentTarget as HTMLDivElement).style.background = '#12121E';
      }}
    >
      {content}
      {cell.status === 'exploded' && (
        <div style={{
          position: 'absolute', inset: 0,
          border: '2px solid rgba(239,68,68,0.7)',
          boxShadow: '0 0 16px rgba(239,68,68,0.5)',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
});

// ─── HUD ──────────────────────────────────────────────────────────────────────

function GameHUD({ state, onReset }: { state: GameState; onReset: () => void }) {
  const remaining = state.totalMines - state.flagCount;
  const statusEmoji =
    state.gameStatus === 'won' ? '😎' :
    state.gameStatus === 'lost' ? '😵' : '🙂';
  const time = String(Math.min(state.elapsed, 999)).padStart(3, '0');
  const mineStr = String(Math.max(remaining, 0)).padStart(3, '0');

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        background: 'rgba(13, 13, 26, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(123,92,245,0.22)',
        borderRadius: '100px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(123,92,245,0.08) inset',
        overflow: 'hidden',
      }}
    >
      {/* Mine counter */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '10px 16px 10px 20px',
      }}>
        <span style={{ fontSize: '11px', opacity: 0.7 }}>⚑</span>
        <span style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '17px', fontWeight: 700,
          color: '#f87171', letterSpacing: '0.06em',
          minWidth: '30px', display: 'inline-block',
        }}>
          {mineStr}
        </span>
      </div>

      <div style={{ width: '1px', height: '24px', background: 'rgba(123,92,245,0.2)' }} />

      {/* Reset / status */}
      <div style={{ padding: '8px 14px' }}>
        <button
          onClick={onReset}
          title="New game (R)"
          style={{
            background: 'rgba(123,92,245,0.12)',
            border: '1px solid rgba(123,92,245,0.28)',
            borderRadius: '50%',
            width: '34px', height: '34px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
            transition: 'background 0.15s, transform 0.1s',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(123,92,245,0.28)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(123,92,245,0.12)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          {statusEmoji}
        </button>
      </div>

      <div style={{ width: '1px', height: '24px', background: 'rgba(123,92,245,0.2)' }} />

      {/* Timer */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '10px 16px',
      }}>
        <span style={{ fontSize: '11px', opacity: 0.5 }}>⏱</span>
        <span style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '17px', fontWeight: 700,
          color: '#7B5CF5', letterSpacing: '0.06em',
          minWidth: '30px', display: 'inline-block',
        }}>
          {time}
        </span>
      </div>

      <div style={{ width: '1px', height: '24px', background: 'rgba(123,92,245,0.2)' }} />

      {/* Label */}
      <div style={{
        padding: '10px 20px 10px 16px',
        display: 'flex', flexDirection: 'column', gap: '1px',
      }}>
        <span style={{
          fontSize: '9px', fontWeight: 700,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'var(--font-ibm)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          lineHeight: 1.3,
        }}>
          Regulation
        </span>
        <span style={{
          fontSize: '9px', fontWeight: 700,
          color: 'rgba(123,92,245,0.8)',
          fontFamily: 'var(--font-ibm)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          lineHeight: 1.3,
        }}>
          Sweeper
        </span>
      </div>

      {/* Status message */}
      {(state.gameStatus === 'won' || state.gameStatus === 'lost') && (
        <>
          <div style={{ width: '1px', height: '24px', background: 'rgba(123,92,245,0.2)' }} />
          <div style={{
            padding: '10px 20px 10px 16px',
            fontSize: '11px',
            fontFamily: 'var(--font-ibm)',
            color: state.gameStatus === 'won' ? '#4ade80' : '#f87171',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            {state.gameStatus === 'won' ? 'All clear! 🎉' : 'Regulation hit!'}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function RegulationSweeper() {
  const [state, dispatch] = useReducer(reducer, { rows: 20, cols: 40 }, d => initState(d.rows, d.cols));
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const initialised = useRef(false);

  // Fit grid to viewport
  useEffect(() => {
    const update = () => {
      const cols = Math.floor(window.innerWidth / CELL_PX);
      const rows = Math.floor(window.innerHeight / CELL_PX);
      if (!initialised.current) {
        initialised.current = true;
        dispatch({ type: 'RESIZE', rows, cols });
      } else {
        dispatch({ type: 'RESIZE', rows, cols });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Timer
  useEffect(() => {
    tickRef.current = setInterval(() => dispatch({ type: 'TICK' }), 500);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, []);

  // Keyboard: R to reset
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') dispatch({ type: 'RESET' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleReveal = useCallback((r: number, c: number) => {
    dispatch({ type: 'REVEAL', r, c });
  }, []);

  const handleFlag = useCallback((r: number, c: number, e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'FLAG', r, c });
  }, []);

  const handleChord = useCallback((r: number, c: number) => {
    dispatch({ type: 'CHORD', r, c });
  }, []);

  const handleReset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <>
      {/* Full-viewport game grid — sits behind all page content */}
      <div
        aria-hidden="true"
        onContextMenu={e => e.preventDefault()}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          overflow: 'hidden',
          zIndex: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${state.cols}, ${CELL_PX}px)`,
          gridTemplateRows: `repeat(${state.rows}, ${CELL_PX}px)`,
        }}
      >
        {state.grid.map((row, ri) =>
          row.map((cell, ci) => (
            <GameCell
              key={`${ri}-${ci}`}
              cell={cell}
              onReveal={() => handleReveal(ri, ci)}
              onFlag={e => handleFlag(ri, ci, e)}
              onChord={() => handleChord(ri, ci)}
            />
          ))
        )}
      </div>

      <GameHUD state={state} onReset={handleReset} />
    </>
  );
}
