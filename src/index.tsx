import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import IconTemplate from './components/iconTemplate'
import { renderToReadableStream, Suspense } from 'hono/jsx/streaming'

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

// Icon Forge Main Page Component
function IconForgePage() {
  return (
    <div className="container">
      <h1>🔥 Icon Forge - Dynamic File Icon Generator API</h1>
      
      <div className="section">
        <h2>Overview</h2>
        <p>Icon Forge generates dynamic SVG file icons with custom file extensions and optional styling. Use the endpoints below to get SVG icons for any file type.</p>
      </div>

      <div className="section">
        <h2>Endpoints</h2>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GET</td>
              <td>/file-icon?ext=EXT</td>
              <td>Generate icon for extension (e.g. <code>ext=js</code>)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Parameters</h2>
        <ul>
          <li><b>ext</b> or <b>extension</b>: File extension (alphanumeric, max 10 chars)</li>
          <li><b>fontSize</b>: Font size in px</li>
          <li><b>textColor</b>: Text color (hex, e.g. <code>0078d4</code>)</li>
          <li><b>bgColor</b>: Background color (hex, e.g. <code>3498db</code>)</li>
        </ul>
      </div>

      <div className="section">
        <h2>Examples</h2>
        <div className="api-examples">
          <h3>Basic Icon</h3>
          <code style={{color: '#fff'}}>
            GET /file-icon?ext=js
          </code>
          <br /><br />
          
          <h3>Custom Styled Icon</h3>
          <code style={{color: '#fff'}}>
            GET /file-icon?ext=docx&textColor=0078d4&fontSize=25&bgColor=3498db
          </code>
          <br /><br />
          
          <h3>Custom Background Color</h3>
          <code style={{color: '#fff'}}>
            GET /file-icon?ext=json&textColor=ff6b35&fontSize=25&bgColor=2ecc71
          </code>
        </div>
      </div>

      
      <div className="section footer">
        <p>Made with <span style={{color: 'var(--secondary-color)'}}>&#10084;</span> by the Icon Forge community
            | <a href="/api/docs">API JSON</a> | <a href="https://github.com/egyjs/icon-forge">GitHub</a></p>
      </div>
    </div>
  );
}

// Main page
app.get('/', (c) => {
  return c.render(<IconForgePage />)
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
