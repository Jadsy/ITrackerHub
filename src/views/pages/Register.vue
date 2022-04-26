<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <h2 class="text-2xl font-weight-semibold">
              ITrackerHub
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Adventure starts here 🚀
          </p>
          <p class="mb-2">
            Make your project management easy and fun!
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form v-model="valid">
            <p v-if="anyErrors" class="red darken-1 white--text">
              {{ parsedRegisterError }}
            </p>
            <v-text-field
              v-model="username"
              label="Username"
              placeholder="JohnDoe"
              class="mb-3"
              :rules="userNameRules"
              required
            ></v-text-field>

            <!-- <v-text-field
              v-model="firstName"
              label="First Name"
              placeholder="JohnDoe"
              class="mb-3"
              :rules="firstNameRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="lastName"
              label="Last Name"
              placeholder="JohnDoe"
              class="mb-3"
              :rules="lastNameRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="Email"
              placeholder="john@example.com"
              class="mb-3"
              :rules="emailRules"
              required
            ></v-text-field> -->

            <v-text-field
              v-model="password"
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append="isPasswordVisible = !isPasswordVisible"
              class="mb-3"
              required
              :rules="passwordRules"
            ></v-text-field>

            <v-text-field
              v-model="repeatedPassword"
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Confirm Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append="isPasswordVisible = !isPasswordVisible"
              required
              :rules="confirmPasswordRules"
            ></v-text-field>

            <!-- <v-checkbox hide-details class="mt-1">
              <template #label>
                <div class="d-flex align-center flex-wrap">
                  <span class="me-2">I agree to</span><a href="javascript:void(0)">privacy policy &amp; terms</a>
                </div>
              </template>
            </v-checkbox> -->

            <v-btn block color="primary" class="mt-6" :disabled="!valid" @click="RegisterUser">
              Sign Up
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Already have an account?
          </span>
          <router-link :to="{ name: 'pages-login' }">
            Sign in instead
          </router-link>
        </v-card-text>

        <!-- divider -->
        <!-- <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text> -->

        <!-- social link -->
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
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { mapState, mapActions } from 'vuex'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const username = ref('')
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const repeatedPassword = ref('')
    const parsedRegisterError = ref('')
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
      valid: false,
      anyErrors: false,
      isPasswordVisible,
      username,
      firstName,
      lastName,
      email,
      password,
      repeatedPassword,
      socialLink,
      parsedRegisterError,

      userNameRules: [v => !!v || 'Username is required'],
      firstNameRules: [v => !!v || 'First Name is required'],
      lastNameRules: [v => !!v || 'Last Name is required'],

      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },

  data() {
    return {
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(v) ||
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character',
      ],

      confirmPasswordRules: [v => !!v || 'Password is required', v => v === this.password || 'Passwords do not match'],
    }
  },

  methods: {
    ...mapActions(['SignUp']),

    async RegisterUser() {
      const response = await this.SignUp({
        username: this.username,
        password: this.password,
      })
      this.AnyErrors(JSON.stringify(response))
    },

    AnyErrors(res) {
      if (res != 'no error') {
        this.anyErrors = true
        this.ErrorParser(res)
      }
    },
    ErrorParser(res){
      const errorParser = new RegExp('\\[.*\\]')
      this.parsedRegisterError = errorParser.exec(res)[0].replace(/[\[\]"]+/g, '')
    }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
