import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://manthanank.github.io/",
    title: "Blogs",
    description: "Blog Site",
    author: "Manthan Ankolekar",
    profile: "https://manthanank.github.io/",
    ogImage: "astropaper-og.jpg",
    lang: "en",
    timezone: "Asia/Kolkata",
    dir: "ltr",
  },
  posts: {
    perPage: 3,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/manthanank" },
    { name: "x",        url: "https://x.com/manthan_ank" },
    { name: "linkedin", url: "https://www.linkedin.com/in/manthanank" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});