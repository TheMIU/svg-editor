// Import SVG button functionality
document.getElementById('importBtn').addEventListener('click', function () {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.svg';
    fileInput.addEventListener('change', handleFileUpload);
    fileInput.click();
});

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'image/svg+xml') {
        const reader = new FileReader();
        reader.onload = function (e) {
            const svgCode = e.target.result;

            // Display the SVG code in the textarea
            document.getElementById('svgInput').value = svgCode;

            // Display the SVG in the preview area
            const previewArea = document.getElementById('svgPreview');
            previewArea.innerHTML = '';  // Clear previous SVG

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = svgCode.trim();
            const svgElement = tempDiv.querySelector('svg');

            if (svgElement) {
                previewArea.appendChild(svgElement);
                applyEditingTools(svgElement);  // Apply editing tools to the imported SVG
            } else {
                previewArea.innerText = 'Invalid SVG code!';
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid SVG file.');
    }
}

// preview
document.getElementById('previewBtn').addEventListener('click', function () {
    const svgCode = document.getElementById('svgInput').value;
    const previewArea = document.getElementById('svgPreview');

    previewArea.innerHTML = '';  // Clear previous SVG

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgCode.trim();

    if (tempDiv.firstChild && tempDiv.firstChild.nodeName === 'svg') {
        const svgElement = tempDiv.firstChild;
        previewArea.appendChild(svgElement);

        // Apply editing tools
        applyEditingTools(svgElement);
    } else {
        previewArea.innerText = 'Invalid SVG code! If you believe the code is correct, please ensure to remove any comments or extraneous elements. Only the SVG tag and its contents should be included.';
    }
});

function applyEditingTools(svgElement) {
    const colorPicker = document.getElementById('colorPicker');
    const scaleRange = document.getElementById('scaleRange');
    const rotationRange = document.getElementById('rotationRange');
    const posXRange = document.getElementById('posXRange');
    const posYRange = document.getElementById('posYRange');

    const scaleValue = document.getElementById('scaleValue');
    const rotationValue = document.getElementById('rotationValue');
    const posXValue = document.getElementById('posXValue');
    const posYValue = document.getElementById('posYValue');

    // Input fields
    const scaleInput = document.getElementById('scaleInput');
    const rotationInput = document.getElementById('rotationInput');
    const posXInput = document.getElementById('posXInput');
    const posYInput = document.getElementById('posYInput');

    // Function to apply transformations
    function applyTransform() {
        svgElement.style.transform = `scale(${scaleRange.value}) translate(${posXRange.value}px, ${posYRange.value}px) rotate(${rotationRange.value}deg)`;
    }

    // Color Picker
    colorPicker.addEventListener('input', (e) => {
        svgElement.querySelectorAll('path').forEach(element => {
            element.setAttribute('fill', e.target.value);
        });
    });

    // Scale Range with display and input update
    scaleRange.addEventListener('input', (e) => {
        scaleValue.textContent = e.target.value;
        scaleInput.value = e.target.value; // Update input field
        applyTransform();
    });

    // Scale Input with slider update
    scaleInput.addEventListener('input', (e) => {
        scaleRange.value = e.target.value; // Update slider
        scaleValue.textContent = e.target.value; // Update display
        applyTransform();
    });

    // Rotation Range with display and input update
    rotationRange.addEventListener('input', (e) => {
        rotationValue.textContent = e.target.value;
        rotationInput.value = e.target.value; // Update input field
        applyTransform();
    });

    // Rotation Input with slider update
    rotationInput.addEventListener('input', (e) => {
        rotationRange.value = e.target.value; // Update slider
        rotationValue.textContent = e.target.value; // Update display
        applyTransform();
    });

    // Position X Range with display and input update
    posXRange.addEventListener('input', (e) => {
        posXValue.textContent = e.target.value;
        posXInput.value = e.target.value; // Update input field
        applyTransform();
    });

    // Position X Input with slider update
    posXInput.addEventListener('input', (e) => {
        posXRange.value = e.target.value; // Update slider
        posXValue.textContent = e.target.value; // Update display
        applyTransform();
    });

    // Position Y Range with display and input update
    posYRange.addEventListener('input', (e) => {
        posYValue.textContent = e.target.value;
        posYInput.value = e.target.value; // Update input field
        applyTransform();
    });

    // Position Y Input with slider update
    posYInput.addEventListener('input', (e) => {
        posYRange.value = e.target.value; // Update slider
        posYValue.textContent = e.target.value; // Update display
        applyTransform();
    });
}


// Download SVG
document.getElementById('downloadBtn').addEventListener('click', function () {
    const svgElement = document.getElementById('svgPreview').querySelector('svg');

    if (svgElement) {
        const serializer = new XMLSerializer();
        const svgBlob = new Blob([serializer.serializeToString(svgElement)], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);

        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = 'edited_image.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        URL.revokeObjectURL(svgUrl);
    } else {
        alert('No SVG to download! Please preview the SVG first.');
    }
});
