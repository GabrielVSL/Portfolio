import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    animate,
} from "framer-motion";

const useIsStaticRenderer = () => false;

export default function UserCursor(props) {
    props = { ...COMPONENT_DEFAULTS, ...props };
    const {
        name,
        arrow,
        label,
        color,
        stroke,
        textColor,
        size,
        labelTiltStrength,
        showLabel,
        offsetX,
        offsetY,
        labelOffsetX,
        labelOffsetY,
        labelOffsetUseDefault,
        pressScale,
        classNames,
        offset: offsetOverride,
        labelOffset: labelOffsetOverride,
        style,
        children,
        fullScreen = false,
        hideNativeCursor = true,
        hideOnTouch = true,
        zIndex = 50,
    } = props;
    const isStatic = useIsStaticRenderer();

    const isTouchDevice = false;

    const containerRef = useRef(null);

    const [hovering, setHovering] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [isHoveringClickable, setIsHoveringClickable] = useState(false);

    const arrowSpring = useMemo(
        () => ({ stiffness: 380, damping: 32, mass: 0.6 }),
        []
    );
    const labelSpringCfg = useMemo(
        () => ({ stiffness: 220, damping: 26, mass: 0.7 }),
        []
    );

    const resolvedOffset = useMemo(
        () => ({
            x: offsetOverride?.x ?? offsetX,
            y: offsetOverride?.y ?? offsetY,
        }),
        [offsetOverride?.x, offsetOverride?.y, offsetX, offsetY]
    );

    const resolvedLabelOffset = useMemo(() => {
        if (labelOffsetOverride) {
            return {
                x: labelOffsetOverride.x ?? size * 0.9,
                y: labelOffsetOverride.y ?? size * 0.2 + 6,
            };
        }
        if (labelOffsetUseDefault) {
            return { x: size * 0.9, y: size * 0.2 + 6 };
        }
        return { x: labelOffsetX, y: labelOffsetY };
    }, [
        labelOffsetOverride?.x,
        labelOffsetOverride?.y,
        labelOffsetUseDefault,
        labelOffsetX,
        labelOffsetY,
        size,
    ]);

    const mouseX = useMotionValue(-9999);
    const mouseY = useMotionValue(-9999);

    const arrowX = useSpring(mouseX, arrowSpring);
    const arrowY = useSpring(mouseY, arrowSpring);
    const labelX = useSpring(mouseX, labelSpringCfg);
    const labelY = useSpring(mouseY, labelSpringCfg);

    const scaleMV = useMotionValue(1);
    useEffect(() => {
        const controls = animate(scaleMV, pressed ? pressScale : 1, {
            type: "spring",
            stiffness: 500,
            damping: 28,
            mass: 0.5,
        });
        return () => controls.stop();
    }, [pressed, pressScale, scaleMV]);

    const labelTiltTarget = useMotionValue(0);
    const labelRotation = useSpring(labelTiltTarget, {
        stiffness: 200,
        damping: 24,
        mass: 0.6,
    });

    const lastSampleRef = useRef(null);

    useEffect(() => {
        if (isStatic || isTouchDevice) return;
        if (typeof window === "undefined") return;

        const container = containerRef.current;
        if (!fullScreen && !container) return;

        const getLocal = (clientX, clientY) => {
            return { x: clientX, y: clientY };
        };

        let lastClientX = 0;
        let lastClientY = 0;

        const onMove = (e) => {
            if (e.clientX !== undefined) lastClientX = e.clientX;
            if (e.clientY !== undefined) lastClientY = e.clientY;

            const { x, y } = getLocal(lastClientX, lastClientY);

            const now =
                typeof performance !== "undefined"
                    ? performance.now()
                    : Date.now();
            const last = lastSampleRef.current;
            let vx = 0;
            let vy = 0;
            if (last) {
                const dt = Math.max(1, now - last.t);
                vx = ((x - last.x) / dt) * 1000;
                vy = ((y - last.y) / dt) * 1000;
            }
            lastSampleRef.current = { x, y, t: now };

            mouseX.set(x + resolvedOffset.x);
            mouseY.set(y + resolvedOffset.y);

            const speed = Math.hypot(vx, vy);
            const norm = Math.min(1, speed / 1500);
            const sign = vx === 0 ? 0 : vx > 0 ? 1 : -1;
            labelTiltTarget.set(sign * norm * labelTiltStrength);

            if (e.target && typeof e.target.closest === 'function') {
                const isClickableTag = !!e.target.closest('a, button, [role="button"]');
                let isPointer = false;
                try {
                    const style = window.getComputedStyle(e.target);
                    isPointer = style.cursor === 'pointer';
                } catch (err) {}
                setIsHoveringClickable(isClickableTag || isPointer);
            }

            if (fullScreen) setHovering(true);
        };

        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);

        const onEnter = () => setHovering(true);
        const onLeave = () => {
            setHovering(false);
            lastSampleRef.current = null;
            labelTiltTarget.set(0);
        };

        const onScroll = () => {
            // Se o layer é fixed, não precisamos recalcular posições no scroll
            // pois o clientX/clientY não muda em relação ao viewport!
        };

        if (fullScreen) {
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mousedown", onDown);
            window.addEventListener("mouseup", onUp);
            window.addEventListener("scroll", onScroll, { passive: true });
        } else {
            const el = container;
            el.addEventListener("mousemove", onMove);
            el.addEventListener("mousedown", onDown);
            el.addEventListener("mouseup", onUp);
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
            window.addEventListener("scroll", onScroll, { passive: true });
        }

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (fullScreen) {
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mousedown", onDown);
                window.removeEventListener("mouseup", onUp);
            } else {
                const el = container;
                el.removeEventListener("mousemove", onMove);
                el.removeEventListener("mousedown", onDown);
                el.removeEventListener("mouseup", onUp);
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
            }
            setPressed(false);
        };
    }, [
        isStatic,
        isTouchDevice,
        fullScreen,
        labelTiltStrength,
        resolvedOffset.x,
        resolvedOffset.y,
        mouseX,
        mouseY,
        labelTiltTarget,
    ]);

    const visible = useMemo(() => {
        if (isStatic) return true;
        if (isTouchDevice) return false;
        if (pressed) return false; // Hides custom cursor when pressing/dragging
        return hovering;
    }, [isStatic, isTouchDevice, hovering, pressed]);

    useEffect(() => {
        if (!isStatic) return;
        const el = containerRef.current;
        const w = el?.clientWidth ?? 400;
        const h = el?.clientHeight ?? 300;
        mouseX.set(w * 0.4 + resolvedOffset.x);
        mouseY.set(h * 0.4 + resolvedOffset.y);
        labelTiltTarget.set(0);
        arrowX.set(w * 0.4 + resolvedOffset.x);
        arrowY.set(h * 0.4 + resolvedOffset.y);
        labelX.set(w * 0.4 + resolvedOffset.x);
        labelY.set(h * 0.4 + resolvedOffset.y);
    }, [
        isStatic,
        resolvedOffset.x,
        resolvedOffset.y,
        mouseX,
        mouseY,
        labelTiltTarget,
        arrowX,
        arrowY,
        labelX,
        labelY,
    ]);

    const labelTranslateX = useTransform(
        labelX,
        (v) => v + resolvedLabelOffset.x
    );
    const labelTranslateY = useTransform(
        labelY,
        (v) => v + resolvedLabelOffset.y
    );

    const arrowContent = useMemo(() => {
        if (typeof arrow === "function") {
            try {
                return arrow(color);
            } catch {
                return null;
            }
        }
        if (arrow !== undefined && arrow !== null)
            return arrow;
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block", overflow: "visible" }}
            >
                <path
                    d="M5 3 L23 14 L14 16 L11 24 Z"
                    fill={color}
                    stroke={stroke || "rgba(0,0,0,0.18)"}
                    strokeWidth={stroke === "#000000" ? 1.5 : 0.6}
                    strokeLinejoin="round"
                    style={{ transition: "fill 0.4s ease, stroke 0.4s ease" }}
                />
            </svg>
        );
    }, [arrow, color, size]);

    const labelContent = useMemo(() => {
        if (label !== undefined && label !== null) return label;
        return (
            <div
                className={classNames?.labelText}
                style={{
                    color: textColor,
                    fontSize: style?.fontSize || Math.max(7, size * 0.43),
                    lineHeight: 1.1,
                    fontWeight: 600,
                    fontFamily:
                        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    whiteSpace: "nowrap",
                    letterSpacing: 0.1,
                }}
            >
                {name}
            </div>
        );
    }, [label, name, textColor, size, classNames?.labelText]);


    const hostStyle = {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
        cursor: (hideNativeCursor && !isTouchDevice && hovering) 
                   ? (pressed ? "grabbing" : "none") 
                   : undefined,
        ...style,
    };

    const layerStyle = {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex,
    };

    return (
        <div
            ref={containerRef}
            className={classNames?.root}
            style={hostStyle}
        >
            {children}
            {!isTouchDevice && (
                <CursorLayer
                    layerStyle={layerStyle}
                    visible={visible}
                    arrowX={arrowX}
                    arrowY={arrowY}
                    labelX={labelTranslateX}
                    labelY={labelTranslateY}
                    labelRotation={labelRotation}
                    scale={scaleMV}
                    showLabel={showLabel}
                    color={color}
                    size={size}
                    arrowContent={arrowContent}
                    labelContent={labelContent}
                    classNames={classNames}
                />
            )}
        </div>
    );
}

function CursorLayer(props) {
    const {
        layerStyle,
        visible,
        arrowX,
        arrowY,
        labelX,
        labelY,
        labelRotation,
        scale,
        showLabel,
        color,
        size,
        arrowContent,
        labelContent,
        classNames,
    } = props;

    return (
        <div style={layerStyle}>
            {showLabel && (
                <motion.div
                    className={classNames?.label}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        x: labelX,
                        y: labelY,
                        rotate: labelRotation,
                        scale,
                        background: color,
                        borderRadius: 999,
                        padding: `${size * 0.18}px ${size * 0.36}px`,
                        boxShadow:
                            "0 4px 12px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
                        opacity: visible ? 1 : 0,
                        transformOrigin: "0% 50%",
                        transition: "opacity 140ms ease",
                        willChange: "transform, opacity",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                >
                    {labelContent}
                </motion.div>
            )}

            <motion.div
                className={classNames?.cursor}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    x: arrowX,
                    y: arrowY,
                    scale,
                    width: size,
                    height: size,
                    opacity: visible ? 1 : 0,
                    transformOrigin: "50% 50%",
                    transition: "opacity 140ms ease",
                    willChange: "transform, opacity",
                    pointerEvents: "none",
                }}
            >
                <div
                    className={classNames?.arrow}
                    style={{ width: size, height: size }}
                >
                    {typeof arrowContent === 'function' ? arrowContent({ isHoveringClickable }) : arrowContent}
                </div>
            </motion.div>
        </div>
    );
}

const COMPONENT_DEFAULTS = {
    color: "#FFFFFF",
    size: 24,
    pressScale: 0.92,
    offsetX: 0,
    offsetY: 0,
    showLabel: true,
    name: "Drag",
    textColor: "#000000",
    labelTiltStrength: 25,
    labelOffsetUseDefault: true,
    labelOffsetX: 25,
    labelOffsetY: 12,
};
