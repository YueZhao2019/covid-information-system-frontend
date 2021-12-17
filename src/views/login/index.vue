<template>
<Row class="login-wrap">
  <Col  span="16">
  <Collapse class="login-left" v-model="value1">
        <Panel name="1">
            Coronavirus: Information for students and staff
            <div slot="content">
              <p><a href="https://www.gla.ac.uk/myglasgow/coronavirus/">Click here, you can get more information about COVID-19 in UoG, such as vaccines, FAQs for accommodation and related policies.</a></p>
            </div>
        </Panel>
        <Panel name="2">
            Covid Worldwide Information
            <div slot="content">
              <p><a href="https://www.worldometers.info/coronavirus/">Click here, you can get the coronavirus statistics in various countries, including case growth, death and so on.</a></p>
            </div>
        </Panel>
        <Panel name="3">
            Government Latest Advice on Covid
            <div slot="content">
              <p><a href="https://www.gov.scot/coronavirus-covid-19/">Click here to browse the Scotland Government's information on COVID-19, including the latest policies and advice.</a></p>
            </div>
        </Panel>
    </Collapse>
  </Col>
  <Col span="8">
  <div class="login-right">
  <div class="">
    <Card>
        <p slot="title" class="login-header">Covid Information System</p>
        <Form class="login-form" ref="loginForm" :model="formData" :rules="rules" @keydown.enter.native="handleSubmit">
          <FormItem prop="username">
            <Input v-model="formData.username" placeholder="Please Input username/GUID">
              <span slot="prepend">
                <Icon :size="16" type="ios-person"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem prop="password">  
            <Input type="password" v-model="formData.password" placeholder="Plase Input Password">
              <span slot="prepend">
                <Icon :size="14" type="md-lock"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem>
            <Radio-group v-model="formData.role">
              <Radio label="1">
              <span>Student</span>
            </Radio>
            <Radio label="2">
                <span>Teacher</span>
            </Radio>
            <Radio label="3">
                <span>Administartor</span>
            </Radio>
          </Radio-group>
   
          </FormItem>
          <FormItem>
            <Button @click="handleSubmit" type="primary" long>Sign In</Button>
          </FormItem>
        </Form>
        
      </Card>
  </div>
</div>
</Col>
</Row>

</template>
<script>
import { login } from "@/api/getData.js";
export default {
  data() {
    return {
      value1: "1",
      loding: false,
      formData: {
        username: "",
        password: "",
        role: 0
      }
    };
  },
  computed: {
    rules() {
      return {
        userName: [
          {
            required: true,
            message: "username/GUID cannot be empty",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Password cannot be empty",
            trigger: "blur"
          }
        ]
      };
    }
  },
  methods: {
    handleSubmit() {
      // get the data form table
      const data = this.formData;
      const params = {
        username: data.username,
        password: data.password,
        role: parseInt(data.role)
      };

      login(params).then(res => {
        const data = res.data;
        // console.log(data);
        //whenlogin successfully
        if (data.status == 200) {
          const userInfo = data.userInfo;
          data.userInfo = JSON.stringify(userInfo); // transform to json
          localStorage.setItem("userInfo", data.userInfo); // set basic user information to localStorage
          this.$Message.success(data.msg);

          if (userInfo.role == 1) this.$router.replace("/apply"); //if user is student,go home page
          if (userInfo.role == 2) this.$router.replace("/overview"); //if user is teacher ,go ovewview page
          if (userInfo.role == 3) this.$router.replace("/overview"); //if user is administrator,go ovewview page
        } else {
          this.$Message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background-image: url("../../../src/assets/images/login-background.jpg");
  background-size: cover;
  background-position: center;
  padding-left: 50px;
}
.login-left {
  width: 90%;
  height: 90%;
  margin-top: 100px;
}
.login-right {
  width: 80%;
  height: 80%;
  margin-top: 100px;
  &-card {
    right: 160px;
    transform: translateY(-60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    &-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>