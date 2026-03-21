addEventListener('DOMContentLoaded', () => {
    const memeCanvas = document.getElementById('meme-canvas');
    const imageUpload = document.getElementById('image-upload');
    const topText = document.getElementById('top-text');
    const bottomText = document.getElementById('bottom-text');
    const textColor = document.getElementById('text-color');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    const image = new Image();
    const ctx = memeCanvas.getContext('2d');

    let textObjects = [];
    let dragging = null;
    let offsetX = 0, offsetY = 0;

    function getCanvasPos(e) {
        const rect = memeCanvas.getBoundingClientRect();
        const scaleX = memeCanvas.width / rect.width;
        const scaleY = memeCanvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    function redraw() {
        ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
        if (image.src) ctx.drawImage(image, 0, 0);

        textObjects.forEach(obj => {
            const fontSize = memeCanvas.width * 0.06;
            ctx.font = `bold ${fontSize}px Impact`;
            ctx.fillStyle = obj.color;
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = fontSize / 10;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.strokeText(obj.text, obj.x, obj.y);
            ctx.fillText(obj.text, obj.x, obj.y);
        });
    }

    function hitTest(pos) {
        const fontSize = memeCanvas.width * 0.06;
        for (let i = textObjects.length - 1; i >= 0; i--) {
            const obj = textObjects[i];
            const width = ctx.measureText(obj.text).width;
            if (
                pos.x >= obj.x - width / 2 &&
                pos.x <= obj.x + width / 2 &&
                pos.y >= obj.y - fontSize / 2 &&
                pos.y <= obj.y + fontSize / 2
            ) {
                return i;
            }
        }
        return null;
    }

    memeCanvas.addEventListener('mousedown', (e) => {
        const pos = getCanvasPos(e);
        const idx = hitTest(pos);
        if (idx !== null) {
            dragging = idx;
            offsetX = pos.x - textObjects[idx].x;
            offsetY = pos.y - textObjects[idx].y;
            memeCanvas.style.cursor = 'grabbing';
        }
    });

    memeCanvas.addEventListener('mousemove', (e) => {
        const pos = getCanvasPos(e);
        if (dragging !== null) {
            textObjects[dragging].x = pos.x - offsetX;
            textObjects[dragging].y = pos.y - offsetY;
            redraw();
        } else {
            const idx = hitTest(pos);
            memeCanvas.style.cursor = idx !== null ? 'grab' : 'default';
        }
    });

    memeCanvas.addEventListener('mouseup', () => {
        dragging = null;
        memeCanvas.style.cursor = 'default';
    });
    memeCanvas.addEventListener('dblclick', (e) => {
        const pos = getCanvasPos(e);
        const idx = hitTest(pos);
        if (idx === null) return;

        const obj = textObjects[idx];
        const rect = memeCanvas.getBoundingClientRect();
        const scaleX = rect.width / memeCanvas.width;
        const scaleY = rect.height / memeCanvas.height;

        const input = document.createElement('input');
        input.value = obj.text;
        input.style.cssText = `
        position: fixed;
        left: ${rect.left + obj.x * scaleX}px;
        top: ${rect.top + obj.y * scaleY}px;
        transform: translate(-50%, -50%);
        font: bold ${memeCanvas.width * 0.06 * scaleX}px Impact;
        color: ${obj.color};
        background: rgba(0,0,0,0.5);
        border: 2px dashed white;
        text-align: center;
        outline: none;
        padding: 4px 8px;
        z-index: 1000;
        min-width: 100px;
    `;

        document.body.appendChild(input);
        input.focus();
        input.select();

        function finishEdit() {
            if (input.value.trim()) obj.text = input.value.trim();
            document.body.removeChild(input);
            redraw();
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') finishEdit();
            if (e.key === 'Escape') { document.body.removeChild(input); redraw(); }
        });
        input.addEventListener('blur', finishEdit);
    });
    function generateMeme() {
        if (!image.src) return;
        const fontSize = memeCanvas.width * 0.06;

        textObjects = [];
        if (topText.value) {
            textObjects.push({
                text: topText.value,
                x: memeCanvas.width / 2,
                y: fontSize,
                color: textColor.value
            });
        }
        if (bottomText.value) {
            textObjects.push({
                text: bottomText.value,
                x: memeCanvas.width / 2,
                y: memeCanvas.height - fontSize,
                color: textColor.value
            });
        }
        redraw();
    }

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                image.src = e.target.result;
                image.onload = () => {
                    memeCanvas.width = image.width;
                    memeCanvas.height = image.height;
                    ctx.drawImage(image, 0, 0);
                };
            };
            reader.readAsDataURL(file);
        }
    });

    const templatesGrid = document.querySelector('.templates-grid');
    templatesGrid.addEventListener('click', (event) => {
        if (!event.target.classList.contains('template-img')) return;
        image.src = event.target.src;
        image.onload = () => {
            memeCanvas.width = image.width;
            memeCanvas.height = image.height;
            generateMeme();
        };
    });

    generateBtn.addEventListener('click', generateMeme);

    function downloadMeme() {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = memeCanvas.toDataURL();
        link.click();
    }

    function resetMeme() {
        ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
        topText.value = '';
        bottomText.value = '';
        image.src = '';
        textObjects = [];
    }

    downloadBtn.addEventListener('click', downloadMeme);
    resetBtn.addEventListener('click', resetMeme);
});