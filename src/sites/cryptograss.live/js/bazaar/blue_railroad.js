const COLORS = {
    skyBlue: '#87CEEB',
    skyLightBlue: '#ADD8E6',
    cloudWhite: '#FFFFFF',
    trainBlue: '#0066CC',
    darkBlue: '#003366',
    brightRed: '#FF0000',
    woodBrown: '#8B4513',
    lightWoodBrown: '#DEB887',
    railSilver: '#C0C0C0',
    smokeGray: '#808080',
    smokePink: '#FFB6C1',
    grassLight: '#90EE90',
    grassDark: '#228B22',
    flowerWhite: '#FFFFFF'
};

function drawPixel(ctx, x, y, size) {
    ctx.fillRect(x * size, y * size, size, size);
}

export function drawBlueRailroad(ctx, width, height) {
    ctx.imageSmoothingEnabled = false;
    const gridSize = 64;
    const pixelSize = width / gridSize;

    const scene = [
        "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",  // Gradient sky
        "LLLLLLLLLLWWWWWWLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",  // Clouds
        "LLLLLLLWWWWWWWWWWLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",
        "LLLLLLLLWWWWWWWLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",
        "                PPPPGGGGPP                        ",  // Smoke (P=pink)
        "               PPPPGGGGPPPP                       ",
        "              PPPPGGGGPPPPPP                      ",
        "        BBBB  PPPGGGGPPPPPP    GGGGGGGG          ",  // Train starts
        "      BBDDDDBBBBBBBBBBBBBB    GGDDDDGGGG         ",  // Trees
        "     BBDDWWWWDDBBBBBBBBBB    GGDDDDDDGGGG        ",
        "    BBDDWWWWWWDDBBBBBBBB    GGDDDDDDDDGGGG       ",
        "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",    // Track ties
        " SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ",    // Rails
        "  SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS  ",
        "   SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS   ",    // Perspective
        "    SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS    ",
        "     SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS     ",
        "      SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS      ",
        "gggggggggggggggggggggggggggggggggggggggggggg",    // Grass
        "ggggggggggfggggggggfggggggggfggggggggfgggggg"     // f=flowers
    ];

    // Center it
    const offsetX = (gridSize - scene[0].length) / 2;
    const offsetY = (gridSize - scene.length) / 2;

    scene.forEach((row, y) => {
        [...row].forEach((pixel, x) => {
            switch (pixel) {
                case 'L':
                    ctx.fillStyle = COLORS.skyBlue;
                    break;
                case 'W':
                    ctx.fillStyle = COLORS.cloudWhite;
                    break;
                case 'R':
                    ctx.fillStyle = COLORS.brightRed;
                    break;
                case 'B':
                    ctx.fillStyle = COLORS.darkBlue;
                    break;
                case 'K':
                    ctx.fillStyle = COLORS.trainBlue;
                    break;
                case 'g':
                    ctx.fillStyle = COLORS.grassDark;
                    break;
                case 'O':
                    ctx.fillStyle = COLORS.grassLight;
                    break;
                case 'r':
                    ctx.fillStyle = COLORS.lightWoodBrown;
                    break;
                case 'P':
                    ctx.fillStyle = COLORS.smokePink;
                    break;
                case 'T':
                    ctx.fillStyle = COLORS.smokeGray;
                    break;
                case 'S':
                    ctx.fillStyle = COLORS.railSilver;
                    break;
                case 'D':
                    ctx.fillStyle = COLORS.woodBrown;
                    break;
                case 'f':
                    ctx.fillStyle = COLORS.flowerWhite;
                    break;
                default:
                    return;
            }
            drawPixel(ctx, x + offsetX, y + offsetY, pixelSize);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('blueRailroadCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        drawBlueRailroad(ctx, canvas.width, canvas.height);
    }
}); 