<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list v-if="!$store.state.user">
        <v-list-tile to="/login">
          <v-list-tile-action>
            <v-icon>{{ login.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="login.title" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/signUp">
          <v-list-tile-action>
            <v-icon>{{ signUp.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="signUp.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-if="$store.state.user">
        <v-list-tile to="/favorite">
          <v-list-tile-action>
            <v-icon>{{ favorite.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="favorite.title" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
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
      formError: null,
      login: {
        icon: 'apps',
        title: 'Login'
      },
      signUp: {
        icon: 'apps',
        title: 'Sign Up'
      },
      favorite: {
        icon: 'apps',
        title: 'Favorite List'
      },
      inspire: {
        icon: 'apps',
        title: 'Logout'
      },
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Find My Favorite'
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
