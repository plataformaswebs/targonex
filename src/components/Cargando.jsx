import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import "./css/Cargando.css";

const Cargando = () => {
    const [glow, setGlow] = useState(false);
    const [showElectricEffect, setShowElectricEffect] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const NUM_COLUMNS = isMobile ? 10 : 16;
    const COLUMN_WIDTH_PX = isMobile ? 50 : undefined;

    const [showImage, setShowImage] = useState(false);
    const [showStrips, setShowStrips] = useState(true);

    useEffect(() => {
        const timerGlow = setTimeout(() => {
            setGlow(true);
            setShowElectricEffect(true);

            setTimeout(() => {
                setShowElectricEffect(false);
            }, 1000);
        }, 2000);

        return () => clearTimeout(timerGlow);
    }, []);

    useEffect(() => {
        const showImageTimer = setTimeout(() => {
            setShowImage(true);

            const hideStripsTimer = setTimeout(() => {
                setShowStrips(false);
            }, 2000);

            return () => clearTimeout(hideStripsTimer);
        }, 800);

        return () => clearTimeout(showImageTimer);
    }, []);

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#2e2e2e',
                zIndex: 9999,
            }}
        >
            {showStrips && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        zIndex: 1,
                    }}
                >
                    {Array.from({ length: NUM_COLUMNS }).map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ translateY: index % 2 === 0 ? '-100%' : '100%' }}
                            animate={{ translateY: '0%' }}
                            transition={{
                                duration: 0.8,
                                delay: 0,
                                ease: 'easeInOut',
                            }}
                            style={{
                                flex: isMobile ? '0 0 auto' : '1',
                                width: isMobile ? `${COLUMN_WIDTH_PX}px` : 'auto',
                                height: '100%',
                                backgroundColor: '#000000',
                                margin: 0,
                                padding: 0,
                                border: 'none',
                                boxSizing: 'border-box',
                                position: 'relative',
                                zIndex: 0,
                                transformOrigin: 'left center',
                                backfaceVisibility: 'hidden',
                            }}
                        />
                    ))}
                </Box>
            )}

            <Box
                component="video"
                autoPlay
                muted
                loop
                playsInline
                src="/video-oficial.mp4"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.55) contrast(1.1)',
                    zIndex: 2,
                    opacity: showImage ? 1 : 0,
                    transition: 'opacity 2s ease-in',
                }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showImage ? 1 : 0, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 3,
                    marginTop: isMobile ? '-160px' : '-70px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        position: 'relative',
                        lineHeight: 0,
                    }}
                >
                    <motion.img
                        src="/logo-oficial.png"
                        alt="Targonex"
                        initial={{ y: 20, opacity: 0 }}
                        animate={showImage ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        style={{
                            width: isMobile ? 180 : 240,
                            height: 'auto',
                            display: 'block',
                            position: 'relative',
                            zIndex: 2,
                            filter: glow ? 'drop-shadow(0 0 6px #000000cc)' : 'none',
                            verticalAlign: 'top',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        marginTop: '-10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <motion.svg
                        width="64"
                        height="64"
                        viewBox="0 0 50 50"
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={{
                            opacity: showImage ? 1 : 0,
                            rotate: showImage ? 360 : 0
                        }}
                        transition={{
                            opacity: { duration: 1.2, ease: 'easeOut' },
                            rotate: { repeat: Infinity, duration: 0.9, ease: 'linear' }
                        }}
                    >
                        <defs>
                            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#1f6ff0" stopOpacity="1" />
                                <stop offset="100%" stopColor="#1f6ff0" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        <motion.circle
                            cx="25"
                            cy="25"
                            r="20"
                            stroke="url(#fadeGradient)"
                            strokeWidth="5"
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray="45 155"
                            strokeDashoffset="0"
                        />
                    </motion.svg>
                </Box>
            </motion.div>
        </Box>
    );
};

export default Cargando;
