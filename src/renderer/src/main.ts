import { createApp } from 'vue'
import './assets/css/main.scss'
import App from './App.vue'
import { directives } from './directives'

const app = createApp(App)
directives.forEach((directive) => {
  app.directive(directive.name, directive.directive)
})

app.mount('#app')
