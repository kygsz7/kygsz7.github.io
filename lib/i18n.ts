export const LANGS = ["tr", "en", "ru"] as const;
export type Lang = (typeof LANGS)[number];

/** Varsayilan dil kok URL'de durur: / = tr, /en, /ru.
 *  Canli sitedeki adres yapisi bu — degistirilirse mevcut linkler kirilir. */
export const DEFAULT_LANG: Lang = "tr";

export function langHref(l: Lang): string {
  return l === DEFAULT_LANG ? "/" : `/${l}`;
}

export function privacyHref(l: Lang): string {
  // /privacy.html Play Console'a kayitli — bu adres korunmali.
  return l === DEFAULT_LANG ? "/privacy" : `/${l}/privacy`;
}

export const PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.antalyaceb.antalya_cebinde";
// TODO: App Store linki verilmedi. Doldurulunca iOS butonu otomatik gorunur.
export const APPSTORE_URL = "";
export const CONTACT_EMAIL = "kygsz29@gmail.com";

export const LANG_NAMES: Record<Lang, string> = {
  tr: "Türkçe",
  en: "English",
  ru: "Русский",
};

type Feature = { title: string; body: string };

export type Dict = {
  htmlTitle: string;
  metaDescription: string;
  nav: { features: string; privacy: string };
  hero: {
    badge: string;
    title: string;
    lede: string;
    play: string;
    ios: string;
    note: string;
  };
  featuresTitle: string;
  featuresLede: string;
  features: Feature[];
  cta: { title: string; body: string };
  footer: { contact: string; privacy: string; rights: string };
  privacy: {
    title: string;
    updated: string;
    intro: string;
    sections: { heading: string; items?: string[]; body?: string }[];
    back: string;
  };
};

export const dict: Record<Lang, Dict> = {
  tr: {
    htmlTitle: "Antalya Cebinde — Antalya Gezi Rehberi",
    metaDescription:
      "Antalya'nın plajları, antik kentleri, koyları ve mekanları tek uygulamada. Gezi planlayıcı, sesli rehber, ulaşım ve etkinlikler. Ücretsiz.",
    nav: { features: "Özellikler", privacy: "Gizlilik" },
    hero: {
      badge: "Ücretsiz · Türkçe, English, Русский",
      title: "Antalya'yı cebinde taşı",
      lede:
        "Plajlar, antik kentler, gizli koylar ve restoranlar. 128 mekan, 147 etkinlik — hepsi tek uygulamada, cebinde.",
      play: "Google Play'den indir",
      ios: "App Store'dan indir",
      note: "Abonelik yok, kilitli özellik yok.",
    },
    featuresTitle: "Tatilde ihtiyacın olan her şey",
    featuresLede:
      "Kaş'tan Alanya'ya, Demre'den Olympos'a — Antalya'nın tamamı elinde.",
    features: [
      {
        title: "Tek haritada tüm Antalya",
        body: "Plajlar, antik kentler, koylar ve restoranlar tek ekranda. Kategoriye göre filtrele, yakınındakileri gör.",
      },
      {
        title: "Gezi planlayıcı",
        body: "Beğendiğin mekanları listene ekle, uygulama en mantıklı rotayı çıkarsın. Tek tuşla yol tarifi.",
      },
      {
        title: "Sesli rehber",
        body: "Antik kentlerin tarihini kalıntıların arasında yürürken dinle. Rehber tutmana gerek yok.",
      },
      {
        title: "Ne yenir, nerede yenir",
        body: "Turist tuzağına düşme. Antalya'nın yerel lezzetleri ve bunları gerçekten iyi yapan mekanlar.",
      },
      {
        title: "Etkinlik takvimi",
        body: "Konserler, festivaller ve sergiler güncel olarak listeleniyor. Tarih, konum ve yol tarifi bir arada.",
      },
      {
        title: "Ulaşım",
        body: "Tramvay, otobüs, dolmuş ve şehirlerarası hatlar. Hangi hat nereye gidiyor, kaçta kalkıyor?",
      },
      {
        title: "Buraya giderken",
        body: "Her mekanda giriş ücreti, en iyi ziyaret saati, ne götürmen gerektiği ve en iyi fotoğraf zamanı yazıyor.",
      },
      {
        title: "Acil durumda hazır",
        body: "Bulunduğun yere en yakın hastane, ATM ve market bilgisi her mekan sayfasında.",
      },
    ],
    cta: {
      title: "Antalya'ya gitmeden önce indir",
      body: "Ücretsiz. Türkçe, İngilizce ve Rusça.",
    },
    footer: {
      contact: "İletişim",
      privacy: "Gizlilik Politikası",
      rights: "Tüm hakları saklıdır.",
    },
    privacy: {
      title: "Gizlilik Politikası",
      updated: "Son güncelleme: Nisan 2026",
      intro:
        "Bu gizlilik politikası, Antalya Cebinde uygulamasının kullanıcı verilerini nasıl topladığını, kullandığını ve koruduğunu açıklamaktadır.",
      sections: [
        {
          heading: "Toplanan Veriler",
          items: [
            "Hesap bilgileri: Google ile giriş yapıldığında ad, e-posta adresi ve profil fotoğrafı alınır.",
            "Kullanıcı içeriği: Yorumlar, puanlamalar, gezim planı ve kaydedilen mekanlar.",
            "Cihaz bilgileri: Reklam gösterimi için anonim cihaz tanımlayıcısı (Google AdMob).",
          ],
        },
        {
          heading: "Verilerin Kullanımı",
          items: [
            "Uygulama özelliklerini sunmak (gezim planı, yorumlar, favoriler)",
            "Kişiselleştirilmiş olmayan reklamlar göstermek (Google AdMob)",
            "Uygulama deneyimini iyileştirmek",
          ],
        },
        {
          heading: "Üçüncü Taraf Hizmetler",
          items: [
            "Supabase: Veritabanı ve kimlik doğrulama.",
            "Google AdMob: Reklam gösterimi.",
            "Open-Meteo: Hava durumu verisi. Kişisel veri toplanmaz.",
            "Google Maps: Konum ve yol tarifi.",
          ],
        },
        {
          heading: "Veri Güvenliği",
          body: "Tüm veriler şifreli bağlantı (HTTPS) üzerinden iletilir. Supabase Row Level Security (RLS) ile kullanıcı verileri yalnızca ilgili kullanıcı tarafından erişilebilir.",
        },
        {
          heading: "Çocukların Gizliliği",
          body: "Uygulama 13 yaş altındaki çocuklara yönelik değildir ve bu yaş grubundan bilerek veri toplanmaz.",
        },
        {
          heading: "Kullanıcı Hakları",
          body: "Hesabınızdaki verileri silmek veya ihraç etmek için aşağıdaki adrese e-posta gönderin.",
        },
      ],
      back: "Ana sayfaya dön",
    },
  },

  en: {
    htmlTitle: "Antalya in Your Pocket — Antalya Travel Guide",
    metaDescription:
      "Antalya's beaches, ancient cities, coves and restaurants in one app. Trip planner, audio guide, transport and events. Free.",
    nav: { features: "Features", privacy: "Privacy" },
    hero: {
      badge: "Free · Türkçe, English, Русский",
      title: "Carry Antalya in your pocket",
      lede:
        "Beaches, ancient cities, hidden coves and restaurants. 128 places and 147 events — all in one app, in your pocket.",
      play: "Get it on Google Play",
      ios: "Download on the App Store",
      note: "No subscription, no locked features.",
    },
    featuresTitle: "Everything you need on holiday",
    featuresLede:
      "From Kaş to Alanya, Demre to Olympos — all of Antalya in your hand.",
    features: [
      {
        title: "All of Antalya on one map",
        body: "Beaches, ancient cities, coves and restaurants on a single screen. Filter by category, see what's near you.",
      },
      {
        title: "Trip planner",
        body: "Add the places you like and let the app build the smartest route. Directions in one tap.",
      },
      {
        title: "Audio guide",
        body: "Listen to the history of each ancient city as you walk through the ruins. No guide needed.",
      },
      {
        title: "What to eat, and where",
        body: "Skip the tourist traps. Antalya's local dishes and the places that actually do them well.",
      },
      {
        title: "Event calendar",
        body: "Concerts, festivals and exhibitions, kept up to date. Dates, venues and directions together.",
      },
      {
        title: "Getting around",
        body: "Tram, bus, minibus and intercity lines. Which line goes where, and when does it run?",
      },
      {
        title: "Before you go",
        body: "Every place lists entry fees, the best time to visit, what to bring and when the light is best for photos.",
      },
      {
        title: "Ready in an emergency",
        body: "The nearest hospital, ATM and shop to where you are, on every place page.",
      },
    ],
    cta: {
      title: "Download before you land in Antalya",
      body: "Free. Turkish, English and Russian.",
    },
    footer: {
      contact: "Contact",
      privacy: "Privacy Policy",
      rights: "All rights reserved.",
    },
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: April 2026",
      intro:
        "This privacy policy explains how the Antalya in Your Pocket app collects, uses and protects user data.",
      sections: [
        {
          heading: "Data We Collect",
          items: [
            "Account information: when you sign in with Google we receive your name, email address and profile photo.",
            "User content: reviews, ratings, your trip plan and saved places.",
            "Device information: an anonymous device identifier for advertising (Google AdMob).",
          ],
        },
        {
          heading: "How We Use Data",
          items: [
            "To provide app features (trip plan, reviews, favourites)",
            "To show non-personalised advertising (Google AdMob)",
            "To improve the app experience",
          ],
        },
        {
          heading: "Third-Party Services",
          items: [
            "Supabase: database and authentication.",
            "Google AdMob: advertising.",
            "Open-Meteo: weather data. No personal data is collected.",
            "Google Maps: location and directions.",
          ],
        },
        {
          heading: "Data Security",
          body: "All data is transmitted over an encrypted connection (HTTPS). With Supabase Row Level Security (RLS), user data is accessible only to the user it belongs to.",
        },
        {
          heading: "Children's Privacy",
          body: "The app is not directed at children under 13, and data is not knowingly collected from this age group.",
        },
        {
          heading: "Your Rights",
          body: "To delete or export the data in your account, email the address below.",
        },
      ],
      back: "Back to home",
    },
  },

  ru: {
    htmlTitle: "Анталья в кармане — путеводитель по Анталье",
    metaDescription:
      "Пляжи, античные города, бухты и рестораны Антальи в одном приложении. Планировщик поездок, аудиогид, транспорт и события. Бесплатно.",
    nav: { features: "Возможности", privacy: "Конфиденциальность" },
    hero: {
      badge: "Бесплатно · Türkçe, English, Русский",
      title: "Анталья у вас в кармане",
      lede:
        "Пляжи, античные города, укромные бухты и рестораны. 128 мест и 147 событий — всё в одном приложении, у вас в кармане.",
      play: "Загрузить в Google Play",
      ios: "Загрузить в App Store",
      note: "Без подписки и заблокированных функций.",
    },
    featuresTitle: "Всё, что нужно в отпуске",
    featuresLede:
      "От Каша до Аланьи, от Демре до Олимпоса — вся Анталья у вас в руках.",
    features: [
      {
        title: "Вся Анталья на одной карте",
        body: "Пляжи, античные города, бухты и рестораны на одном экране. Фильтруйте по категориям и смотрите, что рядом.",
      },
      {
        title: "Планировщик поездки",
        body: "Добавляйте понравившиеся места — приложение построит удобный маршрут. Навигация в одно нажатие.",
      },
      {
        title: "Аудиогид",
        body: "Слушайте историю античных городов, гуляя среди руин. Гид не нужен.",
      },
      {
        title: "Что поесть и где",
        body: "Не попадайтесь в туристические ловушки. Местная кухня Антальи и места, где её готовят правильно.",
      },
      {
        title: "Афиша событий",
        body: "Концерты, фестивали и выставки — всегда актуально. Даты, площадки и маршрут в одном месте.",
      },
      {
        title: "Транспорт",
        body: "Трамвай, автобус, долмуш и междугородние линии. Какая линия куда идёт и во сколько?",
      },
      {
        title: "Перед поездкой",
        body: "Для каждого места указаны стоимость входа, лучшее время визита, что взять с собой и когда лучший свет для фото.",
      },
      {
        title: "Готовность к экстренным ситуациям",
        body: "Ближайшая больница, банкомат и магазин — на странице каждого места.",
      },
    ],
    cta: {
      title: "Скачайте перед поездкой в Анталью",
      body: "Бесплатно. На турецком, английском и русском.",
    },
    footer: {
      contact: "Контакты",
      privacy: "Политика конфиденциальности",
      rights: "Все права защищены.",
    },
    privacy: {
      title: "Политика конфиденциальности",
      updated: "Последнее обновление: апрель 2026",
      intro:
        "Эта политика конфиденциальности объясняет, как приложение «Анталья в кармане» собирает, использует и защищает данные пользователей.",
      sections: [
        {
          heading: "Собираемые данные",
          items: [
            "Данные аккаунта: при входе через Google мы получаем имя, адрес электронной почты и фото профиля.",
            "Пользовательский контент: отзывы, оценки, план поездки и сохранённые места.",
            "Данные устройства: анонимный идентификатор устройства для показа рекламы (Google AdMob).",
          ],
        },
        {
          heading: "Использование данных",
          items: [
            "Предоставление функций приложения (план поездки, отзывы, избранное)",
            "Показ неперсонализированной рекламы (Google AdMob)",
            "Улучшение работы приложения",
          ],
        },
        {
          heading: "Сторонние сервисы",
          items: [
            "Supabase: база данных и аутентификация.",
            "Google AdMob: показ рекламы.",
            "Open-Meteo: данные о погоде. Персональные данные не собираются.",
            "Google Maps: определение местоположения и маршруты.",
          ],
        },
        {
          heading: "Безопасность данных",
          body: "Все данные передаются по защищённому соединению (HTTPS). Благодаря Supabase Row Level Security (RLS) данные пользователя доступны только ему самому.",
        },
        {
          heading: "Конфиденциальность детей",
          body: "Приложение не предназначено для детей младше 13 лет, и данные от этой возрастной группы намеренно не собираются.",
        },
        {
          heading: "Права пользователя",
          body: "Чтобы удалить или экспортировать данные вашего аккаунта, напишите на адрес ниже.",
        },
      ],
      back: "На главную",
    },
  },
};
