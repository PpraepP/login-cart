<template>
  <div class="login__wrapper">
    <v-container>
        <div class="login__wrapper--box">
          <h1>login page</h1>
          <v-form ref="form" @submit.prevent="login" v-model="valid">
            <v-text-field
              v-model="input.username"
              :counter="10"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="input.password"
              :rules="passwordRules"
              type="password"
              label="Password"
              required
            ></v-text-field>
            <span class="alert-text" v-if="massage">{{ massageText }}</span>
            <v-btn color="$primary" class="btn-login mr-4" @click="login">OK!</v-btn>
          </v-form>
        </div>
    </v-container>
  </div>
</template>

<script>
const errorEnum = {
  WRONG_INPUT: '400',
  INTERNAL_ERROR: '500',
};

export default {
  name: 'Login',
  data() {
    return {
      massage: false,
      massageText: '',
      valid: true,
      usernameRules: [(v) => !!v || 'Userame is required'],
      passwordRules: [(v) => !!v || 'Password is required'],
      input: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      if (this.input.username && this.input.password) {
        const currentUser = this.getUser(
          this.input.username,
          this.input.password,
        );
        if (currentUser) {
          const inputValue = { id: currentUser.id };
          this.$store.dispatch('AUTH_REQUEST', inputValue).then(() => {
            this.$router.push('/');
          });
        } else {
          this.sendError(errorEnum.WRONG_INPUT);
        }
      }
    },
    sendError(errorType) {
      this.massage = true;
      switch (errorType) {
        case errorEnum.WRONG_INPUT:
          this.massageText = 'Sign in failed';
          break;
        case errorEnum.INTERNAL_ERROR:
          this.massageText = 'Internal error please contact admin.';
          break;
        default:
          this.massageText = 'Error';
          break;
      }
    },
    getUser(username, password) {
      return this.$store.getters.account.find((item) => {
        if (username === item.username && password === item.password) {
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/main.scss";
.login{
    &__wrapper{
        position: relative;
        height: 100vh;
        @include flexbox();
        @include align-items(center);
        @include justify-content(center);
        &--box{
            background: #ffd5cd;
            padding: 60px;
            border-radius: 20px;
            .alert-text{
                font-size: 12px;
                position: relative;
                color: red;
                display: block;
            }
            @include media-breakpoint-down(sm){
                padding: 30px;
            }
        }

        &--bg{
            // background: url('../assets/education-bg.svg') no-repeat;
            background-size: cover;
            width: 100%;
            height: 100%;
            position: absolute;
            top: -10px;
            left: 0;
        }

        .theme--light.v-messages{
            color: red;
        }
        button[type="button"].btn-login.v-btn:not(.v-btn--disabled) {
            background: #de4463;
            color: white;
            font-weight: bold;
        }
    }
}
</style>
