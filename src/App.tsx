import { useState, useEffect } from 'react';

const FAL_KEY = "2a6e6513-1596-4240-b9a7-b9c407e68a87:1479d40ecb99da9d8e75d4bb6e8c0c";

function App() {
  const [prompt, setPrompt] = useState('');
  const [memeUrl, setMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializa o Telegram Mini App
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#000000');
    }
  }, []);

  const generateMeme = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setMemeUrl('');

    try {
      const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key ${FAL_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          image_size: "landscape_4_3",
          num_inference_steps: 4,
          guidance_scale: 3.5,
          num_images: 1,
          enable_safety_checker: false,
        }),
      });

      const data = await response.json();
      if (data.images && data.images[0]) {
        setMemeUrl(data.images[0].url);
      }
    } catch (error) {
      console.error("Erro ao gerar meme:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>ViralForge</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Digite o prompt do meme..."
        style={{ width: '80%', padding: 10, fontSize: 16 }}
      />
      <br /><br />
      <button onClick={generateMeme} disabled={loading} style={{ padding: '12px 24px', fontSize: 18 }}>
        {loading ? 'Gerando...' : 'Gerar Meme'}
      </button>

      {memeUrl && (
        <div style={{ marginTop: 30 }}>
          <img src={memeUrl} alt="Meme gerado" style={{ maxWidth: '100%', borderRadius: 12 }} />
        </div>
      )}
    </div>
  );
}

export default App;