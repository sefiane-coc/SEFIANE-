document.getElementById('aobToByte').addEventListener('click', function() {
    const inputField = document.getElementById('inputField');
    const outputField = document.getElementById('outputField');
    const devInfo = document.querySelector('.dev-info');

    if (inputField.value === "") {
        devInfo.textContent = "No codes to convert";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
        return;
    }

    let text = inputField.value.trim();
    let array = text.split(/\s+/).filter(Boolean);
    let list = [];
    let flag = false;

    array = array.map(item => item.toUpperCase());

    for (let item of array) {
        if (item.startsWith("0X") || item === "?" || item === "'?'") {
            flag = true;
            break;
        }
    }

    if (flag) {
        devInfo.textContent = "This text is already in BYTE format.";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
        return;
    }
    for (let item of array) {
        if (item === "??" || item === "?") {
            list.push("'?'");
        } else {
            list.push("0x" + item);
        }
    }

    let result = list.join(", ");
    outputField.value = result;
    devInfo.textContent = "Text converted from AOB to BYTE successfully.";
    devInfo.classList.add('pulse');
    setTimeout(() => devInfo.classList.remove('pulse'), 1500);
});

document.getElementById('clearAll').addEventListener('click', function() {
    const inputField = document.getElementById('inputField');
    const outputField = document.getElementById('outputField');
    const devInfo = document.querySelector('.dev-info');
    inputField.value = "";
    outputField.value = "";
    devInfo.textContent = "SEFIANE CHEAT";
});

document.getElementById('byteToAob').addEventListener('click', function() {
    const inputField = document.getElementById('inputField');
    const outputField = document.getElementById('outputField');
    const devInfo = document.querySelector('.dev-info');

    if (inputField.value === "") {
        devInfo.textContent = "No codes to convert";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
        return;
    }

    let text = inputField.value.trim();
    let array = text.split(/[,\s]+/).filter(Boolean);
    let result = "";

    for (let item of array) {
        if (item === "'?'") {
            result += "?? ";
        } else {
            let str = item.replace(/^0x/i, "");
            result += str + " ";
        }
    }

    let aobText = result.trim();

    if (aobText === text) {
        devInfo.textContent = "This text is already in AOB format.";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
        return;
    }
    outputField.value = aobText;
    devInfo.textContent = "Text converted from BYTE to AOB successfully.";
    devInfo.classList.add('pulse');
    setTimeout(() => devInfo.classList.remove('pulse'), 1500);
});

document.getElementById('outputIconButton3').addEventListener('click', function() {
    const outputField = document.getElementById('outputField');
    const devInfo = document.querySelector('.dev-info');

    if (outputField.value === "") {
        devInfo.textContent = "Nothing to copy";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
        return;
    }

    navigator.clipboard.writeText(outputField.value)
        .then(() => {
            devInfo.textContent = "Text copied to clipboard";
            devInfo.classList.add('pulse');
            setTimeout(() => devInfo.classList.remove('pulse'), 1500);
        })
        .catch(() => {
            devInfo.textContent = "Failed to copy";
            devInfo.classList.add('shake');
            setTimeout(() => devInfo.classList.remove('shake'), 500);
        });
});

document.getElementById('outputIconButton4').addEventListener('click', function() {
    const outputField = document.getElementById('outputField');
    const devInfo = document.querySelector('.dev-info');
    outputField.value = "";
    devInfo.textContent = "SEFIANE CHEAT";
});

document.getElementById('inputIconButton2').addEventListener('click', function() {
    const inputField = document.getElementById('inputField');
    const devInfo = document.querySelector('.dev-info');
    inputField.value = "";
    devInfo.textContent = "SEFIANE CHEAT";
});

document.getElementById("inputIconButton1").addEventListener("click", function() {
    const devInfo = document.querySelector('.dev-info');
    navigator.clipboard.readText().then(text => {
        if (text) {
            document.getElementById("inputField").value = text;
            devInfo.textContent = "Text pasted successfully";
            devInfo.classList.add('pulse');
            setTimeout(() => devInfo.classList.remove('pulse'), 1500);
        } else {
            devInfo.textContent = "Clipboard is empty";
            devInfo.classList.add('shake');
            setTimeout(() => devInfo.classList.remove('shake'), 500);
        }
    }).catch(() => {
        devInfo.textContent = "Failed to read clipboard";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
    });
});

// Image Converter
const dropArea = document.getElementById('dropArea');
const imageInput = document.getElementById('imageInput');
const addImageButton = document.getElementById('addImageButton');
const clearImageButton = document.getElementById('clearImageButton');
const convertImageButton = document.getElementById('convertImageButton');
const imagePreview = document.getElementById('imagePreview');
const imageInfo = document.getElementById('imageInfo');
const imageResult = document.getElementById('imageResult');
const imageActions = document.getElementById('imageActions');
const copyImageButton = document.getElementById('copyImageButton');
const downloadImageButton = document.getElementById('downloadImageButton');

let selectedImage = null;
let imageByteArray = null;

addImageButton.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    handleImage(file);
});

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    handleImage(file);
});

function handleImage(file) {
    if (file && file.type.startsWith('image/')) {
        selectedImage = file;

        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);

        // Show file info
        imageInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        imageInfo.style.display = 'block';

        // Hide previous results
        imageResult.style.display = 'none';
        imageActions.style.display = 'none';
    } else {
        alert("Please select a valid image file.");
    }
}

clearImageButton.addEventListener('click', () => {
    selectedImage = null;
    imageInput.value = "";
    imagePreview.style.display = 'none';
    imageInfo.style.display = 'none';
    imageResult.style.display = 'none';
    imageActions.style.display = 'none';
});

convertImageButton.addEventListener('click', () => {
    if (!selectedImage) {
        alert("Please upload an image first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const array = new Uint8Array(e.target.result);
        imageByteArray = array;

        // Create byte array text
        let byteText = "";
        for (let i = 0; i < array.length; i++) {
            byteText += `0x${array[i].toString(16).padStart(2, '0')}`;
            if (i < array.length - 1) {
                byteText += `, `;
                if ((i + 1) % 16 === 0) byteText += `\n`;
            }
        }

        // Create full content
        let fullContent = `byte[] imageBytes = {\n${byteText}\n};`;

        // Display result
        imageResult.textContent = fullContent;
        imageResult.style.display = 'block';
        imageActions.style.display = 'flex';
    };

    reader.onerror = function() {
        alert("Error reading the image.");
    };

    reader.readAsArrayBuffer(selectedImage);
});

copyImageButton.addEventListener('click', () => {
    if (!imageByteArray) return;

    let byteText = "";
    for (let i = 0; i < imageByteArray.length; i++) {
        byteText += `0x${imageByteArray[i].toString(16).padStart(2, '0')}`;
        if (i < imageByteArray.length - 1) {
            byteText += `, `;
        }
    }

    navigator.clipboard.writeText(byteText)
        .then(() => {
            copyImageButton.textContent = "Copied!";
            setTimeout(() => {
                copyImageButton.textContent = "Copy Byte";
            }, 2000);
        })
        .catch(() => {
            alert("Failed to copy to clipboard");
        });
});

downloadImageButton.addEventListener('click', () => {
    if (!imageResult.textContent) return;

    const blob = new Blob([imageResult.textContent], {
        type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ImageConverted SEFIANE CHEAT.txt';
    a.click();
    URL.revokeObjectURL(url);

    downloadImageButton.textContent = "Downloaded!";
    setTimeout(() => {
        downloadImageButton.textContent = "Download File";
    }, 2000);
});

// Font Converter
const fontDropArea = document.getElementById('fontDropArea');
const fontInput = document.getElementById('fontInput');
const addFontButton = document.getElementById('addFontButton');
const clearFontButton = document.getElementById('clearFontButton');
const convertFontButton = document.getElementById('convertFontButton');
const fontInfo = document.getElementById('fontInfo');
const fontResult = document.getElementById('fontResult');
const fontActions = document.getElementById('fontActions');
const copyFontButton = document.getElementById('copyFontButton');
const downloadFontButton = document.getElementById('downloadFontButton');

let selectedFont = null;
let fontByteArray = null;

addFontButton.addEventListener('click', () => {
    fontInput.click();
});

fontInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    handleFont(file);
});

fontDropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    fontDropArea.classList.add('dragover');
});

fontDropArea.addEventListener('dragleave', () => {
    fontDropArea.classList.remove('dragover');
});

fontDropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    fontDropArea.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    handleFont(file);
});

function handleFont(file) {
    if (file && (file.type === "font/ttf" || file.type === "font/otf" || file.name.endsWith('.ttf') || file.name.endsWith('.otf'))) {
        selectedFont = file;

        // Show file info
        fontInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        fontInfo.style.display = 'block';

        // Hide previous results
        fontResult.style.display = 'none';
        fontActions.style.display = 'none';
    } else {
        alert("Please select a valid font file (TTF/OTF).");
    }
}

clearFontButton.addEventListener('click', () => {
    selectedFont = null;
    fontInput.value = "";
    fontInfo.style.display = 'none';
    fontResult.style.display = 'none';
    fontActions.style.display = 'none';
});

convertFontButton.addEventListener('click', () => {
    if (!selectedFont) {
        alert("Please upload a font first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const array = new Uint8Array(e.target.result);
        fontByteArray = array;

        // Create byte array text
        let byteText = "";
        for (let i = 0; i < array.length; i++) {
            byteText += `0x${array[i].toString(16).padStart(2, '0')}`;
            if (i < array.length - 1) {
                byteText += `, `;
                if ((i + 1) % 16 === 0) byteText += `\n`;
            }
        }

        // Create full content
        let fullContent = `byte[] fontBytes = {\n${byteText}\n};`;

        // Display result
        fontResult.textContent = fullContent;
        fontResult.style.display = 'block';
        fontActions.style.display = 'flex';
    };

    reader.onerror = function() {
        alert("Error reading the font.");
    };

    reader.readAsArrayBuffer(selectedFont);
});

copyFontButton.addEventListener('click', () => {
    if (!fontByteArray) return;

    let byteText = "";
    for (let i = 0; i < fontByteArray.length; i++) {
        byteText += `0x${fontByteArray[i].toString(16).padStart(2, '0')}`;
        if (i < fontByteArray.length - 1) {
            byteText += `, `;
        }
    }

    navigator.clipboard.writeText(byteText)
        .then(() => {
            copyFontButton.textContent = "Copied!";
            setTimeout(() => {
                copyFontButton.textContent = "Copy Byte";
            }, 2000);
        })
        .catch(() => {
            alert("Failed to copy to clipboard");
        });
});

downloadFontButton.addEventListener('click', () => {
    if (!fontResult.textContent) return;

    const blob = new Blob([fontResult.textContent], {
        type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FontConverted SEFIANE CHEAT.txt';
    a.click();
    URL.revokeObjectURL(url);

    downloadFontButton.textContent = "Downloaded!";
    setTimeout(() => {
        downloadFontButton.textContent = "Download File";
    }, 2000);
});


// Color Picker
const colorPicker = document.getElementById('colorPicker');
const hexValue = document.getElementById('hexValue');
const rgbaValue = document.getElementById('rgbaValue');
const rgbFloatValue = document.getElementById('rgbFloatValue');
const cmykValue = document.getElementById('cmykValue');
const hsvValue = document.getElementById('hsvValue');
const hslValue = document.getElementById('hslValue');
const hexPreview = document.getElementById('hexPreview');
const rgbaPreview = document.getElementById('rgbaPreview');
const colorPreviewBox = document.getElementById('colorPreviewBox');

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = hex.length > 7 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
    return {
        r,
        g,
        b,
        a
    };
}

function rgbToCmyk(r, g, b) {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);

    c = (c - k) / (1 - k) || 0;
    m = (m - k) / (1 - k) || 0;
    y = (y - k) / (1 - k) || 0;

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function updateColorValues(hex) {
    const {
        r,
        g,
        b,
        a
    } = hexToRgb(hex);
    const alphaPercent = Math.round(a * 100);

    // Update preview box
    colorPreviewBox.style.background = hex.length > 7 ? hex : `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
    colorPreviewBox.textContent = hex.length > 7 ? hex : `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

    // Update values
    hexValue.textContent = hex.toUpperCase();
    rgbaValue.textContent = `${r}, ${g}, ${b}, ${a.toFixed(2)}`;

    // Update float values
    const rFloat = (r / 255).toFixed(2);
    const gFloat = (g / 255).toFixed(2);
    const bFloat = (b / 255).toFixed(2);
    rgbFloatValue.textContent = `${rFloat}f, ${gFloat}f, ${bFloat}f`;

    // Update CMYK
    const {
        c,
        m,
        y,
        k
    } = rgbToCmyk(r, g, b);
    cmykValue.textContent = `${c}%, ${m}%, ${y}%, ${k}%`;

    // Update HSV
    const {
        h: hHsv,
        s: sHsv,
        v: vHsv
    } = rgbToHsv(r, g, b);
    hsvValue.textContent = `${hHsv}°, ${sHsv}%, ${vHsv}%`;

    // Update HSL
    const {
        h: hHsl,
        s: sHsl,
        l: lHsl
    } = rgbToHsl(r, g, b);
    hslValue.textContent = `${hHsl}°, ${sHsl}%, ${lHsl}%`;

    // Update preview colors
    hexPreview.style.backgroundColor = hex;
    rgbaPreview.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
}

colorPicker.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    updateColorValues(selectedColor);
});

// Initialize with default color
updateColorValues(colorPicker.value);

// Copy to clipboard function
function copyToClipboard(button, text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            button.style.backgroundColor = "#4CAF50";
            setTimeout(() => {
                button.style.backgroundColor = "";
            }, 500);
        })
        .catch(() => {
            button.style.backgroundColor = "#000000";
            setTimeout(() => {
                button.style.backgroundColor = "";
            }, 1000);
        });
}

// Add event to all copy buttons
document.querySelectorAll('.copyButton').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            copyToClipboard(button, targetElement.textContent);
        }
    });
});

// Particles animation
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = document.body.scrollHeight;

const particleCount = 300;
const drawCount = 60;
const particles = [];
const speedMultiplier = 3;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.targetX = Math.random() * canvas.width;
        this.targetY = canvas.height * 2;
        this.speed = (Math.random() * 3 + 1) * speedMultiplier;
        this.size = Math.random() * 6 + 2;
        this.radius = Math.random() * 3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
        const deltaTime = 1 / 60;
        this.x += (this.targetX - this.x) * deltaTime * (this.speed / 60);
        this.y += (this.targetY - this.y) * deltaTime * (this.speed / 60);
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.reset();
            this.y = -20;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Glow effect
        for (let j = 0; j < 5; j++) {
            const alpha = 0.1 - j * 0.02;
            ctx.fillStyle = `rgba(187, 0, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(0, 0, this.size + j * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Main shape
        ctx.fillStyle = "#bb00ff";
        ctx.beginPath();
        ctx.moveTo(this.size, 0);
        for (let i = 1; i <= 5; i++) {
            const angle = (i * 2 * Math.PI) / 5;
            ctx.lineTo(this.size * 0.5 * Math.cos(angle), this.size * 0.5 * Math.sin(angle));
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update canvas size if window resized
    if (canvas.width !== window.innerWidth || canvas.height !== document.body.scrollHeight) {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
    }

    // Draw particles
    for (let i = 0; i < Math.min(drawCount, particles.length); i++) {
        particles[i].update();
        particles[i].draw();
    }

    requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
});

// Handle scroll
window.addEventListener('scroll', () => {
    // Particles will follow the scroll naturally because canvas is fixed
});


// CS to Offsets Converter
const csDropArea = document.getElementById('csDropArea');
const csInput = document.getElementById('csInput');
const addCsButton = document.getElementById('addCsButton');
const clearCsButton = document.getElementById('clearCsButton');
const extractOffsetsButton = document.getElementById('extractOffsetsButton');
const csFileInfo = document.getElementById('csFileInfo');
const csStatus = document.getElementById('csStatus');
const csResult = document.getElementById('csResult');
const csActions = document.getElementById('csActions');
const copyCsButton = document.getElementById('copyCsButton');
const downloadCsButton = document.getElementById('downloadCsButton');

let csFileContent = "";

// قاعدة البيانات المحدثة (أضفت PlayerAttributes)
const searchSections = [
    {
        section: "Bones - Player (Head, Body, Limbs)",
        entries: {
            "Head":                  "OLCJOGDHJJJ",
            "Root":                  "MPJBGDJJJMJ",
            "Chest / Spine":         "HCLMADAFLPD",
            "Hip / Pelvis":          "OLJBCONDGLO",
            "Left Ankle":            "BMGCHFGEDDA",
            "Right Ankle":           "AGHJLIMNPJA",
            "Left Toe":              "FDMBKCKMODA",
            "Right Toe":             "CKABHDJDMAP",
            "Left Shoulder":         "LIBEIIIAGIK",
            "Right Shoulder":        "HDEPJIBNIIK",
            "Right Hand":            "NJDDAPKPILB",
            "Left Hand":             "JHIBMHEMJOL",
            "Right Forearm":         "JBACCHNMGNJ",
            "Left Forearm":          "FGECMMJKFNC"
        }
    },

    {
        section: "Match & Game Core",
        entries: {
            "CurrentMatch":          "m_Match",
            "MatchStatus":           "LICPHHNNPPF ILGECLEFCCO",
            "LocalPlayer":           "Player FJPEHEGICBO",
            "CurrentObserver":       "FNCMBMMKLLI BGGJJKKKFDC"
        }
    },

    {
        section: "Player Status & Info",
        entries: {
            "Player_IsDead":         "bool FHMPKFMFEPM",
            "Player_Name":           "string OIAJCBLDHKP",
            "AvatarManager":         "AvatarManager FOGJNGDMJKJ",
            "FollowCamera":          "FollowCamera CHDOHNOEBML",
            "AimRotation":           "Quaternion <KCFEHMAIINO>k__BackingField",
            "XPose":                 "FBCAHNCLMDC ADFIDIPODGK"
        }
    },

    {
        section: "Weapon & Combat",
        entries: {
            "Weapon":                "GPBDEDFKJNA ActiveUISightingWeapon",
            "WeaponData":            "int KDKFDCPBIGE",
            "WeaponRecoil":          "float EFMCDHABKGP",
            "sAim1":                 "bool <LPEIEILIKGC>k__BackingField",
            "sAim2":                 "MADMMIICBNN GEGFCFDGGGP",
            "sAim3":                 "0x38",
            "sAim4":                 "Vector3 NHKKHPLFMNG",
            "AimbotVisible":         "Collider HECFNHJKOMN",
            "NoReload":              "ShootNoReload"
        }
    },

    {
        section: "Avatar & Visibility",
        entries: {
            "Avatar":                "IUmaAvatar EEAGBKBMBLD",
            "WeaponData":      "CHEJCCHHDMH <NOAOCMKGLAH>k__BackingField",
            "IntWeaponType":         "OOIPMACFIFL LAEMLAPIAFD"
        }
    },

    {
        section: "Observer & View Matrix",
        entries: {
            "ObserverPlayer":        "Player NJMDHHGDNPJ",
            "ViewMatrixV1":          "<>f__mg$cache26",
            "ViewMatrixV2":          "<>f__mg$cache9"
        }
    },

    {
        section: "Miscellaneous / Time & Attributes",
        entries: {
            "GameTimer":             "m_DeltaTime",
            "FixedDeltaTime":        "m_FixedDeltaTime",
            "PlayerAttributes":      "protected PlayerAttributes JKPFFNEMJIF;"   // ← الإضافة الجديدة هنا
        }
    }
];

// ────────────────────────────────────────────────
// دالة استخراج الـ Offsets مع التنسيق المطلوب: uintptr_t Name = 0xXXXX;
// ────────────────────────────────────────────────

function extractOffsets() {
    if (!csFileContent) {
        csStatus.textContent = "لم يتم تحميل أي ملف .cs بعد";
        csStatus.style.color = "#ff5252";
        return;
    }

    const lines = csFileContent.split('\n');
    let result = "Extracted Offsets & References\nGenerated by SEFIANE CHEATS\n";
    let foundAny = false;

    searchSections.forEach(section => {
        if (Object.keys(section.entries).length === 0) {
            result += "\n";
            return;
        }

        result += `\n// ${section.section}\n`;

        Object.entries(section.entries).forEach(([name, searchStr]) => {
            // بحث مرن باستخدام RegExp (يتجاهل المسافات الزائدة والحساسية لحالة الأحرف)
            const regex = new RegExp(searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            const line = lines.find(l => regex.test(l.trim()));

            let offset = "غير موجود";

            if (line) {
                // أولوية 1: التعليق المباشر // 0x...
                const commentMatch = line.match(/\/\/\s*(0x[0-9a-fA-F]+)/i);
                if (commentMatch) {
                    offset = commentMatch[1];
                } else {
                    // أولوية 2: أي قيمة سداسية في السطر
                    const hexMatch = line.match(/0x[0-9a-fA-F]+/i);
                    if (hexMatch) {
                        offset = hexMatch[0];
                    }
                }

                // التنسيق المطلوب: uintptr_t Name = offset;
                result += `uintptr_t ${name} = ${offset};\n`;
                foundAny = true;
            } else {
                result += `uintptr_t ${name} = غير موجود;\n`;
            }
        });

        result += "\n";
    });

    if (!foundAny) {
        result += "\nلم يتم العثور على أي من العناصر المطلوبة في الملف.\n";
    }

    csResult.textContent = result;
    csResult.style.display = 'block';
    csActions.style.display = 'flex';
    csStatus.textContent = "تم استخراج البيانات بنجاح";
    csStatus.style.color = "#4caf50";
}

// ────────────────────────────────────────────────
// باقي الدوال (بدون تغيير كبير)
// ────────────────────────────────────────────────

function handleCsFile(file) {
    if (!file || !file.name.endsWith('.cs')) {
        csStatus.textContent = "يرجى اختيار ملف .cs صالح";
        csStatus.style.color = "#ff5252";
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        csFileContent = e.target.result;
        csFileInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        csFileInfo.style.display = 'block';
        csStatus.textContent = "تم تحميل الملف بنجاح. جاهز للاستخراج";
        csStatus.style.color = "#4caf50";
        csResult.style.display = 'none';
        csActions.style.display = 'none';
    };
    reader.readAsText(file);
}

function clearCsFile() {
    csFileContent = "";
    csInput.value = "";
    csFileInfo.style.display = 'none';
    csResult.style.display = 'none';
    csActions.style.display = 'none';
    csStatus.textContent = "تم مسح الملف";
    csStatus.style.color = "#ffffff";
}

function copyCsResult() {
    if (!csResult.textContent) return;
    navigator.clipboard.writeText(csResult.textContent)
        .then(() => {
            copyCsButton.textContent = "تم النسخ!";
            setTimeout(() => copyCsButton.textContent = "Copy Offsets", 2000);
        })
        .catch(() => alert("فشل النسخ إلى الحافظة"));
}

function downloadCsResult() {
    if (!csResult.textContent) return;
    const blob = new Blob([csResult.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SEFIANE_Offsets_Extracted.txt';
    a.click();
    URL.revokeObjectURL(url);
    downloadCsButton.textContent = "تم التحميل!";
    setTimeout(() => downloadCsButton.textContent = "Download File", 2000);
}

// ربط الأحداث
addCsButton.addEventListener('click', () => csInput.click());
csInput.addEventListener('change', (e) => handleCsFile(e.target.files[0]));
csDropArea.addEventListener('dragover', e => { e.preventDefault(); csDropArea.classList.add('dragover'); });
csDropArea.addEventListener('dragleave', () => csDropArea.classList.remove('dragover'));
csDropArea.addEventListener('drop', e => {
    e.preventDefault();
    csDropArea.classList.remove('dragover');
    handleCsFile(e.dataTransfer.files[0]);
});
extractOffsetsButton.addEventListener('click', extractOffsets);
clearCsButton.addEventListener('click', clearCsFile);
copyCsButton.addEventListener('click', copyCsResult);
downloadCsButton.addEventListener('click', downloadCsResult);

