import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Add hover detection for interactive elements
        const addHoverListeners = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, [role="button"], input, textarea, select, .vibe-option, .card-glow, [data-cursor-hover]'
            );

            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", () => setIsHovering(true));
                el.addEventListener("mouseleave", () => setIsHovering(false));
            });
        };

        // Enable custom cursor styling
        document.body.classList.add("custom-cursor-active");

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        // Add hover listeners after a short delay to ensure DOM is ready
        const timeoutId = setTimeout(addHoverListeners, 500);

        // Re-add listeners when DOM changes
        const observer = new MutationObserver(() => {
            addHoverListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [cursorX, cursorY, isVisible]);

    // Don't render on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 48 : 12,
                        height: isHovering ? 48 : 12,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 400,
                    }}
                    className="rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{
                        background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                        boxShadow: isHovering
                            ? "0 0 30px rgba(212, 175, 55, 0.6)"
                            : "0 0 15px rgba(212, 175, 55, 0.4)",
                    }}
                />
            </motion.div>

            {/* Outer Ring (appears on hover) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 64 : 0,
                        height: isHovering ? 64 : 0,
                        opacity: isHovering && isVisible ? 0.5 : 0,
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                    }}
                    className="rounded-full border border-primary -translate-x-1/2 -translate-y-1/2"
                />
            </motion.div>
        </>
    );
};

export default CustomCursor;
