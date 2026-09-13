// Configuração do Supabase para o Supermercado Villa
window.SUPABASE_CONFIG = {
  url: 'https://mfgbxvvaabvusgcjzjzi.supabase.co',
  anonKey: 'sb_publishable_eojymon2iS-D8a05VnhaZw_NZ_N4SMe'
};

// Dados padrão de contingência do Supermercado Villa
window.DEFAULT_VILLA_DATA = {
  jornal: {
    titulo: "Jornal de Ofertas da Semana",
    statusBadge: "OFERTAS VÁLIDAS DA SEMANA • LOJAS 1 E 2",
    imagem: "images/tabloide-oficial.jpg",
    paginas: [
      "images/tabloide-oficial.jpg"
    ],
    validade: "Consulte a validade no jornal impresso ou pelo WhatsApp",
    linkWhatsappTexto: "Olá, gostaria de receber o jornal de ofertas em PDF do Supermercado Villa"
  },
  loja1: {
    nome: "Loja 1 — Vila Reis (Matriz)",
    subtitulo: "UNIDADE MATRIZ • ENTREGAS EM DOMICÍLIO",
    endereco: "Rua Eugênio Lamonato, 386 – Bairro Vila Reis, Jardinópolis - SP",
    telefone: "(16) 3663-8018",
    whatsapp: "(16) 99140-2936",
    whatsappRaw: "5516991402936",
    horarioSemana: "",
    horarioDomingo: "",
    mapsUrl: "https://maps.google.com/?q=Rua+Eugenio+Lamonato+386+Jardinopolis+SP",
    wazeUrl: "https://waze.com/ul?q=Rua+Eugenio+Lamonato+386+Jardinopolis+SP"
  },
  loja2: {
    nome: "Loja 2 — Bairro Aroeira",
    subtitulo: "UNIDADE BAIRRO AROEIRA • ENTREGAS EM DOMICÍLIO",
    endereco: "Rua Alcides Pezeta, 461 – Bairro Aroeira, Jardinópolis - SP",
    telefone: "",
    whatsapp: "(16) 99317-4089",
    whatsappRaw: "5516993174089",
    horarioSemana: "",
    horarioDomingo: "",
    mapsUrl: "https://maps.google.com/?q=Rua+Alcides+Pezeta+461+Jardinopolis+SP",
    wazeUrl: "https://waze.com/ul?q=Rua+Alcides+Pezeta+461+Jardinopolis+SP"
  },
  contatoGeral: {
    instagramUrl: "https://www.instagram.com/supermercado_villa/",
    instagramUser: "@supermercado_villa",
    whatsappVip: "(16) 99140-2936",
    whatsappVipRaw: "5516991402936",
    appGooglePlay: "https://play.google.com/store/apps/details?id=mobilesim.id689.app&hl=pt_BR"
  }
};

// Obter dados do cache local sincronizado
function getInitialVillaData() {
  try {
    const cached = localStorage.getItem('villa_custom_site_data');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.jornal && !parsed.jornal.paginas) {
        parsed.jornal.paginas = [parsed.jornal.imagem || 'images/tabloide-oficial.jpg'];
      }
      return Object.assign({}, window.DEFAULT_VILLA_DATA, parsed);
    }
  } catch (e) {
    console.warn('Erro ao ler cache local:', e);
  }
  return window.DEFAULT_VILLA_DATA;
}

window.VILLA_SITE_DATA = getInitialVillaData();

// Carregar dados atualizados do Supabase em background e atualizar a página
window.fetchVillaDataFromSupabase = async function() {
  try {
    const res = await fetch(window.SUPABASE_CONFIG.url + '/rest/v1/site_config?id=eq.villa_main&select=*', {
      headers: {
        'apikey': window.SUPABASE_CONFIG.anonKey,
        'Authorization': 'Bearer ' + window.SUPABASE_CONFIG.anonKey
      }
    });
    if (res.ok) {
      const rows = await res.json();
      if (rows && rows.length > 0 && rows[0].data) {
        const remoteData = rows[0].data;
        if (remoteData.jornal) {
          if (!remoteData.jornal.paginas || !Array.isArray(remoteData.jornal.paginas) || remoteData.jornal.paginas.length === 0) {
            remoteData.jornal.paginas = [remoteData.jornal.imagem || 'images/tabloide-oficial.jpg'];
          }
          if (!remoteData.jornal.imagem && remoteData.jornal.paginas.length > 0) {
            remoteData.jornal.imagem = remoteData.jornal.paginas[0];
          }
        }
        window.VILLA_SITE_DATA = Object.assign({}, window.DEFAULT_VILLA_DATA, remoteData);
        localStorage.setItem('villa_custom_site_data', JSON.stringify(window.VILLA_SITE_DATA));
        if (typeof window.applyVillaSiteData === 'function') {
          window.applyVillaSiteData(window.VILLA_SITE_DATA);
        }
        return window.VILLA_SITE_DATA;
      }
    }
  } catch (err) {
    console.warn('Supabase offline ou indisponível, usando cache local:', err);
  }
  return window.VILLA_SITE_DATA;
};

// Dispara busca no Supabase logo que o script carrega
window.fetchVillaDataFromSupabase();
