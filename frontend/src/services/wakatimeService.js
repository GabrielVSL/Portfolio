// Os 4 links do seu Dashboard WakaTime
const WAKATIME_LANGUAGES_URL = 'https://wakatime.com/share/@GabrielVSL/80efd3c9-603e-43e4-b999-8fc53c8a5972.json';
const WAKATIME_OS_URL = 'https://wakatime.com/share/@GabrielVSL/63165cf7-d5ba-42de-a80c-8db5356a78ec.json';
const WAKATIME_CATEGORIES_URL = 'https://wakatime.com/share/@GabrielVSL/c2ca4b15-1975-46fa-a752-41adfb3a5091.json';
const WAKATIME_CODING_ACTIVITY_URL = 'https://wakatime.com/share/@GabrielVSL/4abf8e67-37f7-498d-8ac0-def58335361c.json';

export const getWakatimeData = async () => {
  try {
    const [langRes, osRes, catRes, activityRes] = await Promise.all([
      fetch(WAKATIME_LANGUAGES_URL),
      fetch(WAKATIME_OS_URL),
      fetch(WAKATIME_CATEGORIES_URL),
      fetch(WAKATIME_CODING_ACTIVITY_URL)
    ]);
    
    if (!langRes.ok || !osRes.ok || !catRes.ok || !activityRes.ok) {
      throw new Error('Falha ao obter dados completos do WakaTime');
    }

    const langJson = await langRes.json();
    const osJson = await osRes.json();
    const catJson = await catRes.json();
    const activityJson = await activityRes.json();
    
    return {
      languages: langJson.data,
      os: osJson.data,
      categories: catJson.data,
      activity: activityJson.data
    };

  } catch (error) {
    console.error("Erro no Radar WakaTime:", error);
    return null; 
  }
};