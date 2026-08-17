"use client"

import { motion, useMotionValue, animate } from "framer-motion"
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react"

function mulberry32(seed) {
    let a = seed >>> 0
    return () => {
        a = (a + 0x6d2b79f5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function fillAndShuffle(items, target, seed) {
    if (items.length === 0) return []
    const rand = mulberry32(seed)
    const out = []
    const refill = () => {
        const pool = items.slice()
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1))
            ;[pool[i], pool[j]] = [pool[j], pool[i]]
        }
        return pool
    }
    let pool = refill()
    while (out.length < target) {
        if (pool.length === 0) pool = refill()
        const next = pool.pop()
        if (out.length > 0 && next === out[out.length - 1] && pool.length > 0) {
            const swap = pool.pop()
            out.push(swap)
            pool.push(next)
        } else {
            out.push(next)
        }
    }
    return out
}

export default function DraggableGrid(props) {
    const {
        items = [],
        columns = 10,
        itemWidth = 150,
        itemHeight = 150,
        gap = 16,
        enableWheel = true,
        renderItem,
        style,
        onItemClick
    } = props

    const containerRef = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const [containerSize, setContainerSize] = useState({ w: 800, h: 600 })
    const [isDragging, setIsDragging] = useState(false)
    const initializedRef = useRef(false)

    const pointerDownPos = useRef(null)
    const wheelAnimX = useRef(null)
    const wheelAnimY = useRef(null)

    const safeItems = Array.isArray(items) && items.length > 0 ? items : []
    const safeColumns = Math.max(1, Math.min(30, Math.floor(columns)))
    const safeItemWidth = itemWidth
    const safeItemHeight = itemHeight
    const safeGap = gap

    const rows = safeColumns
    const totalCells = safeColumns * rows
    const displayItems = useMemo(
        () => fillAndShuffle(safeItems, totalCells, 0xc0ffee),
        [safeItems, totalCells]
    )

    const gridW = safeColumns * safeItemWidth + (safeColumns - 1) * safeGap
    const gridH = rows * safeItemHeight + (rows - 1) * safeGap

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const measure = () => {
            const rect = el.getBoundingClientRect()
            if (rect.width > 0 && rect.height > 0) {
                setContainerSize({ w: rect.width, h: rect.height })
            }
        }
        measure()

        const ro = new ResizeObserver(measure)
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const maxX = safeGap
    const minX = Math.min(maxX, containerSize.w - gridW - safeGap)
    const maxY = safeGap
    const minY = Math.min(maxY, containerSize.h - gridH - safeGap)

    const dragConstraints = {
        left: minX,
        right: maxX,
        top: minY,
        bottom: maxY,
    }

    useEffect(() => {
        if (initializedRef.current) return
        if (containerSize.w === 0 || containerSize.h === 0) return

        // Inicia um pouco no meio para não parecer quebrado na quina
        const startX = minX < maxX ? (minX + maxX) / 2 : maxX
        const startY = minY < maxY ? (minY + maxY) / 2 : maxY

        x.set(startX)
        y.set(startY)
        initializedRef.current = true
    }, [containerSize.w, containerSize.h, maxX, maxY, minX, minY, x, y])

    useEffect(() => {
        if (!enableWheel) return
        const el = containerRef.current
        if (!el) return

        const clamp = (v, mn, mx) => Math.min(Math.max(v, mn), mx)

        const onWheel = (e) => {
            // e.preventDefault() -> se der erro no react usar no div nativo. 
            // framer motion lida com pan, mas wheel passivo pode dar warning.
            const curX = x.get()
            const curY = y.get()
            const targetX = clamp(curX - e.deltaX, minX, maxX)
            const targetY = clamp(curY - e.deltaY, minY, maxY)
            if (wheelAnimX.current) wheelAnimX.current.stop()
            if (wheelAnimY.current) wheelAnimY.current.stop()
            wheelAnimX.current = animate(x, targetX, {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
            })
            wheelAnimY.current = animate(y, targetY, {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
            })
        }

        el.addEventListener("wheel", onWheel, { passive: true })
        return () => {
            el.removeEventListener("wheel", onWheel)
            if (wheelAnimX.current) wheelAnimX.current.stop()
            if (wheelAnimY.current) wheelAnimY.current.stop()
        }
    }, [enableWheel, minX, maxX, minY, maxY, x, y])

    const handlePointerDown = useCallback((e) => {
        pointerDownPos.current = { x: e.clientX, y: e.clientY, t: Date.now() }
    }, [])

    const handlePointerUp = useCallback(
        (e, item, index) => {
            const start = pointerDownPos.current
            pointerDownPos.current = null
            if (!start) return
            const dx = e.clientX - start.x
            const dy = e.clientY - start.y
            const moved = Math.hypot(dx, dy)
            if (moved < 5) {
                onItemClick?.(item, index)
            }
        },
        [onItemClick]
    )

    const wrapperStyle = {
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 300,
        minHeight: 300,
        margin: 0,
        boxSizing: "border-box",
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
        ...style,
    }

    const gridStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: gridW,
        height: gridH,
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: `repeat(${safeColumns}, ${safeItemWidth}px)`,
        gridAutoRows: `${safeItemHeight}px`,
        gap: `${safeGap}px`,
        willChange: "transform",
    }

    return (
        <div ref={containerRef} style={wrapperStyle}>
            <motion.div
                style={{ ...gridStyle, x, y }}
                drag
                dragConstraints={dragConstraints}
                dragElastic={0.1}
                dragMomentum={true}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
            >
                {displayItems.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onPointerDown={handlePointerDown}
                            onPointerUp={(e) => handlePointerUp(e, item, index)}
                            style={{
                                width: safeItemWidth,
                                height: safeItemHeight,
                                pointerEvents: isDragging ? "none" : "auto",
                            }}
                        >
                           {renderItem ? renderItem(item, index) : null}
                        </div>
                    )
                })}
            </motion.div>
        </div>
    )
}
