<template>
  <v-img :src="bg" height="100%" class="d-flex align-center">
    <v-layout justify-center align-center fill-height>
      <v-flex xs12 sm6>
        <v-card outlined>
          <v-container>
            <v-text-field v-model="User_id" label="User ID" :error-messages="status==1?error:''" />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :error-messages="status==2?error:''"
            />
            {{radioGroup}}
            <v-radio-group v-model="radioGroup">
              <v-radio v-for="n in 3" :key="n" :label="tx[n]" :value="n"></v-radio>
            </v-radio-group>
            <v-btn block @click="submit" color="primary">Submit</v-btn>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-img>
</template>
<script>
import home_bg from "@/assets/home.svg";
export default {
  data: () => ({
    password: "",
    User_id: "",
    error: "",
    status: -1,
    tx: ["", "管理员", "前台", "经理"],
    radioGroup: 1
  }),
  methods: {
    submit() {
      if (this.check()) {
        let js = {
          name: this.User_id,
          pass: this.password,
          mode: this.radioGroup
        };
        console.log(js);
        this.$http
          .post("login", JSON.stringify(js))
          .then(res => {
            if (res.data.msg === "-1") {
              alert("Login Failed: 账号或密码错误");
            } else {
              this.$store.dispatch("set_token", res.data.msg);
              this.$store.dispatch("set_UserType", this.radioGroup);
              this.$router.push("/work");
            }
          })
          .catch(res => {
            alert("Login Failed:" + String(res));
          });
      }
    },
    check() {
      if (this.User_id == "") {
        this.error = "User id cannot be Empty";
        this.status = 1;
        return false;
      } else if (this.password == "") {
        this.error = "Password cannot be Empty";
        this.status = 2;
        return false;
      } else {
        this.status = -1;
        return true;
      }
    }
  },
  computed: {
    bg() {
      return home_bg;
    }
  }
};
</script>
 