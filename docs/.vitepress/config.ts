import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ko-KR',
  title: 'Python & C 디지털 교재',
  description: 'Python과 C를 처음 배우는 학생을 위한 실습형 디지털 교재',
  base: '/coding-textbook/',
  cleanUrls: false,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: []
  }
})
