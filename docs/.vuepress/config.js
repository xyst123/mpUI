module.exports = {
  title: 'MP-UI',
  themeConfig: {
    nav: [
      { text: '开发指南', link: '/' },
      { text: '组件', link: '/component/button' },
    ],
    sidebar: [
      {
        title: '开发指南',
        collapsable: true,
        children: [
          '/'
        ]
      },
      {
        title: '组件',
        collapsable: true,
        children: [
          '/component/button',
          '/component/image-upload'
        ]
      }
    ],
    sidebarDepth: 0
  }
}