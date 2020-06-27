<template>
  <v-container>
    <div v-if="type==1">
      <v-btn color="primary" @click="getall">刷新房间状态</v-btn>
      <template>
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
      </template>
      <v-card-text>设置空调状态</v-card-text>
      <v-row>
        <v-text-field
          v-model="roomid"
          class="mx-4"
          label="房间号"
          max="301"
          min="305"
          step="1"
          style="width: 125px"
          type="number"
        ></v-text-field>
        <v-text-field
          v-model="temp"
          class="mx-4"
          label="设置温度"
          max="301"
          min="305"
          step="1"
          style="width: 125px"
          type="number"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-select class="mx-4" v-model="kind" :items="items1" label="运行模式" style="width: 125px"></v-select>
        <v-select class="mx-4" v-model="speed" :items="items2" label="风速" style="width: 125px"></v-select>
      </v-row>
      <v-btn color="primary" @click="gao">设置</v-btn>
    </div>
    <div v-else-if="type==2">
      <v-text-field
        v-model="roomid"
        class="mx-4"
        label="房间号"
        max="301"
        min="305"
        step="1"
        style="width: 125px"
        type="number"
      ></v-text-field>
      <v-btn color="primary" @click="getPay">获取账单</v-btn>
    </div>
    <div v-else-if="type==3">
      <v-btn color="primary" @click="getAnalyze">获取报表</v-btn>
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    items1: ["制冷", "制热"],
    items2: ["高", "中", "低"],
    roomid: 301,
    kind: "制冷",
    temp: 25,
    speed: "中",
    headers: [
      { text: "房间号", value: "roomid" },
      { text: "缺省温度", value: "initemp" },
      { text: "运行状态", value: "mode" },
      { text: "总费用", value: "price" },
      { text: "费率", value: "ratio" },
      { text: "当前温度", value: "curtemp" },
      { text: "目标温度", value: "aimtemp" },
      { text: "风速", value: "wind" },
      { text: "状态", value: "state" }
    ],
    desserts: []
  }),
  methods: {
    getall() {
      this.$http
        .get("getAll")
        .then(res => {
          this.desserts = res.data.msg;
        })
        .catch(res => {
          alert("Login Failed:" + String(res.data));
        });
    },
    gao() {
      let js = {};
      js["roomid"] = this.roomid;
      js["temp"] = this.temp;
      if (this.roomid == "制冷") {
        js["kind"] = 0;
      } else {
        js["kind"] = 1;
      }
      if (this.speed == "高") {
        js["speed"] = 0;
      } else if (this.speed == "中") {
        js["speed"] = 1;
      } else {
        js["speed"] = 2;
      }
      alert(JSON.stringify(js));
    },
    getPay() {},
    getAnalyze() {}
  },
  computed: {
    type() {
      return this.$store.getters.UserType;
    }
  }
};
</script>
 