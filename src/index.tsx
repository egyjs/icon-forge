import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import { renderToReadableStream, Suspense } from 'hono/jsx/streaming'
import Index from './components/index'
import IconTemplate from './components/iconTemplate'

const app = new Hono()

// Middleware
app.use(cors())
app.use(renderer)

// Helper function for stable color selection
function getStableIndex(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // simple hash, stays positive
  }
  return hash % max;
}


// Main page
app.get('/', (c) => {
  return c.render(<Index />)
})

// SVG file icon generation with query parameters
app.get('/file-icon', async (c) => {
  try {
    const { ext, extension, textColor, fontSize: customFontSize, bgColor } = c.req.query();
    const fileExtension = ext || extension;
    
    if (!fileExtension) {
      return c.json({ error: 'Extension parameter (ext or extension) is required' }, 400);
    }

    // Validate extension
    if (!/^[a-zA-Z0-9]{1,10}$/.test(fileExtension)) {
      return c.json({ error: 'Invalid file extension. Only alphanumeric characters allowed, max 10 characters.' }, 400);
    }

    // Validate textColor if provided (hex color)
    if (textColor && !/^[0-9A-Fa-f]{6}$/.test(textColor)) {
      return c.json({ error: 'Invalid textColor. Must be a hex color (e.g., #0078d4)' }, 400);
    }

    // Validate fontSize if provided
    if (customFontSize && (isNaN(Number(customFontSize)) || Number(customFontSize) < 10 || Number(customFontSize) > 40)) {
      return c.json({ error: 'Invalid fontSize. Must be a number between 10 and 40' }, 400);
    }

    // Validate bgColor if provided (hex color)
    if (bgColor && !/^[0-9A-Fa-f]{6}$/.test(bgColor)) {
      return c.json({ error: 'Invalid bgColor. Must be a hex color (e.g., #f44336)' }, 400);
    }

  

    const listOfBgColors = [
      '#F44336',
      '#E91E63',
      '#9C27B0', 
      '#673AB7', 
      '#3F51B5', 
      '#2196F3', 
      '#03A9F4', 
      '#00BCD4'
    ];

    
    // Determine font size
    let fontSize = customFontSize || '26'; // Use custom font size if provided, otherwise default
    if (!customFontSize && fileExtension.length >= 5) {
      fontSize = '20'; // Reduce font size for longer extensions if no custom size provided
    }

    // Determine text color
    const textColorToUse = textColor ? `#${textColor}` : '#FFFFFF'; // Default to white if no text color provided

    // Determine background color
    const backgroundColorToUse = bgColor ? `#${bgColor}` : listOfBgColors[getStableIndex(fileExtension, listOfBgColors.length)];



    // Replace the placeholders with the provided values
    const svgTemplate = renderToReadableStream(<IconTemplate
          extension={fileExtension.toUpperCase()}
          color={textColorToUse}
          bgColor={backgroundColorToUse}
          fontSize={fontSize}
        />)

    // Set appropriate headers for SVG
    c.header('Content-Type', 'image/svg+xml');
    c.header('Cache-Control', 'public, max-age=86400');
    c.header('Content-Disposition', `inline; filename="${fileExtension}.svg"`);

    return c.body(svgTemplate);
  } catch (error) {
    console.error('SVG generation error:', error as Error);
    return c.json({ error: 'Failed to generate file icon', details: (error as Error).message }, 500);
  }
})

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ 
    status: 'OK', 
    message: 'File Icon Generation server is running',
    endpoints: ['/file-icon', '/health'],
    version: '1.0.0'
  });
})

export default app
