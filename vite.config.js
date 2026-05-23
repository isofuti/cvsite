import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Custom Vite plugin to handle saving and deleting blog posts locally
function localAdminPlugin() {
  return {
    name: 'local-admin-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && (req.url === '/api/add-post' || req.url === '/api/delete-post')) {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              
              if (req.url === '/api/add-post') {
                const { title_ru, title_en, text_ru, text_en, date, imageBase64, imageName, category } = data;
                
                // 1. Save image if exists
                let imagePath = '/blog/default.jpg';
                if (imageBase64) {
                  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
                  const buffer = Buffer.from(base64Data, 'base64');
                  const filename = `${Date.now()}_${imageName || 'image.jpg'}`;
                  const publicBlogDir = path.resolve(__dirname, 'public/blog');
                  if (!fs.existsSync(publicBlogDir)) {
                    fs.mkdirSync(publicBlogDir, { recursive: true });
                  }
                  fs.writeFileSync(path.join(publicBlogDir, filename), buffer);
                  imagePath = `/blog/${filename}`;
                }

                // 2. Append to blog.json
                const blogJsonPath = path.resolve(__dirname, 'src/data/blog.json');
                let posts = [];
                if (fs.existsSync(blogJsonPath)) {
                  posts = JSON.parse(fs.readFileSync(blogJsonPath, 'utf8'));
                } else {
                  const srcDataDir = path.resolve(__dirname, 'src/data');
                  if (!fs.existsSync(srcDataDir)) {
                    fs.mkdirSync(srcDataDir, { recursive: true });
                  }
                }

                const newPost = {
                  id: `post_${Date.now()}`,
                  title_ru,
                  title_en,
                  text_ru,
                  text_en,
                  date: date || new Date().toLocaleDateString('ru-RU'),
                  image: imagePath,
                  category: category || 'General'
                };

                posts.unshift(newPost); // Add to beginning
                fs.writeFileSync(blogJsonPath, JSON.stringify(posts, null, 2), 'utf8');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, post: newPost }));
              } 
              
              else if (req.url === '/api/delete-post') {
                const { id } = data;
                const blogJsonPath = path.resolve(__dirname, 'src/data/blog.json');
                if (fs.existsSync(blogJsonPath)) {
                  let posts = JSON.parse(fs.readFileSync(blogJsonPath, 'utf8'));
                  
                  // Also try to delete image file from public if it's not the default image
                  const postToDelete = posts.find(p => p.id === id);
                  if (postToDelete && postToDelete.image && postToDelete.image !== '/blog/default.jpg' && postToDelete.image.startsWith('/blog/')) {
                    const imgFile = path.join(__dirname, 'public', postToDelete.image);
                    if (fs.existsSync(imgFile)) {
                      try { fs.unlinkSync(imgFile); } catch (e) { console.error('Failed to delete image file:', e); }
                    }
                  }
                  
                  posts = posts.filter(p => p.id !== id);
                  fs.writeFileSync(blogJsonPath, JSON.stringify(posts, null, 2), 'utf8');
                }
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
              }
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localAdminPlugin()],
})
