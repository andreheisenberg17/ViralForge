import { useState } from 'react';
import './App.css';

const FAL_KEY = "2a6e6513-1596-4240-b9a7-b9c407e68a87:1479d40ecb99da9d8e75d4bb6e8c0c3c";

function App() {
  const [prompt, setPrompt] = useState('');
  const [memeUrl, setMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMeme = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setMemeUrl('');

    try {
      const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
        method: "POST",
        headers: {
          "Authorization": `Key ${FAL_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt + ", funny internet meme, viral style, high quality, bold text, bright colors",
          image_size: "landscape",
          num_inference_steps: 4,
          guidance_scale: 3.5,
        }),
      });

      const data = await response.json();
      setMemeUrl(data.images[0].url);

    } catch (error) {
      console.error(error);
      alert("Erro na IA. Usando imagem de teste.");
      const randomId = Math.floor(Math.random() * 900) + 100;
      setMemeUrl(`https://picsum.photos/id/${randomId}/600/600`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '20px 10px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#facc15' }}>ViralForge</h1>
          <div style={{ fontSize: '15px', color: '#9ca3af' }}>AI Meme Arena</div>
        </div>

        <div style={{
          backgroundColor: '#111113',
          borderRadius: '20px',
          padding: '24px',
          border: '2px solid #27272a',
          marginBottom: '24px'
        }}>
          <textarea
            style={{
              width: '100%',
              height: '140px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '16px',
              resize: 'none',
              outline: 'none',
              lineHeight: '1.6'
            }}
            placeholder="Descreva o meme que você quer criar... (ex: Elon Musk dancing with a cat in cyberpunk Tokyo)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <button
          onClick={generateMeme}
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#facc15',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '19px',
            padding: '20px',
            borderRadius: '16px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? '✨ Gerando com IA...' : '✨ Gerar Meme'}
        </button>

        {memeUrl && (
          <div style={{ marginTop: '50px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px', textAlign: 'center' }}>Seu Meme Gerado</h2>
            <img 
              src={memeUrl} 
              alt="Meme gerado" 
              style={{ width: '100%', borderRadius: '24px', border: '3px solid #3f3f46' }}
            />
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '70px', fontSize: '13px', color: '#64748b' }}>
          ViralForge • Mini App Telegram • TON Blockchain
        </div>
      </div>
    </div>
  );
}

export default App;