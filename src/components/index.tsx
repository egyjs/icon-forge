import type { FC } from 'hono/jsx'

const Index: FC = () => (
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

export default Index;