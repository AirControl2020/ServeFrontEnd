<template>
  <v-container>
    <div v-if="type==1">
      <v-card-text>管理员</v-card-text>
      <v-divider />
      <v-btn color="primary" @click="getall">刷新房间状态</v-btn>
      <template>
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1">
          <template v-slot:item.open="{ item }">
            <v-btn @click="gj(item.roomid )" icon>
              <v-icon>mdi-history</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.close="{ item }">
            <v-btn @click="kj(item.roomid) " icon>
              <v-icon>mdi-history</v-icon>
            </v-btn>
          </template>
        </v-data-table>
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
        <v-select class="mx-4" v-model="speed" :items="items2" label="风速" style="width: 125px"></v-select>
        <v-select class="mx-4" v-model="model" :items="items3" label="模式" style="width: 125px"></v-select>
      </v-row>
      <v-btn color="primary" @click="gao">设置</v-btn>
    </div>
    <div v-if="type==1">
      <v-card-text>前台</v-card-text>
      <v-divider />
      <v-row>
        <v-col>
          <v-date-picker v-model="picker"></v-date-picker>
        </v-col>
        <v-col>
          <v-time-picker class="mx-4" use-seconds v-model="picker2"></v-time-picker>
        </v-col>
        <v-col>
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
          <div>
            {{picker}}
            {{picker2}}
          </div>
          <v-btn color="primary" @click="getPay" :disabled="picker==null ||picker2==null">获取账单</v-btn>
        </v-col>
      </v-row>
      <template>
        <v-data-table
          :headers="headers3"
          :items="desserts3"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </template>
    </div>
    <div v-if="type==1">
      <v-card-text>经理</v-card-text>
      <v-divider />
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
        <v-select
          class="mx-4"
          v-model="analyzeType"
          :items="items3"
          label="报表模式"
          style="width: 125px"
        ></v-select>
      </v-row>
      <v-btn color="primary" @click="getAnalyze">获取报表</v-btn>
      <template>
        <v-data-table
          :headers="headers2"
          :items="desserts2"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </template>
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    analyzeType: "日",
    items3: ["年", "月", "日"],
    t: "null",
    picker: null,
    picker2: null,
    model: "制冷",
    items2: ["高", "中", "低"],
    items3: ["制冷", "制热"],
    roomid: 301,
    kind: "关机",
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
      { text: "状态", value: "state" },
      { text: "开机", value: "open" },
      { text: "关机", value: "close" }
    ],
    desserts: [],
    headers2: [
      { text: "房间号", value: "roomid" },
      { text: "开关次数", value: "opentimes" },
      { text: "使用时长", value: "minutesDiff" },
      { text: "总费用", value: "price" },
      { text: "调度次数", value: "dispatchnum" },
      { text: "详单数", value: "detailnum" },
      { text: "调温次数", value: "changetem" },
      { text: "调风次数", value: "changewind" }
    ],
    desserts2: [],
    headers3: [
      { text: "房间号", value: "roomid" },
      { text: "开始时间", value: "starttime" },
      { text: "结束时间", value: "endtime" },
      { text: "风速", value: "windspeed" },
      { text: "费用", value: "price" },
      { text: "状态", value: "mode" },
      { text: "费率", value: "ratio" },
      { text: "目标温度", value: "aimtemproture" },
      { text: "是否处于调度中", value: "isdispatch" }
    ],
    desserts3: []
  }),
  methods: {
    getall() {
      this.$http
        .get("getAll")
        .then(res => {
          this.desserts = res.data.msg;
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    gao() {
      let js = {};
      js["room_id"] = this.roomid;
      js["temp"] = this.temp;
      js["kind"] = 1;
      if (this.speed == "高") {
        js["speed"] = 3;
      } else {
        js["speed"] = 1;
      }
      if (this.model == "制冷") {
        js["mode"] = -1;
      } else {
        js["mode"] = 1;
      }
      // alert(JSON.stringify(js));
      this.$http
        .post("switchMode", JSON.stringify(js))
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    kj(idx) {
      let js = {};
      js["room_id"] = idx;
      js["temp"] = -1;
      js["kind"] = 2;
      js["speed"] = -1;
      js["mode"] = -1;
      // alert(JSON.stringify(js));
      this.$http
        .post("switchMode", JSON.stringify(js))
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    gj(idx) {
      let js = {};
      js["room_id"] = idx;
      js["temp"] = -1;
      js["kind"] = 0;
      js["speed"] = -1;
      js["mode"] = -1;
      // alert(JSON.stringify(js));
      this.$http
        .post("switchMode", JSON.stringify(js))
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    getPay() {
      let js = {};
      js["idx"] = this.roomid;
      js["when"] = this.picker + " " + this.picker2;
      this.$http
        .post("getPay", JSON.stringify(js))
        .then(res => {
          this.desserts3 = res.data.msg;
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    getAnalyze() {
      let js = {};
      js["idx"] = this.roomid;
      if (this.analyzeType == "年") {
        js["mode"] = "y";
      } else if (this.analyzeType == "月") {
        js["mode"] = "m";
      } else if (this.analyzeType == "日") {
        js["mode"] = "d";
      }
      this.$http
        .post("getAnalyze", JSON.stringify(js))
        .then(res => {
          console.log(res);
          this.desserts2 = [];
          console.log(res.data.msg);
          for (var key in res.data.msg) {
            let j = JSON.parse(JSON.stringify(res.data.msg[key]));
            j["roomid"] = key;
            this.desserts2.push(j);
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  computed: {
    type() {
      return this.$store.getters.UserType;
    }
  }
};
</script>
 