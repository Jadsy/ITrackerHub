<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <h2 class="text-2xl font-weight-semibold">ITH</h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">Welcome to ITrackerHub! 👋🏻</p>
          <p class="mb-2">Please sign-in to your account and start the adventure</p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form v-model="valid">
            <v-alert dense outlined type="error" icon="mdi-alert-octagon-outline" shaped v-if="anyErrors">
              {{ parsedLoginError }}
            </v-alert>
            
            <v-text-field
              v-model="username"
              label="Username"
              placeholder="JohnDoe"
              class="mb-3"
              required
              :rules="userNameRules"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              required
              :rules="passwordRules"
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox label="Remember Me" hide-details class="me-3 mt-1" v-model="rememberMe"> </v-checkbox>

              <!-- forgot link -->
              <a href="javascript:void(0)" class="mt-1"> Forgot Password? </a>
            </div>

            <v-btn :loading="loading" :disabled="!valid" block color="primary" class="mt-6" @click="LogIn">
              Login
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2"> New on our platform? </span>
          <router-link :to="{ name: 'pages-register' }"> Create an account </router-link>
        </v-card-text>

        <!-- divider -->
        <!-- <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text> -->

        <!-- social links -->
        <!-- <v-card-actions class="d-flex justify-center">
          <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1">
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img class="auth-mask-bg" height="173" />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289"></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { mapActions } from 'vuex'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const username = ref('')
    const password = ref('')
    const parsedLoginError = ref('')
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    return {
      isPasswordVisible,
      username,
      password,
      socialLink,
      valid: false,
      parsedLoginError,
      anyErrors: false,
      rememberMe: false,
      loading: false,

      userNameRules: [v => !!v || 'Username is required'],
      passwordRules: [v => !!v || 'Password is required'],

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },

  methods: {
    ...mapActions(['SignIn', 'getProjectList', 'getIssueStatus', 'getIssueSeverity']),

    async LogIn() {
      this.loading = true
      const response = await this.SignIn({
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe,
      })
      if (response != 'No Error') {
        this.AnyErrors(JSON.stringify(response))
      } else {
        this.AnyErrors(response)
      }
    },

    AnyErrors(res) {
      if (res != 'No Error') {
        this.anyErrors = true
        this.ErrorParser(res)
      } else {
        this.loading = false
      }
    },
    ErrorParser(res) {
      const errorParser = new RegExp('\\[.*\\]')
      this.parsedLoginError = errorParser.exec(res)[0].replace(/[\[\]"]+/g, '')
      this.loading = false
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
