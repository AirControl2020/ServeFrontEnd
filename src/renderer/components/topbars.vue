<template>
  <v-app-bar app color="#c14566" dark>
    <!-- {{$store.getters.token}}
    {{$store.getters.UserType}}
    {{$store.getters.log}} -->
    <v-spacer></v-spacer>
    <v-btn color="#398277" @click="$router.push('/log')" v-if="!$store.getters.log">Login</v-btn>
    <v-btn color="#398277" @click="logout" v-if="$store.getters.log">Logout</v-btn>
  </v-app-bar>
</template>
 
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("set_token", "-1");
      this.$router.push("/home");
    }
  }
};
</script>