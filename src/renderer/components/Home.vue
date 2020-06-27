<template>
  <v-img :src="bg" height="100%" class="d-flex align-center">
    <div class="d-flex justify-center mb-6">
      <v-container>
        <p class="display-3 d-flex justify-center">Air Condition Control Panel</p>
        <v-divider />
        <v-layout row wrap>
          <v-flex v-for="( each , index ) in cards" :key="index" xs12 sm4>
            <v-row class="justify-center mt-4">
              <v-icon x-large class="blue--text text--lighten-2 mr-4">{{ each.icon }}</v-icon>
              <div class="headline">{{ each.title }}</div>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-img>
</template>


<script>
import home_bg from "@/assets/home.svg";
import Desktop from "@/components/desktop";
export default {
  components: { Desktop },
  data: () => ({
    cards: [
      {
        icon: "mdi-rocket",
        title: "Fast"
      },
      {
        icon: "mdi-flash",
        title: "Flexible"
      },
      {
        icon: "mdi-wrench",
        title: "Expandable"
      }
    ]
  }),
  computed: {
    bg() {
      return home_bg;
    }
  }
};
</script>