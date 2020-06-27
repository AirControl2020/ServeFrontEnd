<template>
  <v-app>
    <topbars />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import topbars from "@/components/topbars";
export default {
  components: {
    topbars,
  },
  name: "ClientFrontEnd"
};
</script>
