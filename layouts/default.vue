<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile to="/login">
          <v-list-tile-action>
            <v-icon>{{ login.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="login.title" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="$store.state.user" to="/inspire">
          <v-list-tile-action>
            <v-icon>{{ inspire.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="inspire.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      login: {
        icon: 'apps',
        title: 'login',
        to: '/'
      },
      inspire: {
        icon: 'bubble_chart',
        title: 'Inspire'
      },
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Find My Favorite'
    }
  }
}
</script>
