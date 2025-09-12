import { motion } from "framer-motion";
interface LoadingSpinnerProps {
    size?: number;
    className?: string;
}

export function LoadingSpinner({
                                   size = 48,
                                   className
                               }: LoadingSpinnerProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative" style={{ width: size, height: size }}>
                {/* Rotating circle */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        border: `3px solid #FBCFE8`,
                        borderRadius: "50%",
                        borderTopColor: "#8B5CF6",
                        width: "100%",
                        height: "100%"
                    }}
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 1,
                        ease: "linear",
                        repeat: Infinity
                    }}
                />

                {/* Stationary P letter with gradient */}
                <div className="absolute inset-0 flex items-center justify-center">
          <span
              className="font-bold"
              style={{
                  fontSize: `${size * 0.4}px`,
                  background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "'Playfair Display', serif"
              }}
          >
            P
          </span>
                </div>
            </div>
        </div>
    );
}