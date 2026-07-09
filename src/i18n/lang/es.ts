import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Inicio",
    posts: "Publicaciones",
    tags: "Etiquetas",
    about: "Acerca de",
    archives: "Archivos",
    search: "Buscar",
  },
  post: {
    publishedAt: "Publicado el",
    updatedAt: "Actualizado",
    sharePostIntro: "Compartir esta publicación:",
    sharePostOn: "Compartir esta publicación en {{platform}}",
    sharePostViaEmail: "Compartir esta publicación por correo electrónico",
    tagLabel: "Etiquetas",
    backToTop: "Volver arriba",
    goBack: "Volver",
    editPage: "Editar página",
    previousPost: "Publicación anterior",
    nextPost: "Siguiente publicación",
  },
  pagination: {
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
  },
  home: {
    socialLinks: "Redes sociales",
    featured: "Destacado",
    recentPosts: "Publicaciones recientes",
    allPosts: "Todas las publicaciones",
  },
  footer: {
    copyright: "Derechos de autor",
    allRightsReserved: "Todos los derechos reservados.",
  },
  pages: {
    tagTitle: "Etiqueta",
    tagDesc: "Todos los artículos con la etiqueta",

    tagsTitle: "Etiquetas",
    tagsDesc: "Todas las etiquetas utilizadas en las publicaciones.",

    postsTitle: "Publicaciones",
    postsDesc: "Todos los artículos que he publicado.",

    archivesTitle: "Archivos",
    archivesDesc: "Todos los artículos que he archivado.",

    searchTitle: "Buscar",
    searchDesc: "Buscar cualquier artículo ...",
  },
  a11y: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    toggleTheme: "Cambiar tema",
    searchPlaceholder: "Buscar publicaciones...",
    noResults: "No se encontraron resultados",
    goToPreviousPage: "Ir a la página anterior",
    goToNextPage: "Ir a la siguiente página",
  },
  notFound: {
    title: "404 No encontrado",
    message: "Página no encontrada",
    goHome: "Volver al inicio",
  },
} satisfies UIStrings;
