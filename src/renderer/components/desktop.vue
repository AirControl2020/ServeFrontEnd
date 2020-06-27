<template>
  <v-container>
    <div class="d-flex justify-space-around">
      <div style="cursor:pointer" @click="$router.push('/home/JoinedList')">
        <v-icon size="200px">mdi-cube-send</v-icon>
        <v-card-text class="d-flex justify-center headline">Push</v-card-text>
      </div>
      <div style="cursor:pointer" @click="$router.push('/home/OwnedList')">
        <v-icon size="200px">mdi-call-received</v-icon>
        <v-card-text class="d-flex justify-center headline">Fetch</v-card-text>
      </div>
    </div>
  </v-container>
</template>
 
<script>
export default {};
</script>