// NES blues (we can adjust these)
const NES_COLORS = {
    darkestBlue: '#000080',  // Dark blue
    darkBlue: '#0000FF',     // Medium blue
    mainBlue: '#3333FF',     // Bright blue
    lightBlue: '#6666FF',    // Light blue
};

export function drawBlueRailroad(ctx, width, height) {
    const colors = {
        // Main body colors
        darkestBlue: '#001428',
        darkBlue: '#002952',
        mainBlue: '#004080',
        mediumBlue: '#0059b3',
        lightBlue: '#0073e6',
        highlightBlue: '#3399ff',

        // Metallic accents
        darkMetal: '#4d4d4d',
        metal: '#808080',
        lightMetal: '#b3b3b3',
        brightMetal: '#d9d9d9',

        // Steam/glow effects
        steamBase: 'rgba(255, 255, 255, 0.2)',
        steamHighlight: 'rgba(255, 255, 255, 0.4)',

        // Warm highlights for the headlight/lantern
        lanternGlow: '#ffcc00',
        lanternCore: '#fff7e6'
    };

    // Clear canvas
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, width, height);

    // Main boiler front (circular)
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = colors.mainBlue;
    ctx.fill();

    // Add metallic rim
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width * 0.42, 0, Math.PI * 2);
    ctx.strokeStyle = colors.metal;
    ctx.lineWidth = width * 0.02;
    ctx.stroke();

    // Headlight/lantern glow effect
    const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width * 0.2
    );
    gradient.addColorStop(0, colors.lanternCore);
    gradient.addColorStop(0.2, colors.lanternGlow);
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add rivets around the edge
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x = width / 2 + Math.cos(angle) * width * 0.38;
        const y = height / 2 + Math.sin(angle) * width * 0.38;

        ctx.beginPath();
        ctx.arc(x, y, width * 0.02, 0, Math.PI * 2);
        ctx.fillStyle = colors.lightMetal;
        ctx.fill();
    }

    // Steam effects (multiple layers)
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, width * (0.45 + i * 0.05),
            Math.PI * 0.2, Math.PI * 0.8, false);
        ctx.strokeStyle = colors.steamBase;
        ctx.lineWidth = width * 0.01;
        ctx.stroke();
    }
} 