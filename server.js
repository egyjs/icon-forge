const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


function getStableIndex(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // simple hash, stays positive
  }
  return hash % max;
}

// SVG file icon generation with query parameters
app.get('/file-icon', async (req, res) => {
  try {
    const { ext, extension, textColor, fontSize: customFontSize, bgColor } = req.query;
    const fileExtension = ext || extension;
    
    if (!fileExtension) {
      return res.status(400).json({ error: 'Extension parameter (ext or extension) is required' });
    }

    // Validate extension
    if (!/^[a-zA-Z0-9]{1,10}$/.test(fileExtension)) {
      return res.status(400).json({ error: 'Invalid file extension. Only alphanumeric characters allowed, max 10 characters.' });
    }

    // Validate textColor if provided (hex color)
    if (textColor && !/^#[0-9A-Fa-f]{6}$/.test(textColor)) {
      return res.status(400).json({ error: 'Invalid textColor. Must be a hex color (e.g., #0078d4)' });
    }

    // Validate fontSize if provided
    if (customFontSize && (isNaN(customFontSize) || customFontSize < 10 || customFontSize > 200)) {
      return res.status(400).json({ error: 'Invalid fontSize. Must be a number between 10 and 200' });
    }

    // Validate bgColor if provided (hex color)
    if (bgColor && !/^#[0-9A-Fa-f]{6}$/.test(bgColor)) {
      return res.status(400).json({ error: 'Invalid bgColor. Must be a hex color (e.g., #f44336)' });
    }

    // Read the SVG template
    const templatePath = path.join(__dirname, 'file-icon-template.svg');
    const svgTemplate = await fs.readFile(templatePath, 'utf8');
    
    const listOfBgColors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'];    // Determine font size
    let fontSize = customFontSize || '100'; // Use custom font size if provided, otherwise default
    if (!customFontSize && fileExtension.length >= 5) {
      fontSize = '75'; // Reduce font size for longer extensions if no custom size provided
    }

    // Determine text color
    const textColorToUse = textColor || '#ffffff'; // Use custom color if provided, otherwise white

    // Determine background color
    const backgroundColorToUse = bgColor || listOfBgColors[getStableIndex(fileExtension, listOfBgColors.length)];

    console.log(`Stable index for ${fileExtension}: ${getStableIndex(fileExtension, listOfBgColors.length)}`);
    
    // Replace the placeholders with the provided values
    const svgContent = svgTemplate
      .replace('{{ext}}', fileExtension.toUpperCase())
      .replace('{{color}}', textColorToUse)
      .replace('{{bgColor}}', backgroundColorToUse)
      .replace('{{fontSize}}', fontSize);

    // Set appropriate headers for SVG
    res.set({
      'Content-Type': 'image/svg+xml',
      'Content-Length': Buffer.byteLength(svgContent, 'utf8'),
      'Cache-Control': 'public, max-age=86400'
    });

    res.send(svgContent);

  } catch (error) {
    console.error('SVG generation error:', error);
    res.status(500).json({ error: 'Failed to generate file icon', details: error.message });
  }
});


// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'File Icon Generation server is running',
    endpoints: ['/file-icon', '/file-icon/:extension', '/file-icon-custom'],
    version: '1.0.0'
  });
});

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'File Icon Generation API',
    description: 'Generate dynamic SVG file icons with custom extensions and styling options',
    endpoints: {
      'GET /file-icon': {
        description: 'Generate a file icon SVG with optional styling parameters',        parameters: {
          ext: 'File extension (e.g., png) - required',
          extension: 'File extension (e.g., jpg) - alias for ext',
          textColor: 'Text color in hex format (e.g., #0078d4) - optional',
          fontSize: 'Font size in pixels (10-200) - optional',
          bgColor: 'Background color in hex format (e.g., #f44336) - optional'
        },
        example: '/file-icon?ext=png&textColor=#0078d4&fontSize=28&bgColor=#f44336'
      },
      'GET /health': {
        description: 'Health check endpoint',
        parameters: {},
        example: '/health'
      }
    },    examples: [
      'GET /file-icon?ext=png',
      'GET /file-icon?ext=js&textColor=#f39c12', 
      'GET /file-icon?ext=pdf&fontSize=150&bgColor=#e74c3c',
      'GET /file-icon?ext=docx&textColor=#0078d4&fontSize=28&bgColor=#3498db',
      'GET /file-icon?ext=json&textColor=#ff6b35&fontSize=24&bgColor=#2ecc71'
    ],    validation: {
      ext: 'Required. Alphanumeric characters only, max 10 characters',
      textColor: 'Optional. Must be valid hex color (#000000 to #FFFFFF)',
      fontSize: 'Optional. Number between 10 and 200',
      bgColor: 'Optional. Must be valid hex color (#000000 to #FFFFFF)'
    },    notes: [
      'All endpoints return SVG content with appropriate headers',
      'File extensions are converted to uppercase in the generated icon',
      'Default text color is white (#ffffff)',
      'Default font size is 100px (or 75px for extensions 5+ characters)',
      'Default font family is Fredoka',
      'Default font weight is 500',
      'SVG files are cached for better performance',
      'Background colors are automatically selected based on extension if not specified'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 File Icon Generation server running on http://localhost:${PORT}`);
  console.log(`📋 API documentation available at http://localhost:${PORT}/api/docs`);
  console.log(`💚 Health check available at http://localhost:${PORT}/health`);
  console.log(`🎨 Try: http://localhost:${PORT}/file-icon/js`);
});

module.exports = app;
